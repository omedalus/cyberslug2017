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

    <script src="app/cyberslug-module.js?nocache=<?php echo time(); ?>"></script>

    <title>Cyberslug 2017</title>
  </head>

  <body>
    <div class="container-fluid" id="gamesurface">
      <div class="col-md-8 oscilloscopepanel" id="canvasholder">
        <canvas width="500" height="500" id="gamecanvas"></canvas>
        <div id="canvasnameplate">
          Cyberslug 2017<br/>
          Dr. Rhanor Gillette et. al.<br/>
          School of Molecular and Cellular Biology</br>
          University of Illinois at Urbana-Champaign<br/>
          Copyright 2017 &copy; Mikhail Voloshin. All rights reserved.
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="oscilloscopepanel" data-ng-controller="SetupCtrl as setupCtrl">
          <div id="buttonrow">
            <button 
                data-ng-repeat="buttonid in ['stop', 'play', 'ff', 'step']"
                id="btn-{{buttonid}}"
                class="btn skeuo"
                data-ng-class="{active: setupCtrl.$global.runstate == buttonid, 'skeuo-main': buttonid == 'play'}"
                data-ng-click="setupCtrl.$global.runstate = buttonid"
            />
          </div> <!-- buttonrow -->

          <div id="rca-jacks"></div>
        
        {{setupCtrl.$global.setup.population.hermissenda}}
          <div id="dialrow">
            <div class="dial"
                data-cyberslug-dial="setupCtrl.$global.setup.population.hermissenda"
                data-min="0"
                data-max="15"
                data-tick-interval="1"></div>
            <div class="dial"></div>
            <div class="dial"></div>
          </div> <!-- dialrow -->
        </div> <!-- oscilloscopepanel -->
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="oscilloscopepanel">
          <button class="btn skeuo">Button</button>
        </div>
      </div>

    </div> <!-- container-fluid -->
  </body>
    
</html>
