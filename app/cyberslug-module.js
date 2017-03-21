/* global angular */
/* global $ */

var cyberslugApp = angular.module('cyberslugApp', []);




(function() {
  var global = {
    runstate: 'stop',
    setup: {
      population: {
        hermissenda: 3,
        flabellina: 10,
        faux: 0
      }
    }
  };
  cyberslugApp.factory('$global', [function() {
    return global;
  }]); // end $global
}());





cyberslugApp.controller('SetupCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var setupCtrl = this;
  setupCtrl.$global = $global;
}]);




cyberslugApp.directive('cyberslugDial', ['$global', function($global) {
  var link = function(scope, element, attrs) {
    $(element).append('<div class="knob"></div>');

    var dragCoords = null;
    element.mousedown(function(e) {
      dragCoords = {
        x: e.pageX,
        y: e.pageY,
        val: scope.cyberslugDial
      };
    }).mouseup(function() {
      dragCoords = null;
    }).mouseleave(function() {
      dragCoords = null;
    }).mousemove(function(e) {
      if (!dragCoords) {
        return;
      }
      var xdiff = e.pageX - dragCoords.x;
      var ydiff = -(e.pageY - dragCoords.y);

      var sensitivity = scope.sensitivity;
      if (!sensitivity) {
        sensitivity =  element.width() / (scope.max - scope.min);
      }
      
      xdiff = parseInt(xdiff / sensitivity, 10);
      ydiff = parseInt(ydiff / sensitivity, 10);
      
      var diff = xdiff;
      if (Math.abs(ydiff) > Math.abs(xdiff)) {
        diff = ydiff;
      }
      
      scope.cyberslugDial = dragCoords.val + diff;
      if (scope.cyberslugDial < scope.min) {
        scope.cyberslugDial = scope.min;
      }
      if (scope.cyberslugDial > scope.max) {
        scope.cyberslugDial = scope.max;
      }
      
      scope.$apply();
    });
    
    scope.$watch('cyberslugDial', function(newValue, oldValue) {
      var knobPosition = 360 * (newValue - scope.min) / (scope.max - scope.min + 1);
      $('.knob', element).css({
        transform: 'rotate(' + knobPosition + 'deg)'
      });
    });
  };
  
  return {
    scope: {
      cyberslugDial: '=',
      max: '=',
      min: '=',
      tickInterval: '=',
      sensitivity: '='
    },
    link: link
  };
}]);
