/* global Image */
/* global _ */

var getHero = null;

(function() {
  var wiggletick = 0;
  
  var textureImg = new Image();
  textureImg.src = 'img/light-mottled-orange.jpg';
  textureImg.onload = function() {
    textureImg.loaded = true;
  };
  
  var hero = {};

  var getSensorPositions = function() {
    // The antennae are 40 degrees from the body's lateral axis,
    // about 7 units out.
    // 40 degrees is about .7 radians.
    return {
      left: {
        x: hero.position.x + 7 * Math.cos(hero.position.angle - .7),
        y: hero.position.y + 7 * Math.sin(hero.position.angle - .7)
      },
      right: {
        x: hero.position.x + 7 * Math.cos(hero.position.angle + .7),
        y: hero.position.y + 7 * Math.sin(hero.position.angle + .7)
      }
    };
  };

  var drawSensorPositions = function(context) {
    context.save();
    
    var sensorPositions = getSensorPositions();
    _.each(sensorPositions, function(position, sensorname) {
      context.save();
      context.beginPath();
      context.arc(position.x, position.y, 1, 0,Math.PI * 2);
      context.fillStyle = '#ff0';
      context.fill();
      context.restore();
    });

    context.restore();
  };


  var drawTravelHistory = function(context, traillength) {
    if (!traillength) {
      return;
    }

    context.save();
    
    context.beginPath();
    var lastPoint = null;
    
    // Keep track of how many turns' worth of trail we've logged.
    var traillengthShown = 0;
    
    for (var i = hero.travelHistory.length - 1; i >= 0; i--) {
      var coords = hero.travelHistory[i];
      traillengthShown += 0 + coords[2];
      if (traillengthShown > traillength) {
        break;
      }
      
      if (!coords[0] && !coords[1]) {
        // This point wasn't recorded correctly.
        continue;
      }
      
      if (!lastPoint ||
          Math.hypot(coords[0]-lastPoint[0], coords[1]-lastPoint[1]) > 20) {
        // Our hero only travels in short increments. He could not have
        // jumped so many whole units.
        // We must've gone around the toroid. Lift our pen.
        context.moveTo(coords[0], coords[1]);
      } else {
        context.lineTo(coords[0], coords[1]);
      }
      lastPoint = coords;
    };
    context.strokeStyle = 'rgba(128,100,30, .5)';
    context.lineWidth = 1; // This is thicker than a pixel
    context.stroke();
    
    context.restore();
    // Everything restored again.
  };
  
  var drawFrame = function(context, displaysettings) {
    if (hero.isBeingPickedUp) {
      wiggletick += 3;
    }
    
    var gradient;
    
    if (!textureImg.loaded) {
      return;
    }
    
    drawTravelHistory(context, displaysettings.showtrail);

    //drawSensorPositions(context);
    
    context.save();
    
    context.translate(hero.position.x, hero.position.y);
    context.rotate(hero.position.angle);
    
    // We drew our hero pointing up, but angle 0 is to the right.
    context.rotate(+Math.PI / 2);
    
    // We scale to match our texture image.
    // And also because our hero isn't exactly a circle.
    context.scale(1/12, 1/10);
    
    // Make the slug look squishy and alive.
    context.scale(
        1 + Math.cos(wiggletick / 10) * .02,
        1 - Math.cos((wiggletick + 5) / 10) * .02
    );
    
    // Make him buck when he's being picked up.
    if (hero.isBeingPickedUp) {
      context.transform(1, .05 * Math.sin(wiggletick/10 + 1), .1 * Math.cos(wiggletick/10), 1, 0, 0);
    }
    
    // Proboscis begin.
    context.save();
    
    context.beginPath();
    context.moveTo(-8,0);
    context.lineTo(-8, -60 - hero.proboscisExtension / 2);
    context.lineTo(8, -60 - hero.proboscisExtension / 2);
    context.lineTo(8, 0);
    context.closePath();
    context.fillStyle = '#a82';
    context.fill();
    
    context.restore();
    // Proboscis end.
    
    // Oral frond begin.
    context.save();
    
    context.beginPath();
    context.moveTo(-25,-25);
    context.lineTo(-40,-60 + hero.proboscisExtension / 2);
    context.lineTo(40,-60 + hero.proboscisExtension / 2);
    context.lineTo(25,-25);
    context.clip();
    context.drawImage(textureImg, -40, -60);
    
    gradient = context.createRadialGradient(0,-80, 0, 0,-80, 60);
    gradient.addColorStop(0, 'rgba(0,0,0,.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    context.fillStyle = gradient;
    context.fillRect(-40,-60, 80,35);
    context.restore();
    // Oral frond end.    
    
    // Mottled body begin.
    context.save();
    
    context.beginPath();
    context.arc(0, 0, 50, 0, Math.PI * 2);
    context.closePath();

    context.clip();
    context.drawImage(textureImg, -50, -50);
    
    gradient = context.createRadialGradient(0,0, 25, 0,-20, 70);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,.8)');
    context.fillStyle = gradient;
    context.fillRect(-50,-50, 100,100);
    
    context.restore();
    // Mottled body end.
    
    // Antennae begin!
    context.save();
    
    var antennamotion = 5;
    if (hero.isBeingPickedUp) {
      antennamotion = 15;
    }
    
    context.beginPath();
    context.moveTo(30, -40);
    context.lineTo(70 + antennamotion * Math.cos(wiggletick / 7), -70);
    context.lineTo(40, -20);
    context.moveTo(-30, -40);
    context.lineTo(-70 + antennamotion * Math.cos(wiggletick / 13), -70);
    context.lineTo(-40, -20);
    context.closePath();
    
    context.clip();
    context.drawImage(textureImg, -80, -80);
    
    context.fillStyle = gradient;
    context.fillRect(-80,-80, 160,160);    
    
    context.restore();
    // Antennae end.

    context.restore();
    // Everything restored.
  };
  
  var reset = function() {
    hero.position = {
      x: 0,
      y: 0,
      angle: 0
    };
    hero.travelHistory = [];
    
    hero.feedcount = {};
    
    hero.sensors = {};
    
    hero.proboscisExtension = 0;
    
    hero.modelvars = {
      nutrition: 0.5,
      incentiveSalience: 0,
      somaticMap: 0,
      satiation: 0.5,
      appetiteSwitch: 0,
      
      Vf: 0,
      Vh: 0,
      alpha_hermi: 0.5,
      beta_hermi: 1,
      lambda_hermi: 1,
      alpha_flab: 0.5,
      beta_flab: 1,
      lambda_flab: 1,
    };
  };

  var processPhysiologicalModel = function(ticks) {
    hero.modelvars.nutrition *= Math.pow(0.9995, ticks);
    hero.modelvars.satiation = 1 /
        Math.pow((1 + 0.7 * Math.exp(-4 * hero.modelvars.nutrition + 2)), 2);

    hero.modelvars.odorMeans = {};

    var knownOdors = ['odor_hermi', 'odor_flab', 'odor_betaine'];
    _.each(knownOdors, function(odorname) {
      var odorSensorScoreTotal = 0;
      var numSensors = 0;
      _.each(hero.sensors, function(sensorScores, sensorname) {
        numSensors++;
        if (!!sensorScores[odorname]) {
          odorSensorScoreTotal += sensorScores[odorname];
        }
      });
      
      hero.modelvars.odorMeans[odorname] = odorSensorScoreTotal / numSensors;
    });

    var hermibias = 
        hero.modelvars.odorMeans['odor_hermi'] -
        hero.modelvars.odorMeans['odor_flab'];

    var reward = 
        hero.modelvars.odorMeans['odor_betaine'] /
        (1 + (0.5 * hero.modelvars.Vh * hero.modelvars.odorMeans['odor_hermi'])
            - 0.008 / hero.modelvars.satiation)
        + 1.32 * hero.modelvars.Vh * hero.modelvars.odorMeans['odor_hermi'];
    var rewardNeg = 1.32 * hero.modelvars.Vf * hero.modelvars.odorMeans['odor_flab'];
    hero.modelvars.incentiveSalience = reward - rewardNeg;

    var somaticFlabLeft = 
        (hero.sensors.left.odor_flab || 0) - (hero.sensors.right.odor_flab || 0);
    var somaticHermiLeft = 
        (hero.sensors.left.odor_hermi || 0) - (hero.sensors.right.odor_hermi || 0);
    
    hero.modelvars.somaticMap =
        -(
          somaticFlabLeft / (1 + Math.exp(-50 * -hermibias)) + 
          somaticHermiLeft / (1 + Math.exp(-50 * hermibias))
          );
          
    var appetiteState = 0.01 + 
        (1 / (1 + Math.exp(-(hero.modelvars.incentiveSalience * 0.6) + 10 * hero.modelvars.satiation)) 
            + 0.1 * ((hero.modelvars.appetiteSwitch - 1) * 0.5));
            
    hero.modelvars.appetiteSwitch = (((-2 / (1 + Math.exp(-100 * (appetiteState - 0.245)))) + 1));
    
    var turnAngle = 
        (2 * hero.modelvars.appetiteSwitch) / 
        (1 + Math.exp (3 * hero.modelvars.somaticMap)) - hero.modelvars.appetiteSwitch;
        
    hero.position.angle += (turnAngle / 10);
  };

  var maybeExtendProboscis = function(ticks) {
    var isSmellingBetaine = 
      hero.sensors.left.odor_betaine > 4 ||
      hero.sensors.right.odor_betaine > 4;
      
    if (isSmellingBetaine) {
      hero.proboscisExtension += ticks/5;
    } else {
      hero.proboscisExtension -= ticks/2;
    }
    hero.proboscisExtension = Math.min(hero.proboscisExtension, 20);
    hero.proboscisExtension = Math.max(hero.proboscisExtension, 0);
  };

  var tick = function(ticks) {
    if (!hero.isBeingPickedUp) {
      // If he's being picked up, the wiggletick counter 
      // is handled in the drawFrame method.
      wiggletick += ticks;
    }
    
    processPhysiologicalModel(ticks);
    maybeExtendProboscis(ticks);

    if (!hero.isBeingPickedUp) {
      // Move our dude, but only if he isn't being manhandled.  
      hero.position.angle += ticks * 0.02 * Math.random() - ticks * 0.01;
      hero.position.x += ticks * .1 * Math.cos(hero.position.angle);
      hero.position.y += ticks * .1 * Math.sin(hero.position.angle);

      hero.travelHistory.push([hero.position.x, hero.position.y, ticks]);
      if (hero.travelHistory.length > 5000) {
        // That's way too much history to record! Start trimming.
        hero.travelHistory.shift();
      }
    } else {
      hero.travelHistory = [];
    }
  };
  
  var getProboscisPosition = function() {
    if (hero.proboscisExtension < 11) {
      return null;
    }
    return {
      x: hero.position.x + 4 * Math.cos(hero.position.angle),
      y: hero.position.y + 4 * Math.sin(hero.position.angle)
    };
  };
  
  var eat = function(morsel) {
    // All morsels are worth 0.3 nutrition points, I guess.
    hero.modelvars.nutrition += 0.3;

    hero.feedcount[morsel.species] = 
        1 + (hero.feedcount[morsel.species] || 0);

    if (morsel.species === 'hermissenda') {
      hero.modelvars.Vh += 
          hero.modelvars.alpha_hermi * 
          hero.modelvars.beta_hermi *
          (hero.modelvars.lambda_hermi - hero.modelvars.Vh);
    } else if (morsel.species === 'flabellina') {
      hero.modelvars.Vf += 
          hero.modelvars.alpha_flab * 
          hero.modelvars.beta_flab *
          (hero.modelvars.lambda_flab - hero.modelvars.Vf);
    } else if (morsel.spexies === 'faux') {
      hero.modelvars.Vf += 
          hero.modelvars.alpha_flab * 
          hero.modelvars.beta_flab *
          (0 - hero.modelvars.Vf);
    }
  };
  
  
  hero.reset = reset;
  hero.drawFrame = drawFrame;
  hero.tick = tick;
  hero.eat = eat;
  
  hero.getSensorPositions = getSensorPositions;
  hero.getProboscisPosition = getProboscisPosition;
  
  getHero = function() {
    return hero;
  };
}());/* global getHero */
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
}());/* global angular */

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
    if (!!ctrl.dismissElement) {
      ctrl.dismissElement();
    }
  };
}]);

/* global cyberslugApp */
/* global getWorld */
/* global $ */

(function() {
  var global = {
    runstate: 'stop',
    
    prefetch: {
      ready: false,
      resources: {}
    },
    
    setup: {
      population: {
        hermissenda: 4,
        flabellina: 10,
        faux: 2
      }
    },
    
    displaysettings: {
      viewportsize: 100,
      tickinterval: {
        major: 10,
        minor: 1
      },
      
      showtrail: 0,
      showodors: {
        odor_hermi: true,
        odor_flab: true,
        odor_betaine: false
      }
    },
    
    tutorial: {
      active: true
    }
  };
  
  global.world = getWorld(global);

  cyberslugApp.factory('$global', [function() {
    return global;
  }]); // end $global
}());

/* global cyberslugApp */
/* global getWorld */
/* global _ */
/* global $ */
/* global cyberslugApp */

cyberslugApp.factory('$audio', ['$global', '$rootScope',
    function($global, $rootScope) {
  $rootScope.$global = $global;
      
  var audio = {
    level: 3
  };
  
  // Returns a usable audio element, even if it's a dummy.
  var getAudio = function(audioid) {
    var dummy = new Audio();
    
    var jqAudioElem = $global.prefetch.resources[audioid];
    if (!jqAudioElem || jqAudioElem.length == 0) {
      return dummy;
    }
    var audioElem = jqAudioElem[0];
    if (!audioElem) {
      return dummy;
    }
    
    return audioElem;
  };
  
  
  var stopAudio = function(audioid) {
    var audioElem = getAudio(audioid);
    audioElem.pause();
    audioElem.currentTime = 0;
  };
  
  
  var stopAudioGroup = function(audiogroup, exceptid) {
    if (!audiogroup) {
      return;
    }
    
    _.each($global.prefetch.resources, function(element, id) {
      if (id === exceptid) {
        return;
      }
      if (element.data('exclusionGroup') === audiogroup) {
        stopAudio(id);
      }    
    });
  };
  
  var playAudio = function(audioid) {
    var audioElem = getAudio(audioid);

    // Don't play audios in the same exclusion group at the same time.
    // If one starts, stop all the others.
    if (!!audioElem.dataset && 
        audioElem.dataset.exclusionGroup) {
      stopAudioGroup(audioElem.dataset.exclusionGroup, audioid);
    }

    // Determine if our audio level is tuned high enough to hear this audio.
    var elemAudioLevel = audioElem.dataset.audioLevel || 1;
    if (elemAudioLevel > audio.level) {
      // Don't play elements whose audio level is higher 
      // than the one that the user is currently listening to.
      return;
    }
    
    if (!audioElem.loop) {
      audioElem.currentTime = 0;
    }
    audioElem.play();
  };
  

  $(window).blur(function() {
    _.each($global.prefetch.resources, function(element, id) {
      if (element.prop('tagName').toLowerCase() !== 'audio') {
        return;
      }
      var audioElem = element[0];
      audioElem.dataset.volumeBeforeBlur = audioElem.volume;
      audioElem.volume = 0;
    });    
  })
  .focus(function() {
    _.each($global.prefetch.resources, function(element, id) {
      if (element.prop('tagName').toLowerCase() !== 'audio') {
        return;
      }
      var audioElem = element[0];
      if (audioElem.dataset.volumeBeforeBlur) {
        audioElem.volume = audioElem.dataset.volumeBeforeBlur;
        delete audioElem.dataset.volumeBeforeBlur;
      }
    });    
  });


  var updateLevel = function() {
    _.each($global.prefetch.resources, function(element, id) {
      if (element.prop('tagName').toLowerCase() !== 'audio') {
        return;
      }
      var audioElem = element[0];
      var elemAudioLevel = audioElem.dataset.audioLevel || 1;
      
      if (elemAudioLevel > audio.level &&
          !audioElem.dataset.volumeBeforeLevel) {
        audioElem.dataset.volumeBeforeLevel = audioElem.volume;
        audioElem.volume = 0;
      }
      
      if (elemAudioLevel <= audio.level &&
          !!audioElem.dataset.volumeBeforeLevel)
      {
        audioElem.volume = audioElem.dataset.volumeBeforeLevel;
        delete audioElem.dataset.volumeBeforeLevel;
      }
    });
  };


  audio.getAudio = getAudio;
  audio.playAudio = playAudio;
  audio.stopAudio = stopAudio;
  audio.stopAudioGroup = stopAudioGroup;
  audio.updateLevel = updateLevel;

  $global.audio = audio;
  
  return audio;
}]); // end $audio

/* global $ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugDial', [
    '$global', '$audio',
    function($global, $audio) {
  var lastTimeAudioPlayed = new Date().getTime();
  var scaleposWhenLastAudioPlayed = 0;
  
  var link = function(scope, element, attrs) {
    $(element).addClass('dial');
    $(element).append('<div class="base"><div class="knob"></div></div>');
    $(element).append('<label/>');

    var setKnobToCursorEvent = function(e) {
      var elemOffset = element.offset();       
      var x = e.pageX - elemOffset.left - (element.width() / 2);
      var y = e.pageY - elemOffset.top - (element.height() / 2);

      var angle = Math.atan2(y, x);
      
      // Angle ranges from -PI to PI. 
      var scalepos = (angle + Math.PI) / (2 * Math.PI);

      // Scale starts at .25 because the dial starts at 
      // the upward-pointing position.
      scalepos = (scalepos + 0.75) % 1;
      
      // The last 3/4 of the scale don't count, because the dial
      // doesn't go all the way around.
      scalepos /= 0.75;
      scalepos = Math.min(scalepos, 1);

      var newvalue = (scope.max - scope.min) * scalepos + scope.min;
      newvalue = parseInt(newvalue, 10);
      
      // Determine how many clicks to make! :-)
      var timeNow = new Date().getTime();
      if (lastTimeAudioPlayed + 200 < timeNow) {
        // It's been more than 200 ms. Permit the audio to be played.
        var numClicksSounds = Math.round(10 * Math.abs(scalepos - scaleposWhenLastAudioPlayed)) + 1;
        // Each click is fifty milliseconds.
        var stopSoundInMs = 50 * numClicksSounds;
        
        $audio.playAudio('audio-dialtick');
        if (stopSoundInMs < 200) {
          setTimeout(function() {
            $audio.stopAudio('audio-dialtick');
          }, stopSoundInMs);
        }
        
        lastTimeAudioPlayed = timeNow;
        scaleposWhenLastAudioPlayed = scalepos;
      }

      scope.cyberslugDial = newvalue;
      scope.$apply();
    };

    var isMouseDown = false;
    element.
        mousedown(function(e) {
          isMouseDown = true;
          setKnobToCursorEvent(e);
        }).
        mouseup(function(e) {
          isMouseDown = false;
        }).
        mouseleave(function(e) {
          isMouseDown = false;
        }).
        mousemove(function(e) {
          if (isMouseDown) {
            setKnobToCursorEvent(e);
          }
        });
    
    scope.$watch('cyberslugDial', function(newValue, oldValue) {
      var scalepos = 270 * (newValue - scope.min) / (scope.max - scope.min);
      $('.knob', element).css({
        transform: 'rotate(' + scalepos + 'deg)'
      });
      
      element[0].dataset.dialValue = 'value-' + newValue;
      
      if (!!scope.onChange) {
        scope.onChange();
      }
    });
    
    var rebuildTicks = function() {
      $('.dialtick', element).remove();
      
      if (!scope.tickInterval) {
        return;
      }
      
      for (var iTick = scope.min; iTick <= scope.max; iTick += scope.tickInterval) {
        var tickelem = $('<div class="dialtick"><div class="tickmark">\u25cf</div></div>');
        tickelem.appendTo(element);

        if (!!scope.numberInterval && (iTick % scope.numberInterval) == 0) {
          tickelem.html(iTick + '<div class="tickmark">\u25ae</div>');
        }
        
        if (scope.tickArray && scope.tickArray[iTick]) {
          tickelem.html(scope.tickArray[iTick]);
        }
        
        var scalepos = 270 * (iTick - scope.min) / (scope.max - scope.min);
        tickelem.css({
          transform: 'rotate(' + scalepos + 'deg)'
        });
      }
    };
    
    scope.$watch('min', rebuildTicks);
    scope.$watch('max', rebuildTicks);
    scope.$watch('tickInterval', rebuildTicks);
    
    scope.$watch('label', function(newValue) {
      if (!newValue) {
        $('label', element).hide();
      } 
      else {
        $('label', element).
            text(newValue.toUpperCase()).
            show();
      }
    });
  };
  
  return {
    scope: {
      cyberslugDial: '=',
      max: '=',
      min: '=',
      tickInterval: '=',
      numberInterval: '=',
      label: '=',
      tickArray: '=',
      onChange: '='
    },
    link: link
  };
}]);
/* global $ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugGauge', ['$global', function($global) {
  var link = function(scope, element, attrs) {
    $(element).addClass('gauge');    
    $(element).append('<div class="readout"><div class="readout-horiz-adjust"></div><div class="needle"></div></div>');
    $(element).append('<label/>');    
    
    scope.$global = $global;

    
    scope.$watch('cyberslugGauge', function(newValue, oldValue) {
      var scalepos = (newValue - scope.min) / (scope.max - scope.min);
      scalepos = Math.max(scalepos, 0);
      scalepos = Math.min(scalepos, 1);
      // Fit to the horizontal adjust, which is 80% as wide as the full gauge display.
      scalepos = .8 * scalepos + .1;
      $('.needle', element).css({
        left: (scalepos * 100) + '%'
      });
    });
    
    scope.$watch('label', function(newValue) {
      $('label', element).text(newValue.toUpperCase());
    }); 
    
    var rebuildTicks = function() {
      $('.gaugetick', element).remove();
      
      var lastNumber = scope.min;
      for (var iTick = scope.min; iTick <= scope.max; iTick += scope.tickInterval) {
        var tickelem = $('<div class="gaugetick"><div class="tickmark">\u25cf</div></div>');
        tickelem.appendTo($('.readout-horiz-adjust', element));

        if (!!scope.numberInterval) {
          if (iTick === scope.min || 
              lastNumber + scope.numberInterval <= iTick + 0.0001) {
            var number = Math.round(iTick * 10) / 10;
            lastNumber = number;

            // All this to remove leading zeroes.
            var numberstr = '' + Math.abs(number);
            if (number !== 0 && Math.abs(number) < 1) {
              numberstr = numberstr.substring(1);
            }
            if (number < 0) {
              numberstr = '-' + numberstr;
            }
            
            tickelem.html(numberstr + '<div class="tickmark">|</div>');
          }
        }
        
        var scalepos = (iTick - scope.min) / (scope.max - scope.min);
        tickelem.css({
          left: (scalepos * 100) + '%'
        });
      }
    };
    
    scope.$watch('min', rebuildTicks);
    scope.$watch('max', rebuildTicks);
    scope.$watch('tickInterval', rebuildTicks);    
    
    
    var setAlertClasses = function() {
      $(element).removeClass('gaugedanger gaugewarning gaugegreat');
      if (!!scope.readoutDanger) {
        $(element).addClass('gaugedanger');
      } 
      else if (!!scope.readoutWarning) {
        $(element).addClass('gaugewarning');
      }
      else if (!!scope.readoutGreat) {
        $(element).addClass('gaugegreat');
      }
    };
    
    scope.$watch('readoutDanger', setAlertClasses);
    scope.$watch('readoutWarning', setAlertClasses);
    scope.$watch('readoutGreat', setAlertClasses);
  };
  
  return {
    scope: {
      cyberslugGauge: '=',
      max: '=',
      min: '=',
      tickInterval: '=',
      numberInterval: '=',
      label: '=',
      readoutDanger: '=',
      readoutWarning: '=',
      readoutGreat: '='
    },
    link: link
  };
}]);
/* global $ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugSwitch', [
    '$global', '$audio', 
    function($global, $audio) {
  var link = function(scope, element, attrs) {
    $(element).addClass('switch');
    $(element).append('<label/>');    
    
    scope.$global = $global;

    scope.$watch('cyberslugSwitch', function(newValue, oldValue) {
      $(element).removeClass('switchon switchoff');
      if (!!newValue) {
        $(element).addClass('switchon');
      }
      else {
        $(element).addClass('switchoff');
      }
    });
    
    scope.$watch('label', function(newValue) {
      newValue = newValue || '';
      if (!!newValue) {
        $('label', element).
            text(newValue.toUpperCase()).
            show();
      } else {
        $('label', element).hide();
      }
    });
    
    $(element).click(function() {
      scope.cyberslugSwitch = !scope.cyberslugSwitch;
      $audio.playAudio('audio-switch');
    });
  };
  
  return {
    scope: {
      cyberslugSwitch: '=',
      label: '='
    },
    link: link
  };
}]);
/* global $ */
/* global _ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugGameCanvas', [
    '$global', '$timeout', '$interval', '$audio', 
    function($global, $timeout, $interval, $audio) {

  var setCanvasZoom = function(context, element) {
    element = $(element);
    var canvas = element[0];
    context.translate(canvas.width / 2, canvas.height / 2);
    
    var physsize = Math.max(canvas.width, canvas.height);
    var scalefactor = physsize / ($global.displaysettings.viewportsize);
    context.scale(scalefactor, scalefactor);
    context.lineWidth = 1 / (scalefactor);
  };
      
  var drawAxes = function(context) {
    context.save();

    var d = $global.displaysettings.viewportsize / 2;

    context.beginPath();
    for (var itick = -d; itick <= d; itick += $global.displaysettings.tickinterval.major) {
      if (itick == 0) {
        continue;
      }
      context.moveTo(itick, -d);
      context.lineTo(itick, d);
      context.moveTo(-d, itick);
      context.lineTo(d, itick);
    }
    
    context.strokeStyle = '#000';
    context.stroke();

    context.beginPath();
    context.moveTo(-d, 0);
    context.lineTo(d, 0);
    context.moveTo(0, -d);
    context.lineTo(0, d);
    
    for (var itick = -d; itick <= d; itick += $global.displaysettings.tickinterval.minor) {
      context.moveTo(itick, -.5);
      context.lineTo(itick, .5);
      context.moveTo(-.5, itick);
      context.lineTo(.5, itick);
    }

    for (var itick = -d; itick <= d; itick += $global.displaysettings.tickinterval.major) {
      context.moveTo(itick, -2);
      context.lineTo(itick, 2);
      context.moveTo(-2, itick);
      context.lineTo(2, itick);
    }

    context.strokeStyle = '#666';
    context.stroke();
    
    context.restore();
  };
  
  var clearFrame = function(context) {
    context.save();
    var d = $global.displaysettings.viewportsize / 2;

    var gradient=context.createLinearGradient(-d, -d, d, d);
    gradient.addColorStop(0, '#356');
    gradient.addColorStop(1, '#023');
    
    context.fillStyle = gradient;
    context.fillRect(-d, -d, d * 2, d * 2);

    context.restore();
  };
  
  var drawScreenShadows = function(context) {
    context.save();
    var d = $global.displaysettings.viewportsize / 2;

    // Scale the context so all coordinates are in the range [-1, 1].
    // Much more sensible than multiplying by d everywhere.
    context.scale(d, d);

    // Top
    var gradient = context.createLinearGradient(0, -1, 0, -0.8);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(-1, -1, 2, .2);

    // Left    
    gradient = context.createLinearGradient(-1, 0, -0.8, 0);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(-1, -1, 0.2, 2);
    
    // Bottom
    gradient = context.createLinearGradient(0, 1, 0, 0.9);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(1, 1, -2, -0.1);

    // Right    
    gradient = context.createLinearGradient(1, 0, 0.8, 0);
    gradient.addColorStop(0, 'rgba(0,0,0,.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    context.fillStyle = gradient;
    context.fillRect(1, 1, -.2, -2);
    
    // More bottom.
    gradient = context.createRadialGradient(0,0, .8, 0,0, 1.4);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,20,.6)');
    context.fillStyle = gradient;
    context.fillRect(-1, 0, 2, 1);
    
    context.restore();
  };
  
  var drawScreenSpeculars = function(context) {
    context.save();
    var d = $global.displaysettings.viewportsize / 2;

    // Scale the context so all coordinates are in the range [-1, 1].
    // Much more sensible than multiplying by d everywhere.
    context.scale(d, d);

    // Top Left
    context.beginPath();
    context.moveTo(-.88, -.68);
    context.arcTo(-.88, -.88, -0.68, -.88, 0.1);
    context.lineTo(-.68, -.88);
    
    //var gradient=context.createLinearGradient(0, -.88, -.05, -0.68);
    var gradient=context.createRadialGradient(-.68,-.68, 0, -.68,-.68, .3);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(.6, 'rgba(200,240,255,0)');
    gradient.addColorStop(1, 'rgba(240,240,255,.4)');
    
    context.fillStyle = gradient;
    context.fill();

    // Top Right
    context.beginPath();
    context.moveTo(-.68, -.88);
    context.lineTo(.68, -.88);
    context.arcTo(.88,-.88, 0.88,.68, 0.1);
    context.lineTo(.88, .5);    
    
    gradient = context.createLinearGradient(.01,-.88, 0,-.8);
    gradient.addColorStop(0, 'rgba(240,240,255,.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    context.fillStyle = gradient;
    context.fill();
    

    context.restore();
  };  
  
  var drawFrame = function(context, element, displaysettings) {
    context.save();
    
    setCanvasZoom(context, element);
    
    clearFrame(context);
    
    if (!!$global.world && !!$global.world.isInitialized) {
      $global.world.drawFrame(context, displaysettings);
    }

    drawAxes(context);
    drawScreenShadows(context);
    drawScreenSpeculars(context);
    
    context.restore();
  };
  
  var FPS = 30;
  
  var animate = function(context, element) {
    drawFrame(context, element, $global.displaysettings);

    if ($global.world.isInitialized) {
      if ($global.runstate === 'play') {
        $global.world.tick(1);
      } 
      else if ($global.runstate === 'ff') {
        $global.world.tick(10);
      }
      else if ($global.runstate === 'step') {
        $global.world.tick(1);
        $global.runstate = 'pause';
      }
    }


    $timeout(function() {
      animate(context, element);
    }, 1000 / FPS);
  };

  var playSquishWalkAudio = function() {
    var shouldPlaySquishCrawl = 
        ($global.runstate === 'play' || $global.runstate === 'ff');
    shouldPlaySquishCrawl = shouldPlaySquishCrawl &&
        !$global.world.hero.isBeingPickedUp;
    
    if (shouldPlaySquishCrawl) {
      $audio.playAudio('audio-squishcrawl', true);
    } else {
      $audio.stopAudio('audio-squishcrawl');
    }
  };
  
  var playBackgroundMusic = function() {
    if ($global.runstate === 'play') {
      $audio.playAudio('audio-bgmusic');
    } 
    else if ($global.runstate === 'ff') {
      $audio.playAudio('audio-bgmusic-fast');
    }
    else {
      $audio.stopAudioGroup('bgmusic');
    }       
  };
  
  var link = function(scope, element, attrs) {
    var context = element[0].getContext('2d');

    scope.$global = $global;
    
    scope.$watch('$global.runstate', function(newValue, oldValue) {
      if (!$global.world.isInitialized ||
          (newValue !== 'stop' && oldValue === 'stop')) {
        $global.world.reset($global);
      }
      
      playSquishWalkAudio();
      playBackgroundMusic();
    });

    // Every second, make sure our background sounds are playing.
    $interval(function() {
      playBackgroundMusic();
      playSquishWalkAudio();
    }, 1000);

    scope.$watch('$global.world.hero.isBeingPickedUp', function() {
      playSquishWalkAudio();
    });
    
    animate(context, element);
    
    var getWorldCoordsOfMouseEvent = function(e) {
      var elemOffset = element.offset();       
      var x = e.pageX - elemOffset.left - (element.width() / 2);
      var y = e.pageY - elemOffset.top - (element.height() / 2);
      
      x /= (element.width() / 2);
      y /= (element.height() / 2);
      
      x *= $global.world.size / 2;
      y *= $global.world.size / 2;
      
      return {x: x, y: y};
    };
    
    var isMouseDown = false;
    
    var setHeroPickupState = function(newState) {
      if ($global.world.hero.isBeingPickedUp && !newState) {
        // He was being picked up, but not anymore.
        $audio.playAudio('audio-splatdown');
      }
      else if (!$global.world.hero.isBeingPickedUp && newState) {
        // He just got picked up.
        $audio.playAudio('audio-squishypop');
      }
      
      $global.world.hero.isBeingPickedUp = newState;
      scope.$apply();
    };
    
    $(element).mouseout(function(e) {
      isMouseDown = false;
      setHeroPickupState(false);
    }).mouseup(function(e) {
      isMouseDown = false;
      setHeroPickupState(false);
    }).mousedown(function(e) {
      isMouseDown = true;
    }).mousemove(function(e) {
      var worldMousePosition = getWorldCoordsOfMouseEvent(e);
      
      var distToHero = 
          Math.hypot(worldMousePosition.x - $global.world.hero.position.x, 
              worldMousePosition.y - $global.world.hero.position.y);

      $(element).removeClass('mouseoverhero mousegrabbinghero');
      if (distToHero < 10) {
        if (isMouseDown) {
          $(element).addClass('mousegrabbinghero');
          setHeroPickupState(true);
          
          $global.world.hero.position.x = worldMousePosition.x;
          $global.world.hero.position.y = worldMousePosition.y;
          scope.$apply();
          
        } else {
          $(element).addClass('mouseoverhero');
          setHeroPickupState(false);
        }
      }
    });
  };
  
  return {
    scope: {
    },
    link: link
  };
}]);
/* global $ */
/* global _ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugPrefetch', ['$global', function($global) {
  var link = function(scope, element, attrs) {
    $(element).addClass('prefetch');
    
    var prefetchPending = [];
    var maxWaiting = 0;
    
    var updateVisibility = function() {
      if (!!$global.prefetch.ready) {
        $(scope.cyberslugPrefetch).css({display: ''});
        $(scope.placeholder).css({display: 'none'});
      }
      else {
        $(scope.cyberslugPrefetch).css({display: 'none'});
        $(scope.placeholder).css({display: ''});
      }
      
      $('.progress .progress-level', scope.placeholder).each(function() {
        var scalepos = 1 - (prefetchPending.length / maxWaiting);
        $(this).css({
          left: (100 * scalepos) + '%'
        });
      });
    };
    
    var setPrefetchReady = function() {
      scope.$apply();
      
      $('#playbutton').css({display:''});
      $('h1', scope.placeholder).css({display: 'none'});
      $('.progress', scope.placeholder).css({display: 'none'});
      
      updateVisibility();
    };    

    $(element).children().each(function() {
      var prefetchResource = this;
      var jqPrefetchResource = $(prefetchResource);
      
      prefetchPending.push(prefetchResource);
      if (prefetchPending.length > maxWaiting) {
        maxWaiting = prefetchPending.length;
      }
      
      var unpend = function() {
        if (!_.contains(prefetchPending, prefetchResource)) {
          // It's nice that you're ready, but we aren't asking for you anymore.
          return;
        }
        
        prefetchPending = _.without(prefetchPending, prefetchResource);
        if (prefetchPending.length === 0) {
          setPrefetchReady();
        }
        updateVisibility();
      };
      
      var unpendError = unpend;
      var unpendSuccess = function() {
        unpend();
        if (!!prefetchResource.id) {
          $global.prefetch.resources[prefetchResource.id] = $(prefetchResource);
          scope.$apply();
        }        
      };
      
      jqPrefetchResource.
          on('error', unpendError).
          on('load', unpendSuccess).
          on('canplaythrough', unpendSuccess);
    });
    
    scope.$watch('placeholder', function(newValue, oldValue) {
      $(oldValue).css({display: ''});
      updateVisibility();
    });
    
    updateVisibility();

    if (!!scope.timeout) {
      // After timeout milliseconds, fuck you you're ready.
      setTimeout(setPrefetchReady, scope.timeout);
    }

    // We need an explicit Play button because
    // on Chrome for mobile, the user needs to 
    // interact with the site in order to activate sounds.
    // It's a Chrome security thing.
    var playbutton = $('#playbutton');
    playbutton.click(function() {
      $global.prefetch.ready = true;
      $global.runstate = 'play';
      scope.$apply();
      updateVisibility();
    });
  };
  
  return {
    scope: {
      cyberslugPrefetch: '=',
      placeholder: '=',
      timeout: '='
    },
    link: link
  };
}]);
/* global $ */
/* global _ */
/* global cyberslugApp */

cyberslugApp.directive('cyberslugTutorial', [
    '$global', '$audio', '$timeout',
    function($global, $audio, $timeout) {
  var link = function(scope, element, attrs) {
    var tutorialCtrl = scope.$parent.tutorialCtrl;
    scope.tutorialCtrl = tutorialCtrl;
    scope.$global = $global;

    var myAppearanceTimeout = null;
    
    var cancelMyAppearance = function(ev) {
      // Fix the vertical collapse problem that happens with elements
      // with automatic height, i.e. ones that don't have Rhanor.
      element.removeClass('showing');
      $timeout(function() {
        $(element).css({display: ''});
      }, 500);
      
      if (!!myAppearanceTimeout) {
        $timeout.cancel(myAppearanceTimeout);
        myAppearanceTimeout = null;
      }
    };
    
    
    var makeMeAppear = function(ev) {
      if ($global && $global.tutorial && !$global.tutorial.active) {
        // Don't show if tutorial mode has been switched off.
        return;
      }
      
      if (!_.isUndefined(element[0].dataset.neverShow)) {
        return;
      }
      
      if (!!myAppearanceTimeout) {
        // We're already in the process of appearing.
        return;
      }

      if (element.is('.showing')) {
        // Don't show if we're already showing.
        return;
      }
      
      var appearanceDelay = scope.appearAfterDelay || 0;
      
      myAppearanceTimeout = $timeout(function() {
        myAppearanceTimeout = null;
        
        // Test to see if any other tutorial overlays are currently visible.
        // Only one tutorial overlay is permitted to be visible at a time.
        if ($('.tutorialoverlay.showing').length > 0) {
          return;
        }

        $(element).css({display: 'inherit'});
        $timeout(function() {
          element.addClass('showing');
        }, 100);
        
        tutorialCtrl.tutorialpage = 0;
        tutorialCtrl.currentTutorialElement = element;
        tutorialCtrl.dismissElement = cancelMyAppearance;
        
        // Once we show, never show again if we aren't supposed to.
        if (!_.isUndefined(element[0].dataset.onlyShowOnce)) {
          element[0].dataset.neverShow = '';
        } else {
          delete element[0].dataset.neverShow;
        }
      }, appearanceDelay);
    };
    
    scope.$watch('mouseoverTrigger', function(newValue, oldValue) {
      if (!!oldValue) {
        $(oldValue).off('mouseenter', makeMeAppear);
        $(oldValue).off('mouseleave', cancelMyAppearance);
      }

      if (!!newValue) {
        $(newValue).on('mouseenter', makeMeAppear);
        if (scope.disappearOnMouseout) {
          $(newValue).on('mouseleave', cancelMyAppearance);
        }
      }
    });
    
    scope.$watch('tutorialCtrl.tutorialpage', function(newValue) {
      $('[data-tutorial-page]', element).hide();
      $('[data-tutorial-page=' + newValue + ']', element).show();
    });
    
    scope.$watch('$global.tutorial.active', function(newValue) {
      if (!newValue) {
        cancelMyAppearance();
      }
    });
  };
  
  return {
    scope: {
      cyberslugTutorial: '=',
      mouseoverTrigger: '=',
      
      appearAfterDelay: '=',
      disappearOnMouseout: '=',

      onlyShowOnce: '=',
      neverShow: '='
    },
    
    link: link
  };
}]);



