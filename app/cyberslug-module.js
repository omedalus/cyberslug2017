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

    var setKnobToCursorEvent = function(e) {
      var parentOffset = element.parent().offset();       
      var x = e.pageX - parentOffset.left - (element.width() / 2);
      var y = e.pageY - parentOffset.top - (element.height() / 2);

      var angle = Math.atan2(y, x);
      
      // Angle ranges from -PI to PI.
      var scalepos = (angle + Math.PI) / (2 * Math.PI);
      
      // Scale starts at .25 because the dial starts at 
      // the upward-pointing position.
      scalepos = (scalepos + 0.75) % 1;

      var newvalue = (scope.max - scope.min + 1) * scalepos + scope.min;
      newvalue = parseInt(newvalue, 10);
      
      scope.cyberslugDial = newvalue;
      scope.$apply();
    };

    var isMouseDown = false;
    element.
        mousedown(function(e) {
          isMouseDown = true;
          setKnobToCursorEvent(e);
        }).
        mouseup(function(e) {
          isMouseDown = false;
        }).
        mouseleave(function(e) {
          isMouseDown = false;
        }).
        mousemove(function(e) {
          if (isMouseDown) {
            setKnobToCursorEvent(e);
          }
        });
    
    scope.$watch('cyberslugDial', function(newValue, oldValue) {
      var scalepos = 360 * (newValue - scope.min) / (scope.max - scope.min + 1);
      $('.knob', element).css({
        transform: 'rotate(' + scalepos + 'deg)'
      });
    });
    
    var rebuildTicks = function() {
      $('.dialtick', element).remove();
      
      for (var iTick = scope.min; iTick <= scope.max; iTick += scope.tickInterval) {
        var tickelem = $('<div class="dialtick"></div>');
        tickelem.appendTo(element);

        if (!!scope.numberInterval && (iTick % scope.numberInterval) == 0) {
          tickelem.text(iTick);
        }
        
        var scalepos = 360 * (iTick - scope.min) / (scope.max - scope.min + 1);
        tickelem.css({
          transform: 'rotate(' + scalepos + 'deg)'
        });
      }
    };
    
    scope.$watch('min', rebuildTicks);
    scope.$watch('max', rebuildTicks);
    scope.$watch('tickInterval', rebuildTicks);
  };
  
  return {
    scope: {
      cyberslugDial: '=',
      max: '=',
      min: '=',
      tickInterval: '=',
      numberInterval: '='
    },
    link: link
  };
}]);
