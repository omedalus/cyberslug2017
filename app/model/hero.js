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


  var drawTravelHistory = function(context) {
    context.save();
    
    context.beginPath();
    context.moveTo(0,0);
    var lastPoint = [0,0];
    _.each(hero.travelHistory, function(coords) {
      if (Math.hypot(coords[0]-lastPoint[0], coords[1]-lastPoint[1]) > 20) {
        // Our hero only travels in short increments. He could not have
        // jumped so many whole units.
        // We must've gone around the toroid. Lift our pen.
        context.moveTo(coords[0], coords[1]);
      } else {
        context.lineTo(coords[0], coords[1]);
      }
      lastPoint = coords;
    });
    context.strokeStyle = 'rgba(128,100,30, .5)';
    context.lineWidth = 1; // This is thicker than a pixel
    context.stroke();
    
    context.restore();
    // Everything restored again.
  };
  
  var drawFrame = function(context) {
    var gradient;
    
    if (!textureImg.loaded) {
      return;
    }
    
    //drawTravelHistory(context);
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
    
    // Proboscis begin.
    context.save();
    
    context.beginPath();
    context.moveTo(-8,0);
    context.lineTo(-8, -50 - hero.proboscisExtension / 2);
    context.lineTo(8, -50 - hero.proboscisExtension / 2);
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
    
    context.beginPath();
    context.moveTo(30, -40);
    context.lineTo(70 + 5 * Math.cos(wiggletick / 7), -70);
    context.lineTo(40, -20);
    context.moveTo(-30, -40);
    context.lineTo(-70 + 5 * Math.cos(wiggletick / 13), -70);
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
    console.log(hero.proboscisExtension)
  };

  var tick = function(ticks) {
    wiggletick += ticks;
    
    processPhysiologicalModel(ticks);
    maybeExtendProboscis(ticks);

    hero.position.angle += ticks * 0.02 * Math.random() - ticks * 0.01;
    hero.position.x += ticks * .1 * Math.cos(hero.position.angle);
    hero.position.y += ticks * .1 * Math.sin(hero.position.angle);
    
    hero.travelHistory.push([hero.position.x, hero.position.y]);
  };
  
  hero.reset = reset;
  hero.drawFrame = drawFrame;
  hero.tick = tick;
  
  hero.getSensorPositions = getSensorPositions;
  
  getHero = function() {
    return hero;
  };
}());