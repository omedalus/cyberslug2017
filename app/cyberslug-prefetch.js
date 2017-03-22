/* global $ */
/* global _ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugPrefetch', ['$global', function($global) {
  var link = function(scope, element, attrs) {
    
    var prefetchPending = [];

    $(element).children().each(function() {
      var prefetchResource = this;
      var jqPrefetchResource = $(prefetchResource);
      
      prefetchPending.push(prefetchResource);
      
      var unpend = function() {
        prefetchPending = _.without(prefetchPending, prefetchResource);
        if (prefetchPending.length === 0) {
          $global.prefetch.ready = true;
          $(scope.cyberslugPrefetch).css({display: ''});
          console.log(scope.cyberslugPrefetch)
        }
      };
      
      jqPrefetchResource.
          on('load', unpend).
          on('error', unpend);
      
      jqPrefetchResource.on('load', function() {
        if (!!prefetchResource.id) {
          $global.prefetch.resources[prefetchResource.id] = $(prefetchResource);
        }
      });
    });
  };
  
  return {
    scope: {
      cyberslugPrefetch: '='
    },
    link: link
  };
}]);
