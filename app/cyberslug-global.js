/* global cyberslugApp */


(function() {
  var global = {
    runstate: 'stop',
    
    setup: {
      population: {
        hermissenda: 3,
        flabellina: 10,
        faux: 0
      }
    },
    
    displaysettings: {
      viewportsize: 100,
      tickinterval: {
        major: 10,
        minor: 1
      }
    }
  };

  cyberslugApp.factory('$global', [function() {
    return global;
  }]); // end $global
}());

