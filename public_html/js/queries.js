var app = angular.module("crm");

app.filter('myDate', function($filter) {    
    var angularDateFilter = $filter('date');
    return function(theDate) {
       return angularDateFilter(theDate, 'dd MMMM @ HH:mm:ss');
    }
});

app.controller("QueriesController", function($scope, $http, $routeParams){
	$scope.cid = $routeParams.cid;
	$scope.qtList = ["Open", "Closed"];
	$scope.editQ = undefined;

	$scope.showQueryNotification = function(message){
 		$scope.queriesnotification = message;
 		var x = document.getElementById("snackbar");
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 	}

	$scope.getQueries = function(cid){
		$http({
			method: "GET",
			url : url + "queries/" + cid
		}).then(
		function mySuccess(response){
			$scope.customerwithqueries = response.data[0];
			if($scope.customerwithqueries.queries.length > 0){
				$scope.prepareQueryGraph();
			}
			else{
				console.log("Query - No customer's query available in database");
				$scope.showQueryNotification("No customers query data available in database");
			}			
		},
		function myError(response){
			console.log("Query - get operation failed - " + response);
			$scope.showQueryNotification("Unable to process request. Check internet may be down");
		});
	}

	$scope.addQuery = function(){
		$scope.query.customer_id = $scope.customerwithqueries.id;
		if(!$scope.editQ){	$scope.query.id = undefined;}
		$http({
			method : 'POST',
			url : url + 'query',
			data : JSON.stringify($scope.query)
		})
		.then(
			function mySuccess(response){
				if($scope.editQ){
					let tempIndex = undefined;
					angular.forEach($scope.customerwithqueries.queries, function(q, index){
						if(q.id == response.data.newquery.id){
							tempIndex = index;
						}
					});
					$scope.customerwithqueries.queries.splice(tempIndex, 1, response.data.newquery);
					console.log("Query - Customer query details edited successfully");
					$scope.showQueryNotification("Customer query details edited successfully");
				}
				else{
					$scope.customerwithqueries.queries.push(response.data.newquery);	
					console.log("Query - Customer query details added successfully");
					$scope.showQueryNotification("Customer query details added successfully");
				}			
				$scope.prepareQueryGraph();
				$scope.resetQuery();
				window.scrollTo(0,0);
			},
			function myError(response){
				console.log("Query - add/edit operation failed - " + response);
				$scope.showQueryNotification("Unable to process request. Check internet may be down");
			}
		);
	}

	$scope.resetQuery = function(){
		$scope.editQ = false;
		$scope.selected = undefined;
		$scope.editIndexQ = undefined;
		$scope.query.q_type = "Open";
		$scope.query.q_details = undefined;
		$scope.query.q_gap_reason = undefined;
	}

	$scope.editQuery = function(q){
		$scope.selected = q.id;
		$scope.editQ = true;
		$scope.query = angular.copy(q);
	}

	$scope.prepareQueryGraph = function(){
		var opened = 0;
 		var closed = 0;

 		for(var i = $scope.customerwithqueries.queries.length - 1; i >= 0; i--) {
 			if($scope.customerwithqueries.queries[i].q_type === 'Open'){	opened += 1;	}
 			else{	closed += 1;	}
 		}
 		
        var chart = {	type: 'column'	};
        var title = {	text : ""	};
        var xAxis = {	categories: ['Open','Closed'], crosshair: true	};
        var tooltip = {
           headerFormat: '<span>{point.key}</span><table>',
           pointFormat: '<tr><td style = "padding:0">{series.name}: </td>' +
              '<td style = "padding:0"><b>{point.y}</b></td></tr>',
           footerFormat: '</table>',
           shared: true,
           useHTML: true
        };
        var series= [{	showInLegend : false,	name: 'Query',	data: [opened, closed]	}];      
        var json = {};   
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.series = series;
        $('#queryGraph').highcharts(json);
	}
	$scope.getQueries($scope.cid);
});