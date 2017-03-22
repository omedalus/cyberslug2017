/* global $ */
/* global _ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugPrefetch', ['$global', function($global) {
  var link = function(scope, element, attrs) {
    $(element).addClass('prefetch');
    
    var prefetchPending = [];
    var maxWaiting = 0;
    
    var updateVisibility = function() {
      if (!!$global.prefetch.ready) {
        $(scope.cyberslugPrefetch).css({display: ''});
        $(scope.placeholder).css({display: 'none'});
      }
      else {
        $(scope.cyberslugPrefetch).css({display: 'none'});
        $(scope.placeholder).css({display: ''});
      }
      
      $('progress', scope.placeholder).each(function() {
        var progressElem = this;
        progressElem.max = maxWaiting;
        progressElem.value = maxWaiting - prefetchPending.length;
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
        prefetchPending = _.without(prefetchPending, prefetchResource);
        if (prefetchPending.length === 0) {
          $global.prefetch.ready = true;
          scope.$apply();
        }
        updateVisibility();
      };
      
      jqPrefetchResource.
          on('load', unpend).
          on('error', unpend);
      
      jqPrefetchResource.on('load', function() {
        if (!!prefetchResource.id) {
          $global.prefetch.resources[prefetchResource.id] = $(prefetchResource);
          scope.$apply();
        }
      });
    });
    
    scope.$watch('placeholder', function(newValue, oldValue) {
      $(oldValue).css({display: ''});
      updateVisibility();
    });
    
    updateVisibility();
  };
  
  return {
    scope: {
      cyberslugPrefetch: '=',
      placeholder: '='
    },
    link: link
  };
}]);
