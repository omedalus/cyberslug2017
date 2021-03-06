/* global $ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugDial', [
    '$global', '$audio',
    function($global, $audio) {
  var lastTimeAudioPlayed = new Date().getTime();
  var scaleposWhenLastAudioPlayed = 0;
  
  var link = function(scope, element, attrs) {
    $(element).addClass('dial');
    $(element).append('<div class="base"><div class="knob"></div></div>');
    $(element).append('<label/>');

    var setKnobToCursorEvent = function(e) {
      var elemOffset = element.offset();       
      var x = e.pageX - elemOffset.left - (element.width() / 2);
      var y = e.pageY - elemOffset.top - (element.height() / 2);

      var angle = Math.atan2(y, x);
      
      // Angle ranges from -PI to PI. 
      var scalepos = (angle + Math.PI) / (2 * Math.PI);

      // Scale starts at .25 because the dial starts at 
      // the upward-pointing position.
      scalepos = (scalepos + 0.75) % 1;
      
      // The last 3/4 of the scale don't count, because the dial
      // doesn't go all the way around.
      scalepos /= 0.75;
      scalepos = Math.min(scalepos, 1);

      var newvalue = (scope.max - scope.min) * scalepos + scope.min;
      newvalue = parseInt(newvalue, 10);
      
      // Determine how many clicks to make! :-)
      var timeNow = new Date().getTime();
      if (lastTimeAudioPlayed + 200 < timeNow) {
        // It's been more than 200 ms. Permit the audio to be played.
        var numClicksSounds = Math.round(10 * Math.abs(scalepos - scaleposWhenLastAudioPlayed)) + 1;
        // Each click is fifty milliseconds.
        var stopSoundInMs = 50 * numClicksSounds;
        
        $audio.playAudio('audio-dialtick');
        if (stopSoundInMs < 200) {
          setTimeout(function() {
            $audio.stopAudio('audio-dialtick');
          }, stopSoundInMs);
        }
        
        lastTimeAudioPlayed = timeNow;
        scaleposWhenLastAudioPlayed = scalepos;
      }

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
      var scalepos = 270 * (newValue - scope.min) / (scope.max - scope.min);
      $('.knob', element).css({
        transform: 'rotate(' + scalepos + 'deg)'
      });
      
      element[0].dataset.dialValue = 'value-' + newValue;
      
      if (!!scope.onChange) {
        scope.onChange();
      }
    });
    
    var rebuildTicks = function() {
      $('.dialtick', element).remove();
      
      if (!scope.tickInterval) {
        return;
      }
      
      for (var iTick = scope.min; iTick <= scope.max; iTick += scope.tickInterval) {
        var tickelem = $('<div class="dialtick"><div class="tickmark">\u25cf</div></div>');
        tickelem.appendTo(element);

        if (!!scope.numberInterval && (iTick % scope.numberInterval) == 0) {
          tickelem.html(iTick + '<div class="tickmark">\u25ae</div>');
        }
        
        if (scope.tickArray && scope.tickArray[iTick]) {
          tickelem.html(scope.tickArray[iTick]);
        }
        
        var scalepos = 270 * (iTick - scope.min) / (scope.max - scope.min);
        tickelem.css({
          transform: 'rotate(' + scalepos + 'deg)'
        });
      }
    };
    
    scope.$watch('min', rebuildTicks);
    scope.$watch('max', rebuildTicks);
    scope.$watch('tickInterval', rebuildTicks);
    
    scope.$watch('label', function(newValue) {
      if (!newValue) {
        $('label', element).hide();
      } 
      else {
        $('label', element).
            text(newValue.toUpperCase()).
            show();
      }
    });
  };
  
  return {
    scope: {
      cyberslugDial: '=',
      max: '=',
      min: '=',
      tickInterval: '=',
      numberInterval: '=',
      label: '=',
      tickArray: '=',
      onChange: '='
    },
    link: link
  };
}]);
