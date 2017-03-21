/* global angular */

var cyberslugApp = angular.module('cyberslugApp', []);

(function() {
  var global = {
    runstate: 'stop'
  };
  cyberslugApp.factory('$global', [function() {
    return global;
  }]); // end $global
}());


cyberslugApp.controller('SetupCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var setupCtrl = this;
  setupCtrl.$global = $global;
}]);

