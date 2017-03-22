<?php
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate"); // HTTP/1.1
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache"); // HTTP/1.0
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
?><!DOCTYPE html>
<html data-ng-app="cyberslugApp">
  <head>
    <?php include 'php/html_head_common.php'; ?>
    
    <!-- The cyberslugApp angularjs app -->

    <script src="app/model/hero.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/model/world.js?nocache=<?php echo time(); ?>"></script>

    <script src="app/cyberslug-app.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/cyberslug-global.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/cyberslug-dial.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/cyberslug-gauge.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/cyberslug-switch.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/cyberslug-game-canvas.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/cyberslug-prefetch.js?nocache=<?php echo time(); ?>"></script>

    <title>Cyberslug 2017</title>
  </head>

  <body>
    <div 
        data-cyberslug-prefetch="'#gamesurface'" 
        data-placeholder="'#prefetch-placeholder'"
        style="display:none"
    >
      <img src='img/green-neuron-background.jpg'></img>
      <img src='img/cyberslug.png'></img>
      <img src='img/black-foam-texture.jpg'></img>
      <img src='img/brushed-aluminum.jpg'></img>
      <img src='img/black-leather-texture.jpg'></img>
      <img src='img/screw-lf-dark.png'></img>
      <img src='img/screw-rt-dark.png'></img>
      <img src='img/skeuo-btn-blue.png'></img>
      <img src='img/skeuo-btn-orange.png'></img>
      <img src='img/glyph-play.png'></img>
      <img src='img/glyph-play-active.png'></img>
      <img src='img/glyph-stop.png'></img>
      <img src='img/glyph-stop-active.png'></img>
      <img src='img/glyph-ff.png'></img>
      <img src='img/glyph-ff-active.png'></img>
      <img src='img/glyph-step.png'></img>
      <img src='img/glyph-step-active.png'></img>
      <img src='img/rca-jacks.png'></img>
      <img src='img/control-dial-base.png'></img>
      <img src='img/control-dial-knob.png'></img>
      <img src='img/copper-dark.jpg'></img>
      <img src='img/red-light-off.png'></img>
      <img src='img/red-light-on.png'></img>
      <img src='img/switch-down.png'></img>
      <img src='img/switch-up.png'></img>
    </div>
    
    <div id="prefetch-placeholder" style="display:none">
      <h1>Loading...</h1>
      <progress></progress>
    </div>
    
    <div class="container-fluid" id="gamesurface" style="display:none">
      <div class="col-md-8 col-lg-6 oscilloscopepanel" id="canvasholder">
        <canvas 
            width="500" 
            height="500" 
            id="gamecanvas"
            data-cyberslug-game-canvas=""></canvas>
        <div id="canvasnameplate">
          Cyberslug 2017<br/>
          Dr. Rhanor Gillette et. al.<br/>
          School of Molecular and Cellular Biology</br>
          University of Illinois at Urbana-Champaign<br/>
          Copyright 2017 &copy; Mikhail Voloshin. All rights reserved.
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-lg-6">
        <div class="oscilloscopepanel" data-ng-controller="SetupCtrl as setupCtrl">
          <div id="buttonrow" class="instrumentrow">
            <button 
                data-ng-repeat="buttonid in ['stop', 'play', 'ff', 'step']"
                id="btn-{{buttonid}}"
                class="btn skeuo"
                data-ng-class="{active: setupCtrl.$global.runstate == buttonid, 'skeuo-main': buttonid == 'play'}"
                data-ng-click="setupCtrl.$global.runstate = buttonid"
            />
          </div> <!-- buttonrow -->

          <div id="rca-jacks"></div>
        
          <div id="dialrow" class="instrumentrow">
            <div data-cyberslug-dial="setupCtrl.$global.setup.population.hermissenda"
                data-label="'hermissenda'"
                data-min="0"
                data-max="15"
                data-tick-interval="1"
                data-number-interval="5"></div>
            <div data-cyberslug-dial="setupCtrl.$global.setup.population.flabellina"
                data-label="'flabellina'"
                data-min="0"
                data-max="15"
                data-tick-interval="1"
                data-number-interval="5"></div>
            <div data-cyberslug-dial="setupCtrl.$global.setup.population.faux"
                data-label="'fauxflab'"
                data-min="0"
                data-max="15"
                data-tick-interval="1"
                data-number-interval="5"></div>
          </div> <!-- dialrow -->
          
          <div id="switchesrow" class="instrumentrow">
            <div data-cyberslug-switch="setupCtrl.$global.displaysettings.showtrail"
                data-label="'trail'">
            </div>
          </div> <!-- switchesrow -->
          
          
        </div> <!-- oscilloscopepanel -->
      </div>
      <div class="col-md-4 col-sm-6 col-lg-6">
        <div class="oscilloscopepanel" data-ng-controller="ReadoutCtrl as readoutCtrl">
          <div id="gaugesrow" class="instrumentrow">
            <div data-cyberslug-gauge="readoutCtrl.hero.modelvars.nutrition"
                data-label="'Nutrition'"
                data-min="0"
                data-max="1"
                data-tick-interval=".1"
                data-number-interval=".2"
                data-readout-danger="readoutCtrl.hero.modelvars.nutrition < 0.2"
                data-readout-warning="readoutCtrl.hero.modelvars.nutrition < 0.4"
                data-readout-great="readoutCtrl.hero.modelvars.nutrition > 0.7"
            ></div
            ><div data-cyberslug-gauge="readoutCtrl.hero.modelvars.satiation"
                data-label="'Satiation'"
                data-min="0"
                data-max=".5"
                data-tick-interval=".05"
                data-number-interval=".1"
                data-readout-danger="readoutCtrl.hero.modelvars.satiation < 0.1"
                data-readout-warning="readoutCtrl.hero.modelvars.satiation < 0.2"
                data-readout-great="readoutCtrl.hero.modelvars.satiation > 0.4"
            ></div
            ><div data-cyberslug-gauge="readoutCtrl.hero.modelvars.incentiveSalience"
                data-label="'Incentive'"
                data-min="0"
                data-max="10"
                data-tick-interval="1"
                data-number-interval="5"
            ></div
            ><div data-cyberslug-gauge="readoutCtrl.hero.modelvars.somaticMap"
                data-label="'SomaticMap'"
                data-min="-1"
                data-max="1"
                data-tick-interval=".1"
                data-number-interval=".5"
            ></div>
            
          </div> <!-- gauges row -->
          
          
          <div id="lampsrow" class="instrumentrow">
            <div class="lamp"
                data-ng-class="{lampon: readoutCtrl.hero.modelvars.appetiteSwitch < 0}"
            >
              <label>HUNGRY</label>
            </div>
          </div> <!-- lamps row -->

        </div>
      </div>

    </div> <!-- container-fluid -->
  </body>
    
</html>
