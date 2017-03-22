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

  var playAudio = function(audioid) {
    var jqAudioElem = global.prefetch.resources[audioid];
    if (!jqAudioElem || jqAudioElem.length == 0) {
      return false;
    }
    var audioElem = jqAudioElem[0];
    if (!audioElem) {
      return false;
    }
    audioElem.currentTime = 0;
    audioElem.play();
    return true;
  };
  global.prefetch.playAudio = playAudio;

  cyberslugApp.factory('$global', [function() {
    return global;
  }]); // end $global
}());

