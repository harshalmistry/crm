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
  		<script type="text/javascript" src="{{asset('js/crm.js')}}"></script>
	</head>
	<body>
		<nav class="navbar navbar-expand-md bg-dark navbar-dark backgroundchange">
  			<a class="navbar-brand" href="#">Investment 1st</a>
  			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigationcontent">
    			<span class="navbar-toggler-icon"></span>
  			</button>
  			<div class="collapse navbar-collapse" id="navigationcontent">
    			<ul class="navbar-nav">
      				<li class="nav-item">
        				<a id="profiles" class="nav-link" href="#">Client Profiles</a>
      				</li>
      				<li class="nav-item">
        				<a class="nav-link" href="#">Client Queries</a>
      				</li>
      				<li class="nav-item">
        				<a class="nav-link" href="#">New Prospects</a>
      				</li>
      				<li class="nav-item">
        				<a class="nav-link" href="#">Client Transactions</a>
      				</li>  
      				<li class="nav-item">
        				<a class="nav-link" href="#">Client Reviews</a>
      				</li>    
      				<li class="nav-item">
        				<a class="nav-link" href="#">Client Meetings</a>
      				</li>  
    			</ul>
  			</div>  
		</nav>
    <div id="spinner" class="spinner" style="display: none;"></div>
		<div id="content" class="container-fluid">
      <div class="row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-10">
          <div id="top" class="row">
            <div class="col-sm-8">
              <div id="profilesgeterror" class="alert alert-danger" style="display: none; margin-top: 10px;">
                <button type="button" class="close" data-dismiss="alert">x</button>
                <strong>No profile data found</strong>
              </div>
              <div id="profiledeletemsgsuccess" class="alert alert-success" style="display: none; margin-top: 10px;">
                <button type="button" class="close" data-dismiss="alert">x</button>
                <strong>Profile deleted successfully</strong>
              </div>
              <div id="profiledeletemsgerror" class="alert alert-danger" style="display: none; margin-top: 10px;">
                <button type="button" class="close" data-dismiss="alert">x</button>
                <strong>Error while deleting profile</strong>
              </div>          
            </div>
            <div id="tool" class="col-sm-4 text-right">
              
            </div>
          </div>
          <div id="bottom" class="row content">
            <div id="bottomtable" class="table-responsive-sm">
            </div>
          </div>
        </div>
      </div>

      
		</div>
	</body>
</html>