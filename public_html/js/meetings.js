var app = angular.module("crm");

app.controller("MeetingsController", function($scope, $http){
	$scope.meeting = { mn : undefined, nos : 0};
	$scope.monthList = [ "January",	"February",	"March", "April", "May", "June", "July", "August", "September", "October", "November",	"December" ];
 	$scope.meetings = [
 		{ "mn":"January", "nos":0 },
 		{ "mn":"February", "nos":0 },
 		{ "mn":"March", "nos":0	},
 		{ "mn":"April",	"nos":0	},
 		{ "mn":"May", "nos":0 },
 		{ "mn":"June", "nos":0 },
 		{ "mn":"July", "nos":0 },
 		{ "mn":"August", "nos":0 },
 		{ "mn":"September", "nos":0 },
 		{ "mn":"October", "nos":0 },
 		{ "mn":"November", "nos":0 },
 		{ "mn":"December", "nos":0 }
 	];

	$scope.prepareMeetingsGraph = function(){
		Highcharts.setOptions({
     		colors: ['#6b90b7']
    	});
		var chart = {	type: 'bar'	};
        var title = {	text: ''	};
		var xAxis = {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            title: { 	text: null	}
        };
        var yAxis = {	
        	min: 0,
           	title: {	text: 'Meetings'	},
           	labels: {  	overflow: 'justify'	}
        };
        var plotOptions = {
           	bar: {	dataLabels: {	enabled: true	}	}
        };
        var credits = {	enabled: false	};
		var mnos = [];
		var total = 0;
        for (var i = 0; i < $scope.meetings.length; i++) {
        	total += parseInt($scope.meetings[i].nos);
        	mnos.push(parseInt($scope.meetings[i].nos));
        }
		var series = [{	name: 'Total meetings',	data: mnos}];
        var json = {};   
        json.chart = chart; 
        json.title = title;   
        json.xAxis = xAxis;
        json.yAxis = yAxis;  
        json.series = series;
        json.plotOptions = plotOptions;
        json.credits = credits;
        $('#meetingsgraph').highcharts(json);
	}

	$scope.showMeetingsNotification = function(message){
 		$scope.meetingnotification = message;
 		var x = document.getElementById("snackbar");
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 	}

	$scope.getMeetings = function(){
		$http({
			method : 'GET',
			url : url + 'meetings'
		})
		.then(function mySuccess(response){
			if(response.data.length > 0){
				$scope.meetings = response.data;
				$scope.prepareMeetingsGraph();
			}
			else{
				console.log("Meetings - No meetings data available in database");
				$scope.showCustomerNotification("No meetings data available in database");
			}

		}, 
		function myError(response){
			console.log("Meetings - get operation failed - " + response);
			$scope.showMeetingsNotification("Unable to process request. Check internet may be down");
		});
	}

	$scope.resetMeetings = function(mn){
		$http({
			method : 'POST',
			url : url + 'meeting',
			data : {
				'mn' : mn,
				'nos' : 0
			}
		})
		.then(function mySuccess(response){
			for (var i = $scope.meetings.length - 1; i >= 0; i--) {
				if($scope.meetings[i].mn == mn){
					$scope.meetings[i].nos = 0;
					$scope.meeting.nos = 0;
				}
			}
			$scope.prepareMeetingsGraph();
		},
		function myError(response){
			console.log("Meetings - reset operation failed - " + response);
			$scope.showMeetingsNotification("Unable to process request. Check internet may be down");
		});
	}

	$scope.monthClicked = function(mn){
		$scope.selected = mn;
		for (var i = $scope.meetings.length - 1; i >= 0; i--) {
			if($scope.meetings[i].mn == mn){
				$scope.meeting.nos = parseInt($scope.meetings[i].nos);
				$scope.meeting.month = mn;
				break;
			}
		}
	}

	$scope.monthChanged = function(){
		if($scope.meeting.month == undefined){
			$scope.monthnotselected = true;
			return;
		}
		$scope.monthnotselected = false;
		let temp = 0;
		for (var i = $scope.meetings.length - 1; i >= 0; i--) {
			if($scope.meetings[i].mn == $scope.meeting.month){
				temp = $scope.meetings[i].nos;
				break;
			}
		}
		$scope.selected = $scope.meeting.month;
		$scope.meeting.nos = parseInt(temp);
	}

	$scope.addMeeting = function(){
		if($scope.meeting.month == undefined){
			$scope.monthnotselected = true;
			return;
		}
		$scope.monthnotselected = false;
		var backup = 0;
		for (var i = $scope.meetings.length - 1; i >= 0; i--) {
			var month = $scope.meetings[i].mn;
			if(month == $scope.meeting.month){
				backup = $scope.meetings[i].nos;
				break;
			}
		}
		
		$http({
			method : 'POST',
			url : url + 'meeting',
			data : {
				'mn' : $scope.meeting.month,
				'nos' : $scope.meeting.nos
			}
		})
		.then(function mySuccess(response){
			for (var i = $scope.meetings.length - 1; i >= 0; i--) {
				var month = $scope.meetings[i].mn;
				if(month == $scope.meeting.month){
					$scope.meetings[i].nos = $scope.meeting.nos;
				}
			}
			$scope.prepareMeetingsGraph();
		},
		function myError(response){
			for (var i = $scope.meetings.length - 1; i >= 0; i--) {
				var month = $scope.meetings[i].mn;
				if(month == $scope.meeting.month){
					$scope.meetings[i].nos = backup;
				}
			}
			console.log("Meetings - add/edit operation failed - " + response);
			$scope.showMeetingsNotification("Unable to process request. Check internet may be down");
		});
	}

	$scope.getMeetings();
});