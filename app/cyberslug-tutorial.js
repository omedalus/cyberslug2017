/* global $ */
/* global _ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugTutorial', [
    '$global', '$audio', '$timeout',
    function($global, $audio, $timeout) {
  var link = function(scope, element, attrs) {
    var tutorialCtrl = scope.$parent.tutorialCtrl;
    scope.tutorialCtrl = tutorialCtrl;
    scope.$global = $global;

    var myAppearanceTimeout = null;
    
    var cancelMyAppearance = function(ev) {
      // Fix the vertical collapse problem that happens with elements
      // with automatic height, i.e. ones that don't have Rhanor.
      element.removeClass('showing');
      $timeout(function() {
        $(element).css({display: ''});
      }, 500);
      
      if (!!myAppearanceTimeout) {
        $timeout.cancel(myAppearanceTimeout);
        myAppearanceTimeout = null;
      }
    };
    
    
    var makeMeAppear = function(ev) {
      if ($global && $global.tutorial && !$global.tutorial.active) {
        // Don't show if tutorial mode has been switched off.
        return;
      }
      
      if (!_.isUndefined(element[0].dataset.neverShow)) {
        return;
      }
      
      if (!!myAppearanceTimeout) {
        // We're already in the process of appearing.
        return;
      }

      if (element.is('.showing')) {
        // Don't show if we're already showing.
        return;
      }
      
      var appearanceDelay = scope.appearAfterDelay || 0;
      
      myAppearanceTimeout = $timeout(function() {
        myAppearanceTimeout = null;
        
        // Test to see if any other tutorial overlays are currently visible.
        // Only one tutorial overlay is permitted to be visible at a time.
        if ($('.tutorialoverlay.showing').length > 0) {
          return;
        }

        $(element).css({display: 'inherit'});
        $timeout(function() {
          element.addClass('showing');
        }, 100);
        
        tutorialCtrl.tutorialpage = 0;
        tutorialCtrl.currentTutorialElement = element;
        tutorialCtrl.dismissElement = cancelMyAppearance;
        
        // Once we show, never show again if we aren't supposed to.
        if (!_.isUndefined(element[0].dataset.onlyShowOnce)) {
          element[0].dataset.neverShow = '';
        } else {
          delete element[0].dataset.neverShow;
        }
      }, appearanceDelay);
    };
    
    scope.$watch('mouseoverTrigger', function(newValue, oldValue) {
      if (!!oldValue) {
        $(oldValue).off('mouseenter', makeMeAppear);
        $(oldValue).off('mouseleave', cancelMyAppearance);
      }

      if (!!newValue) {
        $(newValue).on('mouseenter', makeMeAppear);
        if (scope.disappearOnMouseout) {
          $(newValue).on('mouseleave', cancelMyAppearance);
        }
      }
    });
    
    scope.$watch('tutorialCtrl.tutorialpage', function(newValue) {
      $('[data-tutorial-page]', element).hide();
      $('[data-tutorial-page=' + newValue + ']', element).show();
    });
    
    scope.$watch('$global.tutorial.active', function(newValue) {
      if (!newValue) {
        cancelMyAppearance();
      }
    });
  };
  
  return {
    scope: {
      cyberslugTutorial: '=',
      mouseoverTrigger: '=',
      
      appearAfterDelay: '=',
      disappearOnMouseout: '=',

      onlyShowOnce: '=',
      neverShow: '='
    },
    
    link: link
  };
}]);



