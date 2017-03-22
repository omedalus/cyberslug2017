/* global $ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugGauge', ['$global', function($global) {
  var link = function(scope, element, attrs) {
    $(element).append('<div class="readout"><div class="readout-horiz-adjust"></div><div class="needle"></div></div>');
    $(element).append('<label/>');    
    
    scope.$global = $global;
    
    
    
    scope.$watch('cyberslugGauge', function(newValue, oldValue) {
      var scalepos = (newValue - scope.min) / (scope.max - scope.min);
      scalepos = Math.max(scalepos, 0);
      scalepos = Math.min(scalepos, 1);
      $('.needle', element).css({
        left: (scalepos * 100) + '%'
      });
    });
    
    scope.$watch('label', function(newValue) {
      $('label', element).text(newValue.toUpperCase());
    }); 
    
    var rebuildTicks = function() {
      $('.gaugetick', element).remove();
      
      var lastNumber = scope.min;
      for (var iTick = scope.min; iTick <= scope.max; iTick += scope.tickInterval) {
        var tickelem = $('<div class="gaugetick"><div class="tickmark">\u25cf</div></div>');
        tickelem.appendTo($('.readout-horiz-adjust', element));

        if (!!scope.numberInterval) {
          if (iTick === scope.min || 
              lastNumber + scope.numberInterval <= iTick + 0.0001) {
            var number = Math.round(iTick * 10) / 10;
            lastNumber = number;

            var numberstr = '' + number;
            if (number > 0 && number < 1) {
              numberstr = numberstr.substring(1);
            }
            
            tickelem.html(numberstr + '<div class="tickmark">|</div>');
          }
        }
        
        var scalepos = (iTick - scope.min) / (scope.max - scope.min);
        tickelem.css({
          left: (scalepos * 100) + '%'
        });
      }
    };
    
    scope.$watch('min', rebuildTicks);
    scope.$watch('max', rebuildTicks);
    scope.$watch('tickInterval', rebuildTicks);    
    
    
    var setAlertClasses = function() {
      $(element).removeClass('gaugedanger gaugewarning gaugegreat');
      if (!!scope.readoutDanger) {
        $(element).addClass('gaugedanger');
      } 
      else if (!!scope.readoutWarning) {
        $(element).addClass('gaugewarning');
      }
      else if (!!scope.readoutGreat) {
        $(element).addClass('gaugegreat');
      }
    };
    
    scope.$watch('readoutDanger', setAlertClasses);
    scope.$watch('readoutWarning', setAlertClasses);
    scope.$watch('readoutGreat', setAlertClasses);
  };
  
  return {
    scope: {
      cyberslugGauge: '=',
      max: '=',
      min: '=',
      tickInterval: '=',
      numberInterval: '=',
      label: '=',
      readoutDanger: '=',
      readoutWarning: '=',
      readoutGreat: '='
    },
    link: link
  };
}]);
