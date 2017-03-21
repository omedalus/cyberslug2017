/* global $ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugGameCanvas', [
    '$global', '$interval',
    function($global, $interval) {

  var setCanvasZoom = function(context, element) {
    element = $(element);
    var canvas = element[0];
    context.translate(canvas.width / 2, canvas.height / 2);
    
    var physsize = Math.max(canvas.width, canvas.height);
    var scalefactor = physsize / ($global.displaysettings.viewportsize);
    context.scale(scalefactor, scalefactor);
    context.lineWidth = 1 / (scalefactor);
  };
      
  var drawAxes = function(context) {
    context.save();

    var d = $global.displaysettings.viewportsize / 2;

    for (var itick = -d; itick <= d; itick += $global.displaysettings.tickinterval.major) {
      if (itick == 0) {
        continue;
      }
      context.moveTo(itick, -d);
      context.lineTo(itick, d);
      context.moveTo(-d, itick);
      context.lineTo(d, itick);
    }
    
    context.strokeStyle = '#000';
    context.stroke();


    context.beginPath();
    context.moveTo(-d, 0);
    context.lineTo(d, 0);
    context.moveTo(0, -d);
    context.lineTo(0, d);
    
    for (var itick = -d; itick <= d; itick += $global.displaysettings.tickinterval.minor) {
      context.moveTo(itick, -.5);
      context.lineTo(itick, .5);
      context.moveTo(-.5, itick);
      context.lineTo(.5, itick);
    }

    for (var itick = -d; itick <= d; itick += $global.displaysettings.tickinterval.major) {
      context.moveTo(itick, -2);
      context.lineTo(itick, 2);
      context.moveTo(-2, itick);
      context.lineTo(2, itick);
    }

    context.strokeStyle = '#666';
    context.stroke();
    
    context.restore();
  };
  
  var clearFrame = function(context) {
    context.save();
    var d = $global.displaysettings.viewportsize / 2;

    var gradient=context.createLinearGradient(-d, -d, d, d);
    gradient.addColorStop(0, '#245');
    gradient.addColorStop(1, '#023');
    
    context.fillStyle = gradient;
    context.fillRect(-d, -d, d * 2, d * 2);

    context.restore();
  };
  
  var drawScreenShadows = function(context) {
    context.save();
    var d = $global.displaysettings.viewportsize / 2;

    // Top
    var gradient=context.createLinearGradient(0, -d, 0, -0.8 * d);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(-d, -d, 2 * d, d/5);

    // Left    
    gradient=context.createLinearGradient(-d, 0, -0.8 * d, 0);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(-d, -d, d/5, 2 * d);
    
    // Bottom
    gradient=context.createLinearGradient(0, d, 0, 0.9 * d);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(d, d, -2 * d, -d/10);

    // Right    
    gradient=context.createLinearGradient(d, 0, 0.8 * d, 0);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(d, d, -d/5, -2 * d);
    
    context.restore();
  };
  
  var drawScreenSpeculars = function(context) {
    context.save();
    var d = $global.displaysettings.viewportsize / 2;

    // Scale the context so all coordinates are in the range [-1, 1].
    // Much more sensible than multiplying by d everywhere.
    context.scale(d, d);

    // Top Left
    context.beginPath();
    context.moveTo(1, 0);
    context.lineTo(.95, -0.68);
    context.arcTo(.88, -.88, 0.68, -.88, 0.1);
    context.lineTo(-0, -.88);
    
    //context.arcTo(-1, -1, -1, -0.68, 0.1);
    //context.lineTo(-1, 0);
    

    //var gradient=context.createLinearGradient(0, -.88, -.05, -0.68);
    var gradient=context.createRadialGradient(-.1,.1, 1.5, 0,.3, 1.15);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(.5, 'rgba(100,200,255,0)');
    gradient.addColorStop(.8, 'rgba(200,240,255,.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    context.fillStyle = gradient;
    context.fill();
    
    context.restore();
  };  
  
  var drawFrame = function(context, element) {
    context.save();
    
    setCanvasZoom(context, element);
    
    clearFrame(context);

    drawAxes(context);
    drawScreenShadows(context);
    drawScreenSpeculars(context);
    
    context.restore();
  };
  
  var link = function(scope, element, attrs) {
    var context = element[0].getContext('2d');
    drawFrame(context, element);
  };
  
  return {
    scope: {
    },
    link: link
  };
}]);
