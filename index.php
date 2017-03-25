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
    <script src="app/cyberslug-tutorial.js?nocache=<?php echo time(); ?>"></script>

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
      <img src="img/glyph-audio-0.png"></img>
      <img src="img/glyph-audio-1.png"></img>
      <img src="img/glyph-audio-2.png"></img>
      <img src="img/glyph-audio-3.png"></img>
      <img src="img/glyph-down-arrow.png"></img>
      <img src="img/rca-jacks.png"></img>
      <img src="img/control-dial-base.png"></img>
      <img src="img/control-dial-knob.png"></img>
      <img src="img/copper-dark.jpg"></img>
      <img src="img/red-light-off.png"></img>
      <img src="img/red-light-on.png"></img>
      <img src="img/switch-down.png"></img>
      <img src="img/switch-up.png"></img>
      <img src="img/downwards_glowing_green_arrow.png"></img>

      <img src="img/rhanor/rhanor-noise/rhanor-noise.gif"></img>

      <img src="fonts/digital_counter_7.ttf"></img>
      
      <audio id="audio-switch" 
          src="audio/switch.mp3"
          class="audio-interface"
          data-audio-level="1"
          ></audio>
      <audio id="audio-button" 
          src="audio/button.mp3"
          class="audio-interface"
          data-audio-level="1"
          ></audio>
      <audio id="audio-dialtick" 
          src="audio/dialtick.wav"
          class="audio-interface"
          data-audio-level="1"
          ></audio>
      
      <audio id="audio-squishypop" 
          src="audio/squishypop.wav"
          class="audio-view"
          data-audio-level="2"
          ></audio>
      <audio id="audio-splatdown" 
          src="audio/splat-quick.wav"
          class="audio-view"
          data-audio-level="2"
          ></audio>
      <audio id="audio-squishcrawl" 
          src="audio/squishcrawl.wav"
          class="audio-view"
          loop="true"
          data-audio-level="2"
          ></audio>
      <audio id="audio-eatslurp" 
          src="audio/eatslurp-dehumanized.wav"
          class="audio-view"
          data-audio-level="2"
          ></audio>
      
      <audio id="audio-bgmusic" 
          src="audio/172561__djgriffin__video-game-7.mp3" 
          volume="0.5" 
          loop="true"
          class="audio-music"
          data-exclusion-group="bgmusic"
          data-audio-level="3"
          ></audio>
      <audio id="audio-bgmusic-fast" 
          src="audio/369066__mrthenoronha__hurry-loop.mp3" 
          volume="0.2" 
          loop="true"
          class="audio-music"
          data-exclusion-group="bgmusic"
          data-audio-level="3"
          ></audio>
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
            <div data-cyberslug-dial="metacontrolsCtrl.$global.audio.level" 
                id="dial-audio"
                data-min="0"
                data-max="3"
                data-tick-interval="1"
                data-on-change="metacontrolsCtrl.$global.audio.updateLevel"
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
      
      
      
      
      

      
      
      <div id="tutorial" data-ng-controller="TutorialCtrl as tutorialCtrl">
        <div 
            data-cyberslug-tutorial=""
            data-mouseover-trigger="'#gamesurface'"
            id="tutorial-intro"
            class="tutorialoverlay rhanorside"
            data-appear-after-delay="750"
            data-only-show-once="true"
            >
          <header>Introduction</header>
          <div class="tutorialpage" data-tutorial-page="0">
            <p>
              Welcome to the lab!
            </p>
            <p>
              I'm <a href="https://mcb.illinois.edu/faculty/profile/rhanor/" target="_blank">Dr. Rhanor Gillette</a>,  
              Emeritus Professor of Molecular and Integrative 
              Physiology at the University of Illinois 
              at Urbana-Champaign.
            </p>
            <p>
              I'll be showing you around the equipment and 
              teaching you how everything works here.
            </p>
            <div class="buttonrow">
              <button data-ng-click="tutorialCtrl.nextPage()">
                Next
              </button>
            </div>
          </div> <!-- page 0 -->
          <div class="tutorialpage" data-tutorial-page="1">
            <p>
              Our research focuses on the brain of an animal called
              <em>Pleurobranchaea californica.</em>
            </p>
            <p>
              It's a 
              <a href="http://www.seaslugforum.net/find/pleucali" target="_blank">sea slug</a>, 
              about the size of a grapefruit. It lives in the Pacific
              Ocean, where it spends its time crawling along the ocean
              floor hunting tasty morsels. While it will try to eat 
              anything that moves, its most common prey is other smaller
              sea slugs like <em>Flabellina</em> and <em>Hermissenda</em>. 
            </p>
            <div class="buttonrow">
              <button data-ng-click="tutorialCtrl.nextPage()">
                Next
              </button>
            </div>
          </div> <!-- page 1 -->
          <div class="tutorialpage" data-tutorial-page="2">
            <p>
              Its brain is pretty small and simple &mdash; altogether, it's only 
              several thousand neurons. And yet with this tiny brain, the 
              <em>Pleurobranchaea</em> performs some relatively 
              nontrivial decision-making, and is even capable of 
              learning from experience! If we can crack exactly how it does this,
              we might learn a lot about how our own brains work &mdash;
              the human brain has over ten billion neurons, but 
              the principles of operation aren't necessarily all that different.
            </p>
            <div class="buttonrow">
              <button data-ng-click="tutorialCtrl.nextPage()">
                Next
              </button>
            </div>
          </div> <!-- page 2 --> 
          <div class="tutorialpage" data-tutorial-page="3">
            <p>
              We've charted enough of this creature's brain to build a 
              software simulation of some of its decision-making circuitry.
              That's what you're looking at right now.
            </p>
            <div class="buttonrow">
              <button data-ng-click="tutorialCtrl.nextPage()">
                Next
              </button>
            </div>
          </div> <!-- page 3 --> 
          <div class="tutorialpage" data-tutorial-page="4">
            <p>
              In this computer model, the <em>Pleurobranchaea</em>
              forages amongst three different kinds of prey.
            </p>
            <p>
              <span class="tutorialspan-morsel tutorialspan-hermi">
                Hermissenda
              </span>
              are nutritious and lack natural defenses, so they're 
              Cyberslug's favorite food.
            </p>
            <p>
              <span class="tutorialspan-morsel tutorialspan-flab">
                Flabellina
              </span>
              are just as nutritious, but have toxic spines.
              Cyberslug will only approach them if it's incredibly 
              hungry.
            </p>
            <p>
              <span class="tutorialspan-morsel tutorialspan-faux">
                Faux
              </span>
              is a Batesian mimic. It exudes a chemical odor signature
              (i.e. smells) like <em>Flabellina</em>,
              but doesn't have those toxic spines.
            </p>
            <div class="buttonrow">
              <button data-ng-click="tutorialCtrl.nextPage()">
                Next
              </button>
            </div>
          </div> <!-- page 4 -->
          <div class="tutorialpage" data-tutorial-page="5">
            <p>
              With only a handful of neurons controlling its actions,
              the <em>Pleurobranchaea</em> is able to strategize
              about what to eat and where to go. By making the right 
              choices, it's able to make optimal use of its food
              resources, acquiring enough nutrition to survive while
              generally avoiding harm as much as possible.
            </p>
            <div class="buttonrow">
              <button data-ng-click="tutorialCtrl.nextPage()">
                Next
              </button>
            </div>
          </div> <!-- page 5 -->
          <div class="tutorialpage" data-tutorial-page="6">
            <p>
              Cyberslug lets you watch this decision-making process in 
              real time. The equipment around you gives you an inside
              view into the slug's decision-making processes, opening
              a window into the neural pathways that make this 
              animal's behavior possible.
            </p>
            <p>
              In our lab, we think this is pretty interesting in its own right!
              But we also believe that a software simulation of the slug's 
              simple yet powerful neurocircuitry could yield applications
              in robotics and intelligent agent design.
            </p>
            <div class="buttonrow">
              <button data-ng-click="tutorialCtrl.nextPage()">
                Next
              </button>
            </div>
          </div> <!-- page 6 -->
          <div class="tutorialpage" data-tutorial-page="7">
            <p>
              Well I've certainly done enough talking for now! I'll let you
              play around for yourself.
            </p>
            <p>
              I'll stick around nearby. If you have any questions about 
              any of the equipment, simply <strong>hover over any control</strong>
              and I'll pop up and tell you all about it.
            </p>
            <p>
              Once you don't need me anymore, flip the "Info" switch below you 
              (the one with the <img class="inline-glyph" src="img/glyph-info-active.png" />
              icon), and I'll get out of your hair.
            </p>
            <p>
              Have a good science!
            </p>
            <div class="buttonrow">
              <button data-ng-click="tutorialCtrl.dismiss()">
                OK
              </button>
            </div>
            
            <div style="position:absolute;right:136px;top:432px;animation: bounce-up ease-in-out .5s infinite alternate;">
              <img src="img/downwards_glowing_green_arrow.png"></img>
            </div>
          </div> <!-- page 7 -->
        </div> <!-- intro -->
  
        <div 
            id="tutorial-dial-audio"
            data-cyberslug-tutorial=""
            data-mouseover-trigger="'#dial-audio'"
            class="tutorialoverlay"
            data-appear-after-delay="750"
            data-disappear-on-mouseout="true"
            >
          <header>Audio Control</header>
          <p>
            This dial adjusts the audio levels of the Cyberslug 2017 lab.
            It has four notches.
            <ul>
              <li><em>Max</em>: Background music, slug noises, and interface noises.</li>
              <li><em>No music</em>: Slug noises and interface noises only.</li>
              <li><em>Interface</em>: Only the equipment's controls make sounds.</li>
              <li><em>Silence</em>: No audio.</li>
            </ul>
          </p>
        </div> <!-- dial-audio -->
        
        <div 
            data-cyberslug-tutorial=""
            data-mouseover-trigger="'#canvasnameplate'"
            id="tutorial-canvasnameplate"
            class="tutorialoverlay rhanorside"
            data-appear-after-delay="750"
            >
          <header>About Cyberslug 2017</header>
          <p>
            This software presents studies conducted by 
            <a href="https://mcb.illinois.edu/faculty/profile/rhanor/">my lab</a>
            in the School of Molecular and Cellular Biology 
            at the University of Illinois at Urbana-Champaign. 
            My research team includes Graduate Research Assistant
            <a href="https://beckman.illinois.edu/directory/person/gribkov2">
              Ekaterina D. Gribkova
            </a>.
          </p>
          
          <p>
            Cyberslug was developed by Mikhail Voloshin,
            a computational neuroscience graduate student of mine from 
            back in 2000. He's since gone on to work at 
            Microsoft, Google, a few dot-coms, and 
            a couple of hedge funds. 
            
            <a href="https://www.amazon.com/dp/1533001731/" target="_blank">He's even written a novel!</a>
            It's called 
            <a href="https://www.amazon.com/dp/1533001731/" target="_blank"><em>Dopamine</em></a>. 
            You should go check it out!
          </p>
          <div class="buttonrow">
            <button data-ng-click="tutorialCtrl.dismiss()">
              I'll totally go read Mikhail's novel
            </button>
          </div>
        </div>



        
  
      </div> <!-- tutorial -->
    </div> <!-- container-fluid -->

  </body>
</html>
