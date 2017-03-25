/* global $ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugSwitch', [
    '$global', '$audio', 
    function($global, $audio) {
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
      $audio.playAudio('audio-switch');
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
