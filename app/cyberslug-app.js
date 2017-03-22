/* global angular */

var cyberslugApp = angular.module('cyberslugApp', []);

cyberslugApp.ANIMATIONS = {};


cyberslugApp.controller('SetupCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var setupCtrl = this;
  setupCtrl.$global = $global;
  $scope.$global = $global;
  
  $scope.$watch('$global.world.hero', function(newValue) {
    setupCtrl.hero = newValue;
  });
  
  $scope.onSkeuoButton = function(buttonid) {
    if (setupCtrl.$global.runstate === buttonid) {
      // Same state. Change nothing.
      // Don't even play the audio.
      return;
    }
    setupCtrl.$global.runstate = buttonid;
    $global.prefetch.playAudio('audio-button');
  };
}]);

cyberslugApp.controller('ReadoutCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var readoutCtrl = this;
  readoutCtrl.$global = $global;
  $scope.$global = $global;
  
  $scope.$watch('$global.world.hero', function(newValue) {
    readoutCtrl.hero = newValue;
  });
}]);



