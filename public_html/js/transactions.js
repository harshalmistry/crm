var app = angular.module("crm");
app.controller("TransactionsController", function($scope, $http, $routeParams){
	$scope.cid = $routeParams.cid;
	$scope.itList = ["LumSum", "SIP", "SWP", "STP"];
	$scope.editT = false;
	$scope.selected = undefined;
	$scope.totalInvestment = 0;

	$scope.showTransactionNotification = function(message){
 		$scope.transactionnotification = message;
 		var x = document.getElementById("snackbar");
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 	}

	$scope.getTransactions = function(){
		$http({
			method : 'GET',
			url : url + 'transactions/' + $scope.cid
		})
		.then(
			function mySuccess(response){
				$scope.customerwithtransactions = response.data[0];
				if(response.data[0].transactions.length <= 0){
					console.log("Transactions - No transactions data available in database");
					$scope.showTransactionNotification("No transactions data available in database");
				}
				else{
					$scope.calculateTotal();
				}
			},
			function myError(response){
				console.log("Transactions - get operation failed - " + response);
				$scope.showTransactionNotification("Unable to process request. Check internet may be down");
			}
		);	
	}

	$scope.calculateTotal = function(){
		let total = 0;
		angular.forEach($scope.customerwithtransactions.transactions, function(t, index){
			total += parseFloat(t.t_amount);
		});
		$scope.totalInvestment = total;
	}

	$scope.getTransactions();

	$scope.editTransaction = function(t){
		$scope.selected = t.id;
		$scope.transaction = angular.copy(t);
		$scope.transaction.t_amount = parseFloat(t.t_amount);
		$scope.editT = true;
	}

	$scope.resetTransaction = function(){
		$scope.transaction.t_date = undefined;
		$scope.transaction.scheme_name = undefined;
		$scope.transaction.investment_type = undefined;
		$scope.transaction.t_amount = undefined;
		$scope.transaction.kyc_status = 'No';
		$scope.transaction.next_t_date = undefined;
		$scope.transaction.courier_done = 'No';
		$scope.editT = false;
		$scope.selected = undefined;
	}

	$scope.aeTransaction = function(){
		$scope.transaction.customer_id = $scope.cid;
		if(!$scope.editT){	$scope.transaction.id = undefined;}
		$http({
			method : 'POST',
			url : url + 'transaction',
			data : JSON.stringify($scope.transaction)
		})
		.then(
			function mySuccess(response){
				if(response.data.saved){
					if($scope.editT){
						let tempIndex = undefined;
						angular.forEach($scope.customerwithtransactions.transactions, function(f, index){
							if(f.id == response.data.newtransaction.id){
								tempIndex = index;
							}
						});
						$scope.customerwithtransactions.transactions.splice(tempIndex, 1, response.data.newtransaction);
						console.log("Transactions - Customer transaction details edited successfully");
						$scope.showTransactionNotification("Customer transaction details edited successfully");
					}
					else{
						$scope.customerwithtransactions.transactions.unshift(response.data.newtransaction);
						console.log("Transactions - Customer transaction details added successfully");
						$scope.showTransactionNotification("Customer transaction details added successfully");
					}	
					$scope.calculateTotal();
					$scope.resetTransaction();
				}
				else{
					console.log("Transactions - add/edit operation failed - " + response);
					$scope.showTransactionNotification("Unable to process request. Check internet may be down");	
				}
			},
			function myError(response){
				console.log("Transactions - add/edit operation failed - " + response);
				$scope.showTransactionNotification("Unable to process request. Check internet may be down");
			}
		);
	}
});