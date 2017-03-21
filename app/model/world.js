/* global getHero */

var getWorld = null;

(function() {
  
  var world = {};
  
  var drawFrame = function(context) {
    world.hero.drawFrame(context);
  };

  var reset = function() {
    world.hero = getHero();
    world.hero.reset();
  };

  world.reset = reset;
  world.drawFrame = drawFrame;
  
  reset();
  
  getWorld = function() {
    return world;
  };
}());