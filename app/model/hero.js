/* global Image */

var getHero = null;

(function() {
  var wiggletick = 0;
  
  var textureImg = new Image();
  textureImg.src = 'img/light-mottled-orange.jpg';
  textureImg.onload = function() {
    textureImg.loaded = true;
  };
  
  var hero = {};
  
  var drawFrame = function(context) {
    var gradient;
    
    if (!textureImg.loaded) {
      return;
    }
    
    context.save();
    
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
  };
  
  var reset = function() {
    hero.position = {
      x: 0,
      y: 0,
      angle: 0
    };
  };

  var tick = function(ticks) {
    wiggletick += ticks;
  };
  
  
  hero.reset = reset;
  hero.drawFrame = drawFrame;
  hero.tick = tick;
  
  getHero = function() {
    return hero;
  };
}());