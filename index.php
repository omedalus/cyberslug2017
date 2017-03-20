<?php
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate"); // HTTP/1.1
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache"); // HTTP/1.0
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
?><!DOCTYPE html>
<html data-ng-app="ngrambayesApp">
  <head>
    <?php include 'php/html_head_common.php'; ?>
    
    <!-- The ngrambayesApp angularjs app -->

    <script src="app/module.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/service-ctrl.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/dbsnapshot-ctrl.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/tasksubmit-ctrl.js?nocache=<?php echo time(); ?>"></script>
    <script src="app/alerts-ctrl.js?nocache=<?php echo time(); ?>"></script>
    
    <title>Yow Time Credit Tagger</title>
  </head>

  <body data-spy="scroll" data-target="#myNavbar" data-offset="70">
    <nav id="myNavBar" class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
    	<!-- Brand and toggle get grouped for better mobile display -->
    	<div class="container">
    		<div class="navbar-header">
    			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbarCollapse">
    				<span class="sr-only">Toggle navigation</span>
    				<span class="icon-bar"></span>
    				<span class="icon-bar"></span>
    				<span class="icon-bar"></span>
    			</button>
    			<a class="navbar-brand" href="#"><span class="cedricyaulogo"></span>Yow Time Credit Tagger</a>
    		</div>
    		<!-- Collect the nav links, forms, and other content for toggling -->
    		<div class="collapse navbar-collapse" id="navbarCollapse">
    			<ul class="nav navbar-nav">
    				<li><a href="#service">Service Status</a></li>
    				<li><a href="#tasksubmit" target="_blank">Task Submit</a></li>
    				<li><a href="#alerts" target="_blank">Alerts</a></li>
    			</ul>
    		</div>
    	</div>
    </nav>
    
    <div class="container">
      <div class="jumbotron">
        <h1>
          <span class="cedricyaulogo"></span>
          Falling sales, or missing data?
        </h1>
        <p>
          Every day, 
          <a href="https://www.samlyncapital.com/users/sign_in">Samlyn Capital</a>
          scans millions of credit card transaction records 
          to extract company identifiers.
          But these identifiers sometimes change,
          making the scanner miss them &mdash;
          which creates the illusion that a company is losing sales, sending 
          Samlyn a false SELL signal. 
        </p>
        <p>
          Yow Time's "ngrambayes" credit transaction tagger 
          uses machine-learning technologies
          to adapt automatically to changing data. It can
          alert human developers when the scanner needs to be updated or
          modified, thus averting unwarranted selloffs before they happen.
        </p>
      </div> <!-- jumbotron -->
  
      <div id="service" class="row" data-ng-controller="ServiceController as serviceCtrl">
        <h2>Service Status</h2>
        <p>
          View the current set of active task runners ready to execute the Yow Time 
          ngrambayes tagging system.
        </p>
        <div class="alert alert-warning fade in" data-ng-show="!serviceCtrl.runners.length">
          <a href="#" class="close" data-dismiss="alert">×</a>
          <strong>No task runners available.</strong> 
          There are currently no servers running the ngrambayes service.
        </div>
        
        <table class="table table-hover" data-ng-hide="!serviceCtrl.runners.length">
          <thead>
            <tr>
              <th>
                
              </th>
              <th>
                Task Runner ID
              </th>
              <th>
                Uptime
              </th>
            </tr>
          </thead>
          <tbody>
            <tr data-ng-repeat="runner in serviceCtrl.runners"
                data-ng-class="{active: runner == serviceCtrl.$rootScope.selectedRunner, 'warning': runner.last_heartbeat_ago > '00:00:30'}"
                data-ng-click="serviceCtrl.$rootScope.selectedRunner = runner">
              <td>
                <input type="radio" 
                    name="selectedRunner" 
                    data-ng-model="serviceCtrl.$rootScope.selectedRunner" 
                    data-ng-value="runner"></input>
              </td>
              <td>
                {{runner.runner_id}}
              </td>
              <td>
                {{runner.runner_started_ago}}
              </td>
            </tr>
          </tbody>
        </table>
      </div> <!-- Service Status -->

      <div id="taskstatus" class="row grid">
        <h2>Tasks</h2>
        <p>
          Check the status of every task in the <em>ngrambayes</em> processing pipeline.
        </p>

        <h3>Dependency Chart</h4>
        <div class="row row-eq-height">
          <div class="col-xs-2 alert alert-info">
            <h4>dbsnap4listbuild</h4>
            <button type="button" class="btn btn-default btn-block">Re-run</button> 
            <p>
              Query the database for a snapshot, optimized for building a list of prominent n-grams.
            </p>
          </div>
          <div class="col-xs-2 alert alert-info">
            <h4>listbuild</h4>
            <button type="button" class="btn btn-default btn-block">Re-run</button> 
            <p>
              Build a list of n-grams that appear most frequently in the data set.
              These prominent n-grams, which account for over 95% of the total n-gram population,
              will be the only ones considered by the training model.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2 alert alert-info">
            <h4>dbsnap4train</h4>
            <button type="button" class="btn btn-default btn-block">Re-run</button> 
            <p>
              Query the database for a snapshot, optimized for pulling credit transaction records that were assigned company tags by the regexer.
            </p>
          </div>
          <div class="col-xs-2"></div>
          <div class="col-xs-2 alert alert-info">
            <h4>modeltrain</h4>
            <button type="button" class="btn btn-default btn-block">Re-run</button> 
            <p>
              Train a new <em>ngrambayes</em> model. Determine which n-grams (from the set of prominent n-grams
              found in <em>listbuild</em>) appear most frequently with each company tag.
            </p>
          </div>
          <div class="col-xs-2 alert alert-info">
            <h4>modellink</h4>
            <button type="button" class="btn btn-default btn-block">Re-run</button> 
            <p>
              Condense the model data structure into a format optimized for tagging. This "production" format
              is unsuitable for further training, but is very efficient for making guesses about new data.
              I.e. it's no longer "writeable", but is optimally "readable".
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2 alert alert-info">
            <h4>dbsnap4tag</h4>
            <button type="button" class="btn btn-default btn-block">Re-run</button> 
            <p>
              Query the database for a snapshot, optimized for pulling credit transction records that were missed by the regexer.
            </p>
          </div>
          <div class="col-xs-2"></div>
          <div class="col-xs-2"></div>
          <div class="col-xs-2"></div>
          <div class="col-xs-2 alert alert-info">
            <h4>modeltag</h4>
            <button type="button" class="btn btn-default btn-block">Re-run</button> 
            <p>
              Examine the untagged records from <em>dbsnap4tag</em>, and make guesses about which companies
              each record is most likely to be referring to.
            </p>
          </div>
          <div class="col-xs-2 alert alert-info">
            <h4>alerts</h4>
            <button type="button" class="btn btn-default btn-block">Re-run</button> 
            <p>
              Take the strongest guesses from <em>modeltag</em>, and present them to the user (i.e. on this 
              interface, in the <a href="#alerts">Alerts</a> section below).
            </p>
          </div>
        </div>
      </div>


      <div class="row" id="alerts" data-ng-controller="AlertsController as alertsCtrl">
        <h2>Alerts</h2>
        <p>
          The latest run has produced the following anomalies that may require user attention.
          The list below shows credit transaction records that appear to be associated with
          a known company, but that the tagger failed to tag.
        </p>


        <form class="container form-horizontal">
          <fieldset>
            <div class="col-md-12">
              <button type="submit" 
                  class="btn btn-primary form-control"
                  data-ng-click="alertsCtrl.loadAlerts()"
                  >Load Alerts</button>
            </div>
          </fieldset>
        </form> 

        <div class="container" data-ng-hide="alertsCtrl.alerts.length == 0">
          <div class="companylist col-md-3">
            <h3>Company</h3>
            <div class="btn-group-vertical btn-group-xs">
              <button 
                  type="button"
                  class="btn btn-default" 
                  data-ng-repeat="alert in alertsCtrl.alerts"
                  data-ng-class="{active: alertsCtrl.activeAlert.tag == alert.tag}"
                  data-ng-click="alertsCtrl.setActiveAlert(alert)"
                  >
                <span class="companyname">{{alert.tag}}</span> 
                <span class="descriptioncount">({{alert.count}})</span>
              </button>
            </div>
          </div>
          <div class="descriptionlist col-md-9">
            <h3>Credit Transaction Records</h3>
            <p data-ng-show="alertsCtrl.activeAlert">
              The following 
              <strong>{{alertsCtrl.activeAlert.count}}</strong>
              records contain text that the Yow Time <em>ngrambayes</em> machine learning system
              has learned to associate with
              <strong>{{alertsCtrl.activeAlert.tag}}</strong>.
              However, the automatic company tagger did not match them to this company.
              If these records look like they really do represent transactions with
              <strong>{{alertsCtrl.activeAlert.tag}}</strong>,
              then an engineer should modify the tagger accordingly.
            </p>
            <br/>
            <h4 data-ng-show="alertsCtrl.activeAlert">
              <span class="companyname">{{alertsCtrl.activeAlert.tag}}</span> 
              <span class="descriptioncount">({{alertsCtrl.activeAlert.count}})</span>
            </h4>
            <div class="tablescroller">
              <table class="table table-striped">
                <tr data-ng-repeat="description in alertsCtrl.activeAlert.descriptions">
                  <td>{{description}}</td>
                </tr>
              </table>
            </div>
            <pre class="source_code"><code class="python"></code></pre>
            </pre>
          </div>
        </div>
      </div> <!-- Alerts -->



      <hr/>
      <div class="row">
        <div class="col-xs-12">
            <footer>
                <p>
                  &copy; Copyright 2017 Yow Time, LLC.
                  Please direct questions and comments to <a href="mailto:mvol@live.com">mvol@live.com</a>.
                </p>
            </footer>
        </div>
      </div> <!-- row -->

    </div> <!-- container -->
  </body>
    
</html>
