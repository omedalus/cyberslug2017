/* global $ */
/* global _ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugPrefetch', ['$global', function($global) {
  var link = function(scope, element, attrs) {
    $(element).addClass('prefetch');
    
    var prefetchPending = [];
    var maxWaiting = 0;
    
    var setPrefetchReady = function() {
      if (!$global.prefetch.ready) {
        $global.prefetch.ready = true;
        scope.$apply();
        
        $global.prefetch.playAudio('audio-bgmusic', true);
      }
    };
    
    var updateVisibility = function() {
      if (!!$global.prefetch.ready) {
        $(scope.cyberslugPrefetch).css({display: ''});
        $(scope.placeholder).css({display: 'none'});
      }
      else {
        $(scope.cyberslugPrefetch).css({display: 'none'});
        $(scope.placeholder).css({display: ''});
      }
      
      $('.progress .progress-level', scope.placeholder).each(function() {
        var scalepos = 1 - (prefetchPending.length / maxWaiting);
        $(this).css({
          left: (100 * scalepos) + '%'
        });
      });
    };

    $(element).children().each(function() {
      var prefetchResource = this;
      var jqPrefetchResource = $(prefetchResource);
      
      prefetchPending.push(prefetchResource);
      if (prefetchPending.length > maxWaiting) {
        maxWaiting = prefetchPending.length;
      }
      
      var unpend = function() {
        if (!_.contains(prefetchPending, prefetchResource)) {
          // It's nice that you're ready, but we aren't asking for you anymore.
          return;
        }
        
        prefetchPending = _.without(prefetchPending, prefetchResource);
        if (prefetchPending.length === 0) {
          setPrefetchReady();
        }
        updateVisibility();
      };
      
      var unpendError = unpend;
      var unpendSuccess = function() {
        unpend();
        if (!!prefetchResource.id) {
          $global.prefetch.resources[prefetchResource.id] = $(prefetchResource);
          scope.$apply();
        }        
      };
      
      jqPrefetchResource.
          on('error', unpendError).
          on('load', unpendSuccess).
          on('canplaythrough', unpendSuccess);
    });
    
    scope.$watch('placeholder', function(newValue, oldValue) {
      $(oldValue).css({display: ''});
      updateVisibility();
    });
    
    updateVisibility();

    if (!!scope.timeout) {
      // After timeout milliseconds, fuck you you're ready.
      setTimeout(setPrefetchReady, scope.timeout);
    }    
  };
  
  return {
    scope: {
      cyberslugPrefetch: '=',
      placeholder: '=',
      timeout: '='
    },
    link: link
  };
}]);
