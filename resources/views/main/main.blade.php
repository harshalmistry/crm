<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Investment 1st</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">

        <link rel="stylesheet" href="{{asset('css/crm.css')}}">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.js"></script>
        <script type="text/javascript" src="{{asset('js/main.js')}}"></script>
        <script type="text/javascript" src="{{asset('js/queries.js')}}"></script>
        <script type="text/javascript" src="{{asset('js/profiles.js')}}"></script>
    </head>
    <body ng-app="myApp" class="container-fluid">
        <div class="row">
            <div class="col-12">
                <nav class="navbar navbar-expand-md bg-dark navbar-dark backgroundchange">
                    <a class="navbar-brand" href="#/!">Investment 1st</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigationcontent">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navigationcontent">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a id="profiles" class="nav-link" href="#!profiles">Client Profiles</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#!prospects">New Prospects</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#!transactions">Client Transactions</a>
                            </li>  
                            <li class="nav-item">
                                <a class="nav-link" href="#!reviews">Client Reviews</a>
                            </li>    
                            <li class="nav-item">
                                <a class="nav-link" href="#!meetings">Client Meetings</a>
                            </li>  
                        </ul>
                    </div>  
                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
            <div id="spinner" class="spinner" style="display: none;"></div>
            <div ng-view></div>
        </div>
            
    </body>
</html>