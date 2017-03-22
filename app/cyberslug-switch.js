/* global $ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugSwitch', ['$global', function($global) {
  var link = function(scope, element, attrs) {
    $(element).addClass('switch');
    $(element).append('<label/>');    
    
    scope.$global = $global;
    
    
    
    scope.$watch('cyberslugSwitch', function(newValue, oldValue) {
      $(element).removeClass('switchon switchoff');
      if (!!newValue) {
        $(element).addClass('switchon');
      }
      else {
        $(element).addClass('switchoff');
      }
    });
    
    scope.$watch('label', function(newValue) {
      newValue = newValue || '';
      if (!!newValue) {
        $('label', element).
            text(newValue.toUpperCase()).
            show();
      } else {
        $('label', element).hide();
      }
    });
    
    $(element).click(function() {
      scope.cyberslugSwitch = !scope.cyberslugSwitch;
      $global.prefetch.playAudio('audio-switch');
    });
  };
  
  return {
    scope: {
      cyberslugSwitch: '=',
      label: '='
    },
    link: link
  };
}]);
