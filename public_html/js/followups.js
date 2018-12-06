var app = angular.module("crm");
app.controller("FollowupsController",function($scope, $http, $routeParams){
	$scope.cid = $routeParams.cid;
	$scope.editF = false;
 	$scope.selected = undefined;
	$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois'];
	$scope.referenceList = [
		"Ramesh",
		"Suresh",
		"Mahesh",
		"Ajay",
		"Ankita",
		"Zaki",
		"Harry",
		"Vaibhav",
		"Harsh",
		"Harshal",
		"Tanushree",
		"Kirti",
		"Javaharlal"
	];

	$scope.showFollowupNotification = function(message){
 		$scope.followupnotification = message;
 		var x = document.getElementById("snackbar");
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 	}

	$scope.getFollowups = function(){
		$http({
			method : 'GET',
			url : url + 'followups/' + $scope.cid
		})
		.then(
			function mySuccess(response){
				$scope.customerwithfollowups = response.data[0];
				if(response.data[0].followups.length <= 0){
					console.log("Followups - No followups data available in database");
					$scope.showFollowupNotification("No followups data available in database");
				}
			},
			function myError(response){
				console.log("Followups - get operation failed - " + response);
				$scope.showFollowupNotification("Unable to process request. Check internet may be down");
			}
		);	
	}

	$scope.resetFollowup = function(){
		$scope.followup.m_details = '';
		$scope.followup.m_next_date = '';
		$scope.editF = false;
		$scope.selected = undefined;
	}

	$scope.getFollowups();

	$scope.editFollowup = function(f){
		$scope.selected = f.id;
		$scope.followup = angular.copy(f);
		$scope.editF = true;
	}

	$scope.aeFollowup = function(){
		$scope.followup.customer_id = $scope.cid;
		if(!$scope.editF){	$scope.followup.id = undefined;}
		$http({
			method : 'POST',
			url : url + 'followup',
			data : JSON.stringify($scope.followup)
		})
		.then(
			function mySuccess(response){
				if(response.data.saved){
					if($scope.editF){
						let tempIndex = undefined;
						angular.forEach($scope.customerwithfollowups.followups, function(f, index){
							if(f.id == response.data.newfollowup.id){
								tempIndex = index;
							}
						});
						$scope.customerwithfollowups.followups.splice(tempIndex, 1, response.data.newfollowup);
						console.log("Followups - Customer's followup details edited successfully");
						$scope.showFollowupNotification("Customer's followup details edited successfully");
					}
					else{
						$scope.customerwithfollowups.followups.unshift(response.data.newfollowup);
						console.log("Followups - Customer followup details added successfully");
						$scope.showFollowupNotification("Customer followup details added successfully");
					}	
					$scope.resetFollowup();				
				}
				else{
					console.log("Followups - add/edit operation failed - " + response);
					$scope.showFollowupNotification("Unable to process request. Check internet may be down");	
				}
			},
			function myError(response){
				console.log("Followups - add/edit operation failed - " + response);
				$scope.showFollowupNotification("Unable to process request. Check internet may be down");
			}
		);
	}
});