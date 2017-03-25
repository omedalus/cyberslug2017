/* global cyberslugApp */
/* global getWorld */
/* global $ */
/* global cyberslugApp */

cyberslugApp.factory('$audio', ['$global', function($global) {
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
  
  var playAudio = function(audioid, loop) {
    var audioElem = getAudio(audioid);
    
    var volume = $(audioElem).attr('volume');
    if (!!volume) {
      audioElem.volume = volume;
    }
    
    audioElem.loop = loop;
    if (!loop) {
      audioElem.currentTime = 0;
    }
    audioElem.play();
  };
  
  var stopAudio = function(audioid) {
    var audioElem = getAudio(audioid);
    audioElem.pause();
    audioElem.currentTime = 0;
  };
  
  
  
  var audio = {
    getAudio: getAudio,
    playAudio: playAudio,
    stopAudio: stopAudio
  };
  
  console.log('Creating audio')
  
  $global.audio = audio;
  return audio;
}]); // end $audio

