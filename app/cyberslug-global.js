/* global cyberslugApp */
/* global getWorld */


(function() {
  var global = {
    runstate: 'play',
    
    setup: {
      population: {
        hermissenda: 1, //3
        flabellina: 0, //10
        faux: 0
      }
    },
    
    displaysettings: {
      viewportsize: 100,
      tickinterval: {
        major: 10,
        minor: 1
      }
    },
    
    world: getWorld()
  };

  cyberslugApp.factory('$global', [function() {
    return global;
  }]); // end $global
}());

