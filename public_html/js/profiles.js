var app = angular.module("myApp");
app.controller("ProfilesController", function($scope, $http){
	$scope.flag = true;
	$scope.showModal = false;
	$scope.master = { name:"", imp_date:"", email:"", type:"", city: "", contact:"" };
	$scope.editoradd = false;

    $scope.addNewProfile = function(){
    	$scope.user = angular.copy($scope.master);
        $scope.showModal = !$scope.showModal;
        $scope.editoradd = false;
    };

    $scope.resetProfile = function(){
    	$scope.user = angular.copy($scope.master);
    }

    $scope.editCrmProfile = function(i, name){
    	$scope.showModal = true;	

    	var whatIndex = null;
		angular.forEach($scope.profiles, function(cb, index) {
		  if (cb.id === i) {
		     whatIndex = index;
		  }
		});
		var profile = $scope.profiles[whatIndex];
		$scope.user = angular.copy($scope.master);
		$scope.user.id = profile.id;
    	$scope.user.name = profile.name;
    	$scope.user.imp_date = profile.imp_date;
    	$scope.user.email = profile.email;
    	$scope.user.type = profile.type;
    	$scope.user.city = profile.city;
    	$scope.user.contact = profile.contact;
    	$scope.user.created_at = profile.created_at;
    	$scope.user.updated_at = profile.updated_at;
    	$scope.editoradd = true;
    }


	document.getElementById("spinner").style.display = "block";
	$http({
        method : "GET",
        url : url + "profiles"
    }).then(function mySuccess(response) {
    	if(response.data.length > 0){
    		$scope.flag = true;
        	$scope.profiles = response.data;
        	console.log($scope.profiles);
    	}
    	else{
    		$scope.flag = false;
    	}
        document.getElementById("spinner").style.display = "none";
    }, function myError(response) {
        $scope.flag = false;
        document.getElementById("spinner").style.display = "none";
    });

    $scope.submitProfile = function(){
    	if($scope.validate()){
    		document.getElementById("spinner").style.display = "block";
			$http({
		        method : "POST",
		        url : url + "profiles",
		        data : JSON.stringify($scope.user)
		    }).then(function mySuccess(response) {
		    	if(response.data.saved){
		    		alert($scope.user.name + "'s profile saved successfully");
			    	if($scope.editoradd){
			    		var whatIndex = null;
						angular.forEach($scope.profiles, function(cb, index) {
						  if (cb.id === $scope.user.id) {
						     whatIndex = index;
						  }
						});
						$scope.profiles.splice(whatIndex, 1, response.data.newobject);
			    	}
			    	else{
			    		if(!$scope.flag){
			    			$scope.flag = true;
			    			$scope.profiles.push(response.data.newobject);
			    		}
			    		else{
			    			$scope.profiles.splice(0, 0, response.data.newobject);	
			    		}
			    	}
		    	}
		    	else{
		    		alert( "Unable to add " + $scope.user.name + "\'s profile");
		    	}
		    	$scope.showModal = false;
		        document.getElementById("spinner").style.display = "none";
		    }, function myError(response) {
		    	$scope.showModal = false;
		    	alert( "Unable to add " + $scope.user.name + "\'s profile");
		        document.getElementById("spinner").style.display = "none";
		    });    		
    	}
    	else{
    		console.log("if not executed");
    	}
    }

    $scope.validate = function(){
    	var profileName = $scope.user.name;
    	if(!profileName){
    		return false;
    	}
    }

    $scope.deleteCrmProfile = function(i, name) {
    	document.getElementById("spinner").style.display = "block";
    	$http({
	        method : "GET",
	        url : url + "profiles/" + i
	    }).then(function mySuccess(response) {
	        if(response.data == 1){
	        	var whatIndex = null;
				angular.forEach($scope.profiles, function(cb, index) {
				  if (cb.id === i) {
				     whatIndex = index;
				  }
				});
                $scope.profiles.splice(whatIndex, 1);
                window.scrollTo(0,0);
                alert( name + "\'s profiles deleted successfully");
                if($scope.profiles.length == 0){
                	$scope.flag = false;
                }
            }
            else{
            	alert( "Unable to delete " + name + "\'s profile");
            }
	        document.getElementById("spinner").style.display = "none";
	    }, function myError(response) {
	    	alert( "Unable to delete " + name + "\'s profile");
	        document.getElementById("spinner").style.display = "none";
	    });
    }
});


app.directive('modal', function () {
    return {
    	templateUrl : "templates/addprofile.html",
	    restrict: 'E',
	    transclude: true,
	    replace:true,
	    scope:true,
	    link: function postLink(scope, element, attrs) {

	          scope.$watch(attrs.visible, function(value){
	          if(value == true)
	            $(element).modal('show');
	          else
	            $(element).modal('hide');
	        });

	        $(element).on('shown.bs.modal', function(){
	          scope.$apply(function(){
	            scope.$parent[attrs.visible] = true;
	          });
	        });

	        $(element).on('hidden.bs.modal', function(){
	          scope.$apply(function(){
	            scope.$parent[attrs.visible] = false;
	          });
	        });
	    }
	};
});