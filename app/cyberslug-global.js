/* global cyberslugApp */
/* global getWorld */
/* global $ */

(function() {
  var global = {
    runstate: 'stop',
    
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
    
    tutorial: {
      active: true
    }
  };
  
  global.world = getWorld(global);

  cyberslugApp.factory('$global', [function() {
    return global;
  }]); // end $global
}());

