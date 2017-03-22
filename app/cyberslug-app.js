/* global angular */

var cyberslugApp = angular.module('cyberslugApp', []);

cyberslugApp.ANIMATIONS = {};


cyberslugApp.controller('SetupCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var setupCtrl = this;
  setupCtrl.$global = $global;
}]);

cyberslugApp.controller('ReadoutCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var readoutCtrl = this;
  readoutCtrl.$global = $global;
}]);



