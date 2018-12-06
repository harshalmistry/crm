var app = angular.module("crm", ["ngRoute", "ui.bootstrap"]);
var url = "https://investmentcrm.000webhostapp.com/crm/"
//var url = "http://localhost:8000/crm/"

function todayDateToString(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {dd='0'+dd;} 
    if(mm<10) 
    {mm='0'+mm;} 
    return today = dd+'/'+mm+'/'+yyyy;
}

function stringToDate(_date,_format,_delimiter){
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
}

//stringToDate("17/9/2014","dd/MM/yyyy","/");

app
    .config(function($routeProvider) {
        $routeProvider
        .when("/meetings",{
            templateUrl : "templates/meetings.html",
            controller : "MeetingsController"
        })
        .when("/customers",{
            templateUrl : "templates/customers.html",
            controller : "CustomersController"
        })
        .when("/", {
            templateUrl : "templates/index.html",
            controller : "IndexController"
        })
        .when("/queries/:cid", {
            templateUrl : "templates/queries.html",
            controller : "QueriesController"
        })
        .when("/portfolio/:cid", {
            templateUrl : "templates/reviews.html",
            controller : "ReviewsController"
        })
        .when("/followup/:cid", {
            templateUrl : "templates/followups.html",
            controller : "FollowupsController"
        })
        .when("/transactions/:cid", {
            templateUrl : "templates/transactions.html",
            controller : "TransactionsController"
        })
        .when("/tasks", {
            templateUrl : "templates/tasks.html",
            controller : "TasksController"
        });
    })
    .controller("IndexController", function($scope, $http){
        $scope.totalI = 0;
        $scope.lumsum = 0;
        $scope.sip = 0;
        $scope.swp = 0;
        $scope.stp = 0;

        $scope.index = function(){
            $scope.meetings();
            $scope.customers();
            $scope.totalInvestment();
        }

        /* Total Investment start */
        $scope.totalInvestment = function(){
            $http({
                method : 'GET',
                url : url + 'total'
            })
            .then(
                function mySuccess(response){
                    $scope.lumsum = response.data.lumsum;
                    $scope.sip = response.data.sip;
                    $scope.swp = response.data.swp;
                    $scope.stp = response.data.stp;
                    $scope.totalI = response.data.total;
                    $scope.prepareInvestmentGraph();
                },
                function myError(response){
                    console.log("Dashboard - get total investment failed");
                    console.log(response);
                }
            );
        }

        $scope.prepareInvestmentGraph = function(){
            Highcharts.setOptions({ colors: ['#6b90b7', '##081019'] });
            Highcharts.chart('investmentgraph', {
                chart: {    type: 'column'  },
                title:{ text : ''},
                xAxis: {
                    type: 'category',
                    labels: {   rotation: -45,  style: {    fontSize: '13px',   fontFamily: 'Verdana, sans-serif'   }}
                },
                yAxis: {    min: 0,title: {    text: 'Investment ( ₹ )'  }},
                legend: {   enabled: false  },
                credits : {   enabled: false  },
                tooltip: {  pointFormat: '₹ {point.y:.1f}</b>'    },
                series: [{
                    name: 'Investment',
                    data: [
                        ['LumSum', parseFloat($scope.lumsum)],
                        ['SIP', parseFloat($scope.sip)],
                        ['SWP', parseFloat($scope.swp)],
                        ['STP', parseFloat($scope.stp)],
                    ],
                    dataLabels: {enabled: true, rotation: -90, color: '#FFFFFF', align: 'right', format: '₹ {point.y:.1f}', y: 10, style: { fontSize: '13px', fontFamily: 'Verdana, sans-serif' }}
                }]
            });
        }

        /* Total Investment end */

        /* Customers start */
        $scope.customers = function(){
            $http({
                method : 'GET',
                url : url + 'customers'
            }).then(function mySuccess(response){
                if(response.data.length > 0){
                    $scope.customers = response.data;
                    $scope.prepareCustomerGraph();
                }
                else{
                    console.log("Dashboard - No customer's data available in database");
                }
            },
            function myError(response){
                console.log("Dashboard - getCustomers failed");
            });
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
               data: [['Investor', investors], ['Prospect', prospects]]
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

        /* Customers end */


        /* Meetings start */
        $scope.meetings = function(){
            $http({
                method : 'GET',
                url : url + 'meetings'
            })
            .then(function mySuccess(response){
                $scope.meetings = response.data;
                $scope.prepareMeetingsGraph();
            }, 
            function myError(response){
                console.log("Unable to fetch meetings data " + response);
            });
        }

        $scope.prepareMeetingsGraph = function(){
            Highcharts.setOptions({
                colors: ['#6b90b7']
            });
            var chart = {   type: 'bar' };
            var title = {   text: ''    };
            var xAxis = {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                title: {    text: null  }
            };
            var yAxis = {   
                min: 0,
                title: {    text: 'Meetings'    },
                labels: {   overflow: 'justify' }
            };
            var plotOptions = {
                bar: {  dataLabels: {   enabled: true   }   }
            };
            var credits = { enabled: false  };
            var mnos = [];
            var totalMeetings = 0;
            for (var i = 0; i < $scope.meetings.length; i++) {
                totalMeetings += parseInt($scope.meetings[i].nos);
                mnos.push(parseInt($scope.meetings[i].nos));
            }
            var series = [{ name: 'Total meetings - ' + totalMeetings, data: mnos}];
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
        /* Meetings end */

        $scope.index();
    })