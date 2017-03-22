/* global cyberslugApp */
/* global getWorld */


(function() {
  var global = {
    runstate: 'play',
    
    prefetch: {
      ready: false,
      resources: {}
    },
    
    setup: {
      population: {
        hermissenda: 4,
        flabellina: 10,
        faux: 2
      }
    },
    
    displaysettings: {
      viewportsize: 100,
      tickinterval: {
        major: 10,
        minor: 1
      },
      
      showtrail: 0,
      showodors: {
        odor_hermi: true,
        odor_flab: true,
        odor_betaine: false
      }
    },
    
    world: getWorld()
  };

  // Returns a usable audio element, even if it's a dummy.
  var getAudio = function(audioid) {
    var dummy = new Audio();
    
    var jqAudioElem = global.prefetch.resources[audioid];
    if (!jqAudioElem || jqAudioElem.length == 0) {
      return dummy;
    }
    var audioElem = jqAudioElem[0];
    if (!audioElem) {
      return dummy;
    }
    
    return audioElem;
  };

  var playAudio = function(audioid) {
    var audioElem = getAudio(audioid);
    audioElem.currentTime = 0;
    audioElem.play();
  };
  
  var stopAudio = function(audioid) {
    var audioElem = getAudio(audioid);
    audioElem.currentTime = 0;
    audioElem.stop();
  };
  
  global.prefetch.getAudio = getAudio;
  global.prefetch.playAudio = playAudio;
  global.prefetch.stopAudio = stopAudio;

  cyberslugApp.factory('$global', [function() {
    return global;
  }]); // end $global
}());

