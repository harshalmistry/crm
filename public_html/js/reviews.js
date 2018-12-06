var app = angular.module("crm");
app.controller("ReviewsController", function($scope, $http, $routeParams){
	$scope.cid = $routeParams.cid;
	$scope.editR = false;
	$scope.selected = undefined;

	$scope.showReviewNotification = function(message){
 		$scope.portfolionotification = message;
 		var x = document.getElementById("snackbar");
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 	}

	$scope.getReviews = function(){
		$http({
			method : 'GET',
			url : url + 'reviews/' + $scope.cid
		})
		.then(
			function mySuccess(response){
				$scope.customerwithreviews = response.data[0];
				if(response.data[0].reviews.length <= 0){
					console.log("Portfolio - No portfolio review data available in database");
					$scope.showReviewNotification("No portfolio review data available in database");
				}
			},
			function myError(response){
				console.log("Reivews - get operation failed - " + response);
				$scope.showReviewNotification("Unable to process request. Check internet may be down");
			}
		);	
	}

	$scope.getReviews();

	$scope.editReview = function(r){
		$scope.selected = r.id;
		$scope.review = angular.copy(r);
		$scope.editR = true;
	}

	$scope.resetReviews = function(){
		$scope.review.suggestions = '';
		$scope.review.followup_date = '';
		$scope.editR = false;
		$scope.selected = undefined;
	}

	$scope.aeReview = function(){
		$scope.review.customer_id = $scope.cid;
		if(!$scope.editR){	$scope.review.id = undefined;}
		$http({
			method : 'POST',
			url : url + 'review',
			data : JSON.stringify($scope.review)
		})
		.then(
			function mySuccess(response){
				if(response.data.saved){
					if($scope.editR){
						let tempIndex = undefined;
						angular.forEach($scope.customerwithreviews.reviews, function(r, index){
							if(r.id == response.data.newreview.id){
								tempIndex = index;
							}
						});
						$scope.customerwithreviews.reviews.splice(tempIndex, 1, response.data.newreview);
						console.log("Reviews - Customer portfolio details edited successfully");
						$scope.showReviewNotification("Customer portfolio details edited successfully");
					}
					else{
						$scope.customerwithreviews.reviews.unshift(response.data.newreview);
						console.log("Reviews - Customer portfolio details added successfully");
						$scope.showReviewNotification("Customer portfolio details added successfully");
					}	
					$scope.resetReviews();				
				}
				else{
					console.log("Reviews - add/edit operation failed - " + response);
					$scope.showReviewNotification("Unable to process request. Check internet may be down");	
				}
			},
			function myError(response){
				console.log("Reviews - add/edit operation failed - " + response);
				$scope.showReviewNotification("Unable to process request. Check internet may be down");
			}
		);
	};

});
