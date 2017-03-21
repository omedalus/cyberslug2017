/* global $ */
/* global _ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugGameCanvas', [
    '$global', '$timeout',
    function($global, $timeout) {

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

    context.beginPath();
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
    gradient.addColorStop(0, '#356');
    gradient.addColorStop(1, '#023');
    
    context.fillStyle = gradient;
    context.fillRect(-d, -d, d * 2, d * 2);

    context.restore();
  };
  
  var drawScreenShadows = function(context) {
    context.save();
    var d = $global.displaysettings.viewportsize / 2;

    // Scale the context so all coordinates are in the range [-1, 1].
    // Much more sensible than multiplying by d everywhere.
    context.scale(d, d);

    // Top
    var gradient = context.createLinearGradient(0, -1, 0, -0.8);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(-1, -1, 2, .2);

    // Left    
    gradient = context.createLinearGradient(-1, 0, -0.8, 0);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(-1, -1, 0.2, 2);
    
    // Bottom
    gradient = context.createLinearGradient(0, 1, 0, 0.9);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(1, 1, -2, -0.1);

    // Right    
    gradient = context.createLinearGradient(1, 0, 0.8, 0);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(1, 1, -.2, -2);
    
    // More bottom.
    gradient = context.createRadialGradient(0,0, .8, 0,0, 1.4);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,20,.6)');
    context.fillStyle = gradient;
    context.fillRect(-1, 0, 2, 1);
    
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
    context.moveTo(-.88, -.68);
    context.arcTo(-.88, -.88, -0.68, -.88, 0.1);
    context.lineTo(-.68, -.88);
    
    //var gradient=context.createLinearGradient(0, -.88, -.05, -0.68);
    var gradient=context.createRadialGradient(-.68,-.68, 0, -.68,-.68, .3);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(.6, 'rgba(200,240,255,0)');
    gradient.addColorStop(1, 'rgba(240,240,255,.4)');
    
    context.fillStyle = gradient;
    context.fill();

    // Top Right
    context.beginPath();
    context.moveTo(-.68, -.88);
    context.lineTo(.68, -.88);
    context.arcTo(.88,-.88, 0.88,.68, 0.1);
    context.lineTo(.88, .5);    
    
    gradient = context.createLinearGradient(.01,-.88, 0,-.8);
    gradient.addColorStop(0, 'rgba(240,240,255,.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    context.fillStyle = gradient;
    context.fill();
    

    context.restore();
  };  
  
  var drawFrame = function(context, element) {
    context.save();
    
    setCanvasZoom(context, element);
    
    clearFrame(context);
    
    if (!!$global.world) {
      $global.world.drawFrame(context);
    }

    drawAxes(context);
    drawScreenShadows(context);
    drawScreenSpeculars(context);
    
    context.restore();
  };
  
  var animate = function(context, element) {
    drawFrame(context, element);

    var fps = 0;
    if ($global.runstate === 'play') {
      fps = 15;
    } 
    else if ($global.runstate === 'ff') {
      fps = 30;
    }

    if (!fps) {
      return;
    }
    
    $timeout(function() {
      animate(context, element);
    }, 1000 / fps);
  };
  
  var link = function(scope, element, attrs) {
    var context = element[0].getContext('2d');

    scope.$global = $global;
    
    scope.$watch('$global.runstate', function(newValue, oldValue) {
      animate(context, element);
    });
  };
  
  return {
    scope: {
    },
    link: link
  };
}]);
