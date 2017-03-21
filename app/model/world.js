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
  
  var odorFillStyles = {
    'odor_hermi': 'rgba(0,128,0,',
    'odor_flab': 'rgba(128,0,0,',
    //'odor_betaine': 'rgba(128,128,0,',
  };
  
  var world = {};
  
  var drawMorsel = function(context, morsel) {
    context.save();
    
    context.translate(morsel.position.x, morsel.position.y);
    
    // Draw the morsel's odors(s)
    // Do it before drawing the morsel, so
    // the morsel will lie on top of the odors.
    _.each(speciesOdors[morsel.species], function(intensity, odorname) {
      var orgb = odorFillStyles[odorname];
      if (!orgb) {
        return;
      }
      
      var gradient = context.createRadialGradient(0,0, 0, 0,0, 20);
      for (var i = 0; i < 4; i++) {
        gradient.addColorStop(.2*i, 
            orgb + 
            (intensity / Math.pow(2, i)) + 
            ')');
      }
      gradient.addColorStop(1, orgb + '0)');
      context.fillStyle = gradient;
      context.fillRect(-20,-20, 40,40);
    });

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
    
    _.each(world.prey, function(morsel) {
      drawMorsel(context, morsel);
    });
    
    world.toroidPosition(world.hero.position);
    world.hero.drawFrame(context);

    context.restore();
  };


  var tick = function(ticks) {
    _.each(world.prey, function(morsel) {
      // Move the morsels per their heading.
      morsel.position.angle += ticks * 0.02 * Math.random() - ticks * 0.01;
      morsel.position.x += ticks * .02 * Math.cos(morsel.position.angle);
      morsel.position.y += ticks * .02 * Math.sin(morsel.position.angle);

      toroidPosition(morsel.position);
    });
    
    world.hero.tick(ticks);
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
          var distFromHero = Math.hypot(
              position.x - world.hero.position.x, 
              position.y - world.hero.position.y);
          if (distFromHero > 25) {
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

    world.hero = getHero();
    world.hero.reset();
    
    generatePrey($global.setup.population);
    
    world.isInitialized = true;
  };

  world.reset = reset;
  world.drawFrame = drawFrame;
  world.tick = tick;
  world.toroidPosition = toroidPosition;

  world.isInitialized = false;
  
  getWorld = function() {
    return world;
  };
}());