/* global $ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugGameCanvas', [
    '$global', '$interval',
    function($global, $interval) {
  var drawAxes = function(context, element) {
    element = $(element);
    var canvas = element[0];
    
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width, canvas.height);
    context.stroke();
  };
  
  var link = function(scope, element, attrs) {
    var context = element[0].getContext('2d');
    drawAxes(context, element);
  };
  
  return {
    scope: {
    },
    link: link
  };
}]);
