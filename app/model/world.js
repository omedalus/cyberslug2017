/* global getHero */
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
    'odor_betaine': 'rgba(128,128,128,'
  };
  
  var world = {};
  
  var drawMorsel = function(context, morsel, displaysettings) {
    context.save();
    
    context.translate(morsel.position.x, morsel.position.y);
    
    // Draw the morsel's odors(s)
    // Do it before drawing the morsel, so
    // the morsel will lie on top of the odors.
    _.each(speciesOdors[morsel.species], function(intensity, odorname) {
      if (!displaysettings.showodors[odorname]) {
        return;
      }
    
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
  
  var drawFrame = function(context, displaysettings) {
    context.save();
    
    _.each(world.prey, function(morsel) {
      drawMorsel(context, morsel, displaysettings);
    });
    
    world.hero.drawFrame(context, displaysettings);

    context.restore();
  };

  var getToroidDistance = function(x1, y1, x2, y2) {
    var xdist = Math.abs(x2 - x1);
    if (xdist > world.size / 2) {
      xdist = world.size - xdist;
    }
    
    var ydist = Math.abs(y2 - y1);
    if (ydist > world.size / 2) {
      ydist = world.size - ydist;
    }
    return Math.hypot(xdist, ydist);
  };

  var getOdorsAtPosition = function(x, y) {
    var odors = {};
    _.each(world.prey, function(morsel) {
      var dist =
          getToroidDistance(x, y, 
              morsel.position.x, morsel.position.y);
      
      var morselOdors = speciesOdors[morsel.species];
      if (!morselOdors) {
        return;
      }
      _.each(morselOdors, function(intensity, odorname) {
        // Diffusion follows inverse cube model.
        intensity = intensity / (dist * dist * dist); 
        if (!odors[odorname]) {
          odors[odorname] = 0;
        }
        odors[odorname] += intensity;
      });
    });
    return odors;
  };

  var checkForEatings = function() {
    var proboscisPosition = world.hero.getProboscisPosition();
    if (!proboscisPosition) {
      return null;
    }

    var eaten = [];
    _.each(world.prey, function(morsel) {
      var dist = getToroidDistance(
          morsel.position.x, morsel.position.y, 
          proboscisPosition.x, proboscisPosition.y);
      if (dist < 3) {
        eaten.push(morsel);
      }
    });
    
    _.each(eaten, function(morsel) {
      // Notify the hero that he's gotten some nutrients.
      world.hero.eat(morsel);
      
      // Play the eating noise. It sucks to mix interface into here, but
      // it's good enough.
      if (world.global && world.global.audio) {
        world.global.audio.playAudio('audio-eatslurp');
      }
      
      // "Remove" the prey from the world, but reincarnate it nearby.
      createRandomMorselPosition(morsel);
    });
  };


  var tick = function(ticks) {
    checkForEatings();
    
    _.each(world.prey, function(morsel) {
      // Move the morsels per their heading.
      morsel.position.angle += ticks * 0.02 * Math.random() - ticks * 0.01;
      morsel.position.x += ticks * .02 * Math.cos(morsel.position.angle);
      morsel.position.y += ticks * .02 * Math.sin(morsel.position.angle);

      toroidPosition(morsel.position);
    });

    // Set our hero's sensors.
    var sensorPositions = world.hero.getSensorPositions();
    _.each(sensorPositions, function(position, sensorname) {
      var odorsAtPosition = getOdorsAtPosition(position.x, position.y);
      world.hero.sensors[sensorname] = {};
      _.each(odorsAtPosition, function(intensity, odorname) {
        var sensorReading = Math.min(7, 7 + Math.log10(intensity));
        world.hero.sensors[sensorname][odorname] = Math.max(sensorReading, 0);
      });
    });

    world.hero.tick(ticks);
    world.toroidPosition(world.hero.position);
  };
  
  var createRandomMorselPosition = function(morsel) {
    morsel.position = null;

    // Reroll position until it is not generated on top of our hero.
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
  };

  var generatePrey = function(population) {
    world.prey = [];
    
    _.each(population, function(num, species) {
      _.times(num, function() {
        var morsel = {
          species: species,
          position: null
        };
        createRandomMorselPosition(morsel);
        world.prey.push(morsel);
      });
    });

    world.prey = _.shuffle(world.prey);
    // In theory we should shuffle the prey array every tick.
    // In practice, this is only necessary if we're bad coders.
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
  
  getWorld = function(globalSvc) {
    if (world) {
      world.global = globalSvc;
    }
    return world;
  };
}());