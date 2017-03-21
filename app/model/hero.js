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
    context.stroke();
    
    context.restore();
    // Everything restored again.
  };
  
  var drawFrame = function(context) {
    var gradient;
    
    if (!textureImg.loaded) {
      return;
    }
    
    drawTravelHistory(context);
    
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
    
    // Oral front begin.
    context.save();
    
    context.beginPath();
    context.moveTo(-25,-25);
    context.lineTo(-40,-60);
    context.lineTo(40,-60);
    context.lineTo(25,-25);
    context.clip();
    context.drawImage(textureImg, -40, -60);
    
    gradient = context.createRadialGradient(0,-80, 0, 0,-80, 60);
    gradient.addColorStop(0, 'rgba(0,0,0,.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    context.fillStyle = gradient;
    context.fillRect(-40,-60, 80,35);
    context.restore();
    // Oral front end.    
    
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
  };

  var tick = function(ticks) {
    wiggletick += ticks;
    
    hero.position.angle += ticks * 0.02 * Math.random() - ticks * 0.01;
    hero.position.x += ticks * .1 * Math.cos(hero.position.angle);
    hero.position.y += ticks * .1 * Math.sin(hero.position.angle);
    
    hero.travelHistory.push([hero.position.x, hero.position.y]);
  };
  
  
  hero.reset = reset;
  hero.drawFrame = drawFrame;
  hero.tick = tick;
  
  getHero = function() {
    return hero;
  };
}());