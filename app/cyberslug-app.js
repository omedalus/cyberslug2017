/* global angular */

var cyberslugApp = angular.module('cyberslugApp', []);



cyberslugApp.controller('SetupCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var setupCtrl = this;
  setupCtrl.$global = $global;
}]);



