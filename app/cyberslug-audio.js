/* global cyberslugApp */
/* global getWorld */
/* global _ */
/* global $ */
/* global cyberslugApp */

cyberslugApp.factory('$audio', ['$global', '$rootScope',
    function($global, $rootScope) {
  $rootScope.$global = $global;
      
  var audio = {
    level: 3
  };
  
  // Returns a usable audio element, even if it's a dummy.
  var getAudio = function(audioid) {
    var dummy = new Audio();
    
    var jqAudioElem = $global.prefetch.resources[audioid];
    if (!jqAudioElem || jqAudioElem.length == 0) {
      return dummy;
    }
    var audioElem = jqAudioElem[0];
    if (!audioElem) {
      return dummy;
    }
    
    return audioElem;
  };
  
  
  var stopAudio = function(audioid) {
    var audioElem = getAudio(audioid);
    audioElem.pause();
    audioElem.currentTime = 0;
  };
  
  
  var stopAudioGroup = function(audiogroup, exceptid) {
    if (!audiogroup) {
      return;
    }
    
    _.each($global.prefetch.resources, function(element, id) {
      if (id === exceptid) {
        return;
      }
      if (element.data('exclusionGroup') === audiogroup) {
        stopAudio(id);
      }    
    });
  };
  
  var playAudio = function(audioid) {
    var audioElem = getAudio(audioid);

    // Don't play audios in the same exclusion group at the same time.
    // If one starts, stop all the others.
    if (!!audioElem.dataset && 
        audioElem.dataset.exclusionGroup) {
      stopAudioGroup(audioElem.dataset.exclusionGroup, audioid);
    }

    // Determine if our audio level is tuned high enough to hear this audio.
    var elemAudioLevel = audioElem.dataset.audioLevel || 1;
    if (elemAudioLevel > audio.level) {
      // Don't play elements whose audio level is higher 
      // than the one that the user is currently listening to.
      return;
    }
    
    if (!audioElem.loop) {
      audioElem.currentTime = 0;
    }
    audioElem.play();
  };
  

  $(window).blur(function() {
    _.each($global.prefetch.resources, function(element, id) {
      if (element.prop('tagName').toLowerCase() !== 'audio') {
        return;
      }
      var audioElem = element[0];
      audioElem.dataset.volumeBeforeBlur = audioElem.volume;
      audioElem.volume = 0;
    });    
  })
  .focus(function() {
    _.each($global.prefetch.resources, function(element, id) {
      if (element.prop('tagName').toLowerCase() !== 'audio') {
        return;
      }
      var audioElem = element[0];
      audioElem.volume = audioElem.dataset.volumeBeforeBlur;
      delete audioElem.dataset.volumeBeforeBlur;
    });    
  });


  var updateLevel = function() {
    _.each($global.prefetch.resources, function(element, id) {
      if (element.prop('tagName').toLowerCase() !== 'audio') {
        return;
      }
      var audioElem = element[0];
      var elemAudioLevel = audioElem.dataset.audioLevel || 1;
      
      if (elemAudioLevel > audio.level &&
          !audioElem.dataset.volumeBeforeLevel) {
        audioElem.dataset.volumeBeforeLevel = audioElem.volume;
        audioElem.volume = 0;
      }
      
      if (elemAudioLevel <= audio.level &&
          !!audioElem.dataset.volumeBeforeLevel)
      {
        audioElem.volume = audioElem.dataset.volumeBeforeLevel;
        delete audioElem.dataset.volumeBeforeLevel;
      }
    });
  };


  audio.getAudio = getAudio;
  audio.playAudio = playAudio;
  audio.stopAudio = stopAudio;
  audio.stopAudioGroup = stopAudioGroup;
  audio.updateLevel = updateLevel;

  $global.audio = audio;
  
  return audio;
}]); // end $audio

