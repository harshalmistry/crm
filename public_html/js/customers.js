var app = angular.module("crm");
app.controller("CustomersController", function($scope, $http, $location){
	$scope.customers = [];
	$scope.editC = false;
	$scope.selected = undefined;
 	$scope.typeList = [{ id: 'I', name: 'Investor' }, { id: 'P', name: 'Prospect' }];

 	$scope.showCustomerNotification = function(message){
 		$scope.customernotification = message;
 		var x = document.getElementById("snackbar");
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 	}

 	$scope.prepareCustomerGraph = function(){
 		Highcharts.setOptions({ colors: ['#6b90b7', '##081019'] });
        var investors = 0; var prospects = 0;
        var total = $scope.customers.length;

        for(var i = $scope.customers.length - 1; i >= 0; i--) {
            if($scope.customers[i].type === 'I'){
                investors += 1;
            }
        }
        prospects = total - investors;
        investors = (investors/total)*100;
        prospects = (prospects/total)*100;
        $scope.totalCustomers = total;
        var chart = {};
        var title = {   text: '' };
        var tooltip = { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' };
        var plotOptions = {
           pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> - {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor)||
                        'black'
                    }
                }
            }
        };
        var series = [{
           type: 'pie',
           name: 'Customer',
           data: [['Investors', investors], ['Prospects', prospects]]
        }];
        var credits = { enabled: false  };
        var json = {};   
        json.chart = chart; 
        json.title = title;     
        json.tooltip = tooltip;  
        json.series = series;
        json.credits = credits;
        json.plotOptions = plotOptions;
        $('#customergraph').highcharts(json);
 	}

	$scope.resetCustomer = function(){
		$scope.customer.name = undefined;
		$scope.customer.type='P';
		$scope.customer.city = undefined;
		$scope.customer.contact = undefined;
		$scope.customer.email = undefined;
		$scope.editC = false;
		$scope.selected = undefined;
	}

	$scope.editCustomer = function(c){
		$scope.selected = c.id;
		$scope.editC = true;
		$scope.customer = angular.copy(c);	
	}

	$scope.getCustomers = function(){
		$http({
			method : 'GET',
			url : url + 'customers'
		}).then(function mySuccess(response){
			if(response.data.length > 0){
				$scope.customers = response.data;
				$scope.prepareCustomerGraph();
			}
			else{
				console.log("Customers - No customer's data available in database");
				$scope.showCustomerNotification("No customers data available in database");
			}
		},
		function myError(response){
			console.log("Customers - get operation failed - " + response);
			$scope.showCustomerNotification("Unable to process request. Check internet may be down");
		});
	}

	$scope.addCustomer = function(){
		if(!$scope.editC){	$scope.customer.id = undefined;	}
		$http({
			method : 'POST',
			url : url + 'customer',
			data : JSON.stringify($scope.customer)
		}).then(function mySuccess(response){
			if($scope.editC){
				let tempIndex = undefined;
				angular.forEach($scope.customers, function(c, index){
					if(c.id == response.data.newcustomer.id){
						tempIndex = index;
					}
				});
				$scope.customers.splice(tempIndex, 1, response.data.newcustomer);
				console.log("Customers - Customer's details edited successfully");
				$scope.showCustomerNotification("Customer's details edited successfully");
			}
			else{
				$scope.customers.push(response.data.newcustomer);	
				console.log("Customers - Customer's details added successfully");
				$scope.showCustomerNotification("Customer's details added successfully");
			}			
			$scope.prepareCustomerGraph();
			$scope.resetCustomer();
			window.scrollTo(0,0);
		},
		function myError(response){
			console.log("Customers - add/edit operation failed - " + response);
			$scope.showCustomerNotification("Unable to process request. Check internet may be down");
		});
	}

	$scope.deleteCustomer = function(id, name){
		$scope.resetCustomer();
		$http({
			method : 'GET',
			url : url + 'customer/' + id
		})
		.then(function mySuccess(response){
			if(response.data == 1){
				var whatIndex = null;
				angular.forEach($scope.customers, function(cb, index) {
					if (cb.id === id) {
						whatIndex = index;
						return whatIndex;
					}
				});
				$scope.customers.splice(whatIndex, 1);
				$scope.prepareCustomerGraph();
				window.scrollTo(0,0);				
				console.log("Customers - Customer's details deleted successfully");
				$scope.showCustomerNotification("Customer's details deleted successfully");
			}
		},
		function myError(response){
			console.log("Customers - Delete operation failed - " + response);
			$scope.showCustomerNotification("Unable to process request. Check internet may be down");
		});
	}

	$scope.goTo = function(path, id){
		$location.path(path + "/" + id);
	}

	$scope.getCustomers();
});