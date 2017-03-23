/* global $ */
/* global _ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugGameCanvas', [
    '$global', '$timeout', '$interval',
    function($global, $timeout, $interval) {

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
  
  var drawFrame = function(context, element, displaysettings) {
    context.save();
    
    setCanvasZoom(context, element);
    
    clearFrame(context);
    
    if (!!$global.world && !!$global.world.isInitialized) {
      $global.world.drawFrame(context, displaysettings);
    }

    drawAxes(context);
    drawScreenShadows(context);
    drawScreenSpeculars(context);
    
    context.restore();
  };
  
  var FPS = 30;
  
  var animate = function(context, element) {
    drawFrame(context, element, $global.displaysettings);

    if ($global.world.isInitialized) {
      if ($global.runstate === 'play') {
        $global.world.tick(1);
      } 
      else if ($global.runstate === 'ff') {
        $global.world.tick(10);
      }
      else if ($global.runstate === 'step') {
        $global.world.tick(1);
        $global.runstate = 'pause';
      }
    }


    $timeout(function() {
      animate(context, element);
    }, 1000 / FPS);
  };

  var playSquishWalkAudio = function() {
    var shouldPlaySquishCrawl = 
        ($global.runstate === 'play' || $global.runstate === 'ff');
    shouldPlaySquishCrawl = shouldPlaySquishCrawl &&
        !$global.world.hero.isBeingPickedUp;
    
    if (shouldPlaySquishCrawl) {
      $global.prefetch.playAudio('audio-squishcrawl', true);
    } else {
      $global.prefetch.stopAudio('audio-squishcrawl');
    }
  };
  
  var playBackgroundMusic = function() {
    if ($global.runstate === 'stop') {
      $global.prefetch.stopAudio('audio-bgmusic');
      $global.prefetch.stopAudio('audio-bgmusic-fast');
    } 
    else if ($global.runstate === 'ff') {
      $global.prefetch.stopAudio('audio-bgmusic');
      $global.prefetch.playAudio('audio-bgmusic-fast', true);
    }
    else {
      $global.prefetch.playAudio('audio-bgmusic', true);
      $global.prefetch.stopAudio('audio-bgmusic-fast');
    }       
  };
  
  var link = function(scope, element, attrs) {
    var context = element[0].getContext('2d');

    scope.$global = $global;
    
    scope.$watch('$global.runstate', function(newValue, oldValue) {
      if (!$global.world.isInitialized ||
          (newValue !== 'stop' && oldValue === 'stop')) {
        $global.world.reset($global);
      }
      
      playSquishWalkAudio();
      playBackgroundMusic();
    });

    // Every second, make sure our background sounds are playing.
    $interval(function() {
      playBackgroundMusic();
      playSquishWalkAudio();
    }, 1000);

    scope.$watch('$global.world.hero.isBeingPickedUp', function() {
      playSquishWalkAudio();
    });
    
    animate(context, element);
    
    var getWorldCoordsOfMouseEvent = function(e) {
      var elemOffset = element.offset();       
      var x = e.pageX - elemOffset.left - (element.width() / 2);
      var y = e.pageY - elemOffset.top - (element.height() / 2);
      
      x /= (element.width() / 2);
      y /= (element.height() / 2);
      
      x *= $global.world.size / 2;
      y *= $global.world.size / 2;
      
      return {x: x, y: y};
    };
    
    var isMouseDown = false;
    
    var setHeroPickupState = function(newState) {
      if ($global.world.hero.isBeingPickedUp && !newState) {
        // He was being picked up, but not anymore.
        $global.prefetch.playAudio('audio-splatdown');
      }
      else if (!$global.world.hero.isBeingPickedUp && newState) {
        // He just got picked up.
        $global.prefetch.playAudio('audio-squishypop');
      }
      
      $global.world.hero.isBeingPickedUp = newState;
      scope.$apply();
    };
    
    $(element).mouseout(function(e) {
      isMouseDown = false;
      setHeroPickupState(false);
    }).mouseup(function(e) {
      isMouseDown = false;
      setHeroPickupState(false);
    }).mousedown(function(e) {
      isMouseDown = true;
    }).mousemove(function(e) {
      var worldMousePosition = getWorldCoordsOfMouseEvent(e);
      
      var distToHero = 
          Math.hypot(worldMousePosition.x - $global.world.hero.position.x, 
              worldMousePosition.y - $global.world.hero.position.y);

      $(element).removeClass('mouseoverhero mousegrabbinghero');
      if (distToHero < 10) {
        if (isMouseDown) {
          $(element).addClass('mousegrabbinghero');
          setHeroPickupState(true);
          
          $global.world.hero.position.x = worldMousePosition.x;
          $global.world.hero.position.y = worldMousePosition.y;
          scope.$apply();
          
        } else {
          $(element).addClass('mouseoverhero');
          setHeroPickupState(false);
        }
      }
    });
  };
  
  return {
    scope: {
    },
    link: link
  };
}]);
