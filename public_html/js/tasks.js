var app = angular.module("crm");
app.controller("TasksController", function($scope, $http){
	$scope.taskDeadline = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	$scope.taskStatus = ["Open", "In Progress", "Completed"];
	$scope.editT = false;

	$scope.showTasksNotification = function(message){
 		$scope.tasksnotification = message;
 		var x = document.getElementById("snackbar");
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 	}

 	$scope.resetTask = function(){
 		$scope.task.t_brief = undefined;
 		$scope.task.t_status = 'Open';
 		$scope.task.t_details = undefined;
 		$scope.task.t_deadline = 1;
 		$scope.task.t_brief = undefined;
 		$scope.editT = false;
 		$scope.selected = undefined;
 	}

 	$scope.editTask = function(t){
 		$scope.selected = t.id;
		$scope.task = angular.copy(t);
		$scope.editT = true;
 	}

 	$scope.getTasks = function(){
 		$http({
			method : 'GET',
			url : url + 'tasks'
		})
		.then(
			function mySuccess(response){
				$scope.tasks = response.data;
				$scope.prepareTaskGraph();
				if($scope.tasks.length <= 0){
					console.log("Tasks - No tasks data available in database");
					$scope.showTasksNotification("No tasks data available in database");
				}
			},
			function myError(response){
				console.log("Tasks - get operation failed ");
				console.log(response);
				$scope.showTasksNotification("Unable to process request. Check internet may be down");
			}
		);
 	}

 	$scope.prepareTaskGraph = function(){
 		let open = 0;
 		let progress = 0;
 		let completed = 0;
 		for(var i = $scope.tasks.length - 1; i >= 0; i--) {
            if($scope.tasks[i].t_status == 'Open'){
                open += 1;
            }
            else if($scope.tasks[i].t_status == 'In Progress'){
                progress += 1;
            }
            else if($scope.tasks[i].t_status == 'Completed'){
                completed += 1;
            }
        }
	    Highcharts.setOptions({ colors: ['#6b90b7', '#081019'] });
	    Highcharts.chart('tasksgraph', {
	        chart: {    type: 'column'  },
	        title:{ text : ''},
	        xAxis: {
	            type: 'category',
	            labels: {   rotation: -45,  style: {    fontSize: '13px',   fontFamily: 'Verdana, sans-serif'   }}
	        },
	        yAxis: {    min: 0,title: {    text: 'Tasks count'  }},
	        legend: {   enabled: false  },
	        credits : {   enabled: false  },
	        tooltip: {  pointFormat: '{point.y}'    },
	        series: [{
	            name: 'Task',
	            data: [
	                ['Open', open],
	                ['In Progress', progress],
	                ['Completed', completed],
	            ],
	            dataLabels: {enabled: true, rotation: -90, color: '#FFFFFF', align: 'right', format: '{point.y}', y: 10, style: { fontSize: '13px', fontFamily: 'Verdana, sans-serif' }}
	        }]
	    });
	}

 	$scope.getTasks();

 	$scope.aeTask = function(){
 		if(!$scope.editT){
 			$scope.id = undefined;
 			$scope.task.t_start_date = todayDateToString();
 		}
 		$http({
 			method : 'POST',
 			url : url + 'task',
 			data : JSON.stringify($scope.task)
 		})
 		.then(
 			function mySuccess(response){
 				let data = response.data;
 				if(data.saved){
 					if($scope.editT){
 						let tempIndex = undefined;
						angular.forEach($scope.tasks, function(f, index){
							if(f.id == response.data.newtask.id){
								tempIndex = index;
							}
						});
						$scope.tasks.splice(tempIndex, 1, response.data.newtask);
						console.log("Tasks - task edited successfully");
						$scope.showTasksNotification("Task edited successfully");
 					}
 					else{
 						$scope.tasks.unshift(response.data.newtask);
 						console.log("Tasks - Task added successfully");
 						$scope.showTasksNotification("Task added successfully");
 					}
 					$scope.prepareTaskGraph();
 					$scope.resetTask();
 				}
 				else{
 					console.log("Tasks - add/edit operation failed - not saved");
 					console.log(data);
 					$scope.showTasksNotification("Unabel to process request. Check internet may be down");
 				}
 			},
 			function myError(response){
 				console.log("Tasks - add/edit operation failed - " + response);
				$scope.showTasksNotification("Unable to process request. Check internet may be down");
 			}
 		);
 	}
});