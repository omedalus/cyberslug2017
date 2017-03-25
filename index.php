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
    <script src="app/cyberslug-audio.js?nocache=<?php echo time(); ?>"></script>
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
        data-timeout="4000"
        style="display:none"
    >
      <img src="img/green-neuron-background.jpg"></img>
      <img src="img/cyberslug.png"></img>
      <img src="img/black-foam-texture.jpg"></img>
      <img src="img/brushed-aluminum.jpg"></img>
      <img src="img/black-leather-texture.jpg"></img>
      <img src="img/screw-lf-dark.png"></img>
      <img src="img/screw-rt-dark.png"></img>
      <img src="img/skeuo-btn-blue.png"></img>
      <img src="img/skeuo-btn-orange.png"></img>
      <img src="img/glyph-play.png"></img>
      <img src="img/glyph-play-active.png"></img>
      <img src="img/glyph-stop.png"></img>
      <img src="img/glyph-stop-active.png"></img>
      <img src="img/glyph-ff.png"></img>
      <img src="img/glyph-ff-active.png"></img>
      <img src="img/glyph-step.png"></img>
      <img src="img/glyph-step-active.png"></img>
      <img src="img/glyph-pause.png"></img>
      <img src="img/glyph-pause-active.png"></img>
      <img src="img/glyph-info.png"></img>
      <img src="img/glyph-info-active.png"></img>
      <img src="img/glyph-audio.png"></img>
      <img src="img/rca-jacks.png"></img>
      <img src="img/control-dial-base.png"></img>
      <img src="img/control-dial-knob.png"></img>
      <img src="img/copper-dark.jpg"></img>
      <img src="img/red-light-off.png"></img>
      <img src="img/red-light-on.png"></img>
      <img src="img/switch-down.png"></img>
      <img src="img/switch-up.png"></img>

      <img src="fonts/digital_counter_7.ttf"></img>
      
      <audio id="audio-switch" src="audio/switch.mp3"></audio>
      <audio id="audio-button" src="audio/button.mp3"></audio>
      <audio id="audio-dialtick" src="audio/dialtick.wav"></audio>
      <audio id="audio-squishypop" src="audio/squishypop.wav"></audio>
      <audio id="audio-splatdown" src="audio/splat-quick.wav"></audio>
      <audio id="audio-squishcrawl" src="audio/squishcrawl.wav"></audio>
      <audio id="audio-eatslurp" src="audio/eatslurp-dehumanized.wav"></audio>
      
      <audio id="audio-bgmusic" src="audio/172561__djgriffin__video-game-7.mp3" volume="0.5" loop="true"></audio>
      <audio id="audio-bgmusic-fast" src="audio/369066__mrthenoronha__hurry-loop.mp3" volume="0.2" loop="true"></audio>
    </div>
    
    <div id="prefetch-placeholder" style="display:none">
      <h1>Loading...</h1>
      <div class="progress"><div class="progress-level"></div></div>
      <div id="playbutton" style="display:none">Play</div>
    </div>
    
    <div class="container-fluid" id="gamesurface" style="display:none">
      <div class="col-md-8 col-lg-6 oscilloscopepanel" id="canvasholder">
        <canvas 
            width="500" 
            height="500" 
            id="gamecanvas"
            data-cyberslug-game-canvas=""></canvas>
            
        <div id="belowcanvas">
          <div id="canvasnameplate">
            <div class="nameplate-title">Cyberslug 2017</div>
            Dr. Rhanor Gillette et. al.<br/>
            U. Illinois Urbana-Champaign
            <div class="copyright">
               &copy;2017 Mikhail Voloshin 
            </div>
          </div>
          
          <div data-ng-controller="MetacontrolsCtrl as metacontrolsCtrl"
              id="metacontrols" class="instrumentrow insetcontrolsrow">
            <div data-cyberslug-switch="metacontrolsCtrl.$global.tutorial.active" id="switch-info"></div>
            <div data-cyberslug-dial="metacontrolsCtrl.$global.displaysettings.audiolevel" 
                id="dial-audio"
                data-min="0"
                data-max="3"
                data-tick-interval="1""
            ></div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-lg-6">
        <div class="oscilloscopepanel" data-ng-controller="SetupCtrl as setupCtrl">
          <div id="buttonrow" class="instrumentrow">
            <button 
                data-ng-repeat="buttonid in ['stop', 'play', 'ff', 'step', 'pause']"
                id="btn-{{buttonid}}"
                class="btn skeuo"
                data-ng-class="{active: setupCtrl.$global.runstate == buttonid, 'skeuo-main': buttonid == 'play'}"
                data-ng-click="onSkeuoButton(buttonid)"
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
          
          <div id="displaycontrolsrow" class="instrumentrow insetcontrolsrow">
            <div data-cyberslug-dial="setupCtrl.$global.displaysettings.showtrail"
                data-label="'trail'"
                data-min="0"
                data-max="1500"
                data-tick-interval="100"
                data-number-interval="300"></div>          
            <div data-cyberslug-switch="setupCtrl.$global.displaysettings.showodors.odor_hermi"
                data-label="'hermi'"
                ></div>
            <div data-cyberslug-switch="setupCtrl.$global.displaysettings.showodors.odor_flab"
                data-label="'flab'"
                ></div>
            <div data-cyberslug-switch="setupCtrl.$global.displaysettings.showodors.odor_betaine"
                data-label="'\u03B2ine'"
                ></div>
            

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
            ></div
            ><div data-cyberslug-gauge="readoutCtrl.hero.modelvars.Vh"
                data-label="'V_hermi'"
                data-min="0"
                data-max="1"
                data-tick-interval=".1"
                data-number-interval=".5"
            ></div
            ><div data-cyberslug-gauge="readoutCtrl.hero.modelvars.Vf"
                data-label="'V_flab'"
                data-min="0"
                data-max="1"
                data-tick-interval=".1"
                data-number-interval=".5"
            ></div>
            
          </div> <!-- gauges row -->
          
          
          <div id="feedingrow" class="instrumentrow">
            <div id="feedinghistory">
              <div class="feedrow">
                <label>HERMI EATEN</label>
                <div class="feedcount">{{0 + readoutCtrl.hero.feedcount.hermissenda}}</div>
              </div>
              <div class="feedrow">
                <label>FLAB EATEN</label>
                <div class="feedcount">{{0 + readoutCtrl.hero.feedcount.flabellina}}</div>
              </div>
              <div class="feedrow">
                <label>FAUX EATEN</label>
                <div class="feedcount">{{0 + readoutCtrl.hero.feedcount.faux}}</div>
              </div>
            </div>
            
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
