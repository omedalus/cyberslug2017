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
      
      showtrail: false,
      showodors: {
        odor_hermi: true,
        odor_flab: true,
        odor_betaine: false
      }
    },
    
    world: getWorld()
  };

  cyberslugApp.factory('$global', [function() {
    return global;
  }]); // end $global
}());

