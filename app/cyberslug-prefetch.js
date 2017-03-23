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
      
      $('.progress .progress-level', scope.placeholder).each(function() {
        var scalepos = 1 - (prefetchPending.length / maxWaiting);
        $(this).css({
          left: (100 * scalepos) + '%'
        });
      });
    };
    
    var setPrefetchReady = function() {
      scope.$apply();
      
      $('#playbutton').css({display:''});
      $('h1', scope.placeholder).css({display: 'none'});
      $('.progress', scope.placeholder).css({display: 'none'});
      
      updateVisibility();
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

    // We need an explicit Play button because
    // on Chrome for mobile, the user needs to 
    // interact with the site in order to activate sounds.
    // It's a Chrome security thing.
    var playbutton = $('#playbutton');
    playbutton.click(function() {
      $global.prefetch.ready = true;
      $global.runstate = 'play';
      scope.$apply();
      updateVisibility();
    });
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
