/* global angular */

var cyberslugApp = angular.module('cyberslugApp', []);

cyberslugApp.ANIMATIONS = {};


cyberslugApp.controller('SetupCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var ctrl = this;
  ctrl.$global = $global;
  ctrl.$global = $global;
  
  $scope.$watch('$global.world.hero', function(newValue) {
    ctrl.hero = newValue;
  });
  
  $scope.onSkeuoButton = function(buttonid) {
    if (ctrl.$global.runstate === buttonid) {
      // Same state. Change nothing.
      // Don't even play the audio.
      return;
    }
    ctrl.$global.runstate = buttonid;
    $global.prefetch.playAudio('audio-button');
  };
}]);

cyberslugApp.controller('ReadoutCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var ctrl = this;
  ctrl.$global = $global;
  $scope.$global = $global;
  
  $scope.$watch('$global.world.hero', function(newValue) {
    ctrl.hero = newValue;
  });
}]);


cyberslugApp.controller('MetacontrolsCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var ctrl = this;
  ctrl.$global = $global;
  ctrl.$global = $global;
  
  $scope.$watch('$global.world.hero', function(newValue) {
    ctrl.hero = newValue;
  });
}]);


