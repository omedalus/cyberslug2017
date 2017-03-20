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
      <div class="col-md-8" id="canvasholder">
        <canvas width="500" height="500" id="gamecanvas"></canvas>
        <div id="canvasnameplate">
          Cyberslug 2017<br/>
          Dr. Rhanor Gillette et. al.<br/>
          University of Illinois at Urbana-Champaign.<br/>
          Copyright 2017 &copy; Mikhail Voloshin. All rights reserved.
        </div>
      </div>
      <div class="col-md-2" id="animcontrols">
          <button class="btn">Button</button>
      </div>
      <div class="col-md-2" id="animstates">
          <button class="btn">Button</button>
      </div>

      <div class="row">
        <footer class="col-xs-12">
          Copyright &copy; 2017 Mikhail Voloshin, for use by Dr. Rhanor Gillette
          and associates at the University of Illinois at Urbana-Champaign.
          Please direct any inquiries to omedalus -at- gmail.com.
          All rights reserved.
        </footer>
      </div>
    </div> <!-- container-fluid -->
  </body>
    
</html>
