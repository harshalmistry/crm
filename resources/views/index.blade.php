<!DOCTYPE html>
<html class="h-100">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Investment 1st</title>
        <link rel="icon" href="favicon.ico">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
        <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/crm.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.js"></script>
        <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.3.3.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-touch.js"></script>
        <script src = "https://code.highcharts.com/highcharts.js"></script>  
        <script type="text/javascript" src="js/main.js"></script>
        <script type="text/javascript" src="js/meetings.js"></script>
        <script type="text/javascript" src="js/customers.js"></script>
        <script type="text/javascript" src="js/queries.js"></script>
        <script type="text/javascript" src="js/reviews.js"></script>
        <script type="text/javascript" src="js/followups.js"></script>
        <script type="text/javascript" src="js/transactions.js"></script>
        <script type="text/javascript" src="js/tasks.js"></script>
    </head>
    <body ng-app="crm" class="container-fluid" style="margin-top: 20px; /*background-image: url('images/background.jpg');*/">
        <div class="row">
            <div class="col-12">
                <div class="card backgroundchange">
                    <div class="card-body">
                        <a href="/"  class="btn btncolor sidepadding"><i class="fa fa-home"></i> Home</a>
                        <a href="#!/tasks"  class="btn btncolor sidepadding"><i class="fa fa-tasks"></i> Tasks</a>
                        <a href="#!/customers"  class="btn btncolor sidepadding"><i class="fa fa-user"></i> Customers</a>
                        <a href="#!/meetings"  class="btn btncolor sidepadding"><i class="fa fa-calendar"></i> Meetings</a>
                    </div>
                </div>
            </div>
        </div>
        <div ng-view></div>      
    </body>
</html>