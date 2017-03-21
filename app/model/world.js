/* global getHero */
/* global createPrey */
/* global _ */

var getWorld = null;

(function() {
  
  var speciesFillStyles = {
    'hermissenda': '#0f0',
    'flabellina': '#f00',
    'faux': '#00f'
  };
  
  var speciesOdors = {
    'hermissenda': {
      'odor_hermi': 0.5,
      'odor_betaine': 0.5
    },
    'flabellina': {
      'odor_flab': 0.5,
      'odor_betaine': 0.5
    },
    'faux': {
      'odor_flab': 0.5,
      'odor_betaine': 0.5
    }
  };
  
  var world = {};
  
  var drawMorsel = function(context, morsel) {
    context.save();
    
    context.translate(morsel.position.x, morsel.position.y);
    
    var fillStyle = speciesFillStyles[morsel.species];
    if (!!fillStyle) {
      context.beginPath();
      context.arc(0,0, .5, 0, 2*Math.PI);
      context.closePath();
      context.fillStyle = speciesFillStyles[morsel.species];
      context.fill();
    }
    
    context.restore();
  };
  
  var toroidPosition = function(position) {
    position.x =
        ((position.x + 1.5*world.size) % world.size) - .5*world.size;
    position.y =
        ((position.y + 1.5*world.size) % world.size) - .5*world.size;    
  };
  
  var drawFrame = function(context) {
    context.save();
    
    world.hero.drawFrame(context);
    
    _.each(world.prey, function(morsel) {
      // Move the morsels per their heading.
      morsel.position.angle += 0.02 * Math.random() - 0.01;
      morsel.position.x += .02 * Math.cos(morsel.position.angle);
      morsel.position.y += .02 * Math.sin(morsel.position.angle);

      toroidPosition(morsel.position);

      drawMorsel(context, morsel);
    });
    
    context.restore();
  };


  var generatePrey = function(population) {
    world.prey = [];
    
    _.each(population, function(num, species) {
      _.times(num, function() {
        var morsel = {
          species: species,
          position: null
        };
        
        // Reroll position for *each* morsel indefinitely
        // until it is not generated on top of our hero.
        while (!morsel.position) {
          var position = {
            x: (Math.random() * world.size) - (world.size / 2),
            y: (Math.random() * world.size) - (world.size / 2)
          };
          if (Math.hypot(position.x, position.y, 
              world.hero.position.x, world.hero.position.y) > 25) {
            // Morsel was generated far away enough. This is good.
            morsel.position = position;
          }
        }
        morsel.position.angle = Math.random() * 2 * Math.PI;

        world.prey.push(morsel);
      });
    });
  };


  var reset = function($global) {
    world.size = $global.displaysettings.viewportsize;
    world.toroidPosition = toroidPosition;

    world.hero = getHero();
    world.hero.reset();
    
    generatePrey($global.setup.population);
    
    world.isInitialized = true;
  };

  world.reset = reset;
  world.drawFrame = drawFrame;
  world.isInitialized = false;
  
  getWorld = function() {
    return world;
  };
}());