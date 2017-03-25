/* global angular */

var cyberslugApp = angular.module('cyberslugApp', []);

cyberslugApp.ANIMATIONS = {};


cyberslugApp.controller('SetupCtrl', [
    '$scope', '$global', '$audio',
    function($scope, $global, $audio) 
{
  var ctrl = this;
  ctrl.$global = $global;
  $scope.$global = $global;

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
    $audio.playAudio('audio-button');
  };
}]);

cyberslugApp.controller('ReadoutCtrl', [
    '$scope', '$global', '$audio', 
    function($scope, $global, $audio) 
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
  $scope.$global = $global;
  
  $scope.$watch('$global.world.hero', function(newValue) {
    ctrl.hero = newValue;
  });
}]);


cyberslugApp.controller('TutorialCtrl', [
    '$scope', '$global', function($scope, $global) 
{
  var ctrl = this;
  ctrl.$global = $global;
  $scope.$global = $global;
  
  ctrl.currentTutorialElement = null;
  ctrl.tutorialpage = 0;
  
  ctrl.nextPage = function() {
    ctrl.tutorialpage++;
  };
  
  ctrl.dismiss = function() {
    if (!ctrl.currentTutorialElement) {
      return;
    }
    ctrl.currentTutorialElement.removeClass('showing');
  };
}]);

