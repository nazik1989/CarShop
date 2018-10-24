'use strict';

angular.module('myApp.admin', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'AdminCtrl'
        });
    }])

    .controller('AdminCtrl', ['$scope','$http','service','$location',function($scope,$http, service,$location) {

        service.func("http://localhost:8081/api/car_list").then(function (res) {
            //  console.log('res in ctrl', res.data)
         $scope.cars = res.data;


        $scope.action='';
        $scope.hideUbdateButton = function(action){
        $scope.action=action;
            };

                 $scope.car = {};

                $scope.create = function(){
                    var uploadUrl = "http://127.0.0.1:8081/create_user";
                    service.post(uploadUrl, $scope.car);
                    //console.log($scope.car);

                    //-------------- Timeout function for update my page  ----------------------//
                    //   function timeoutFunction() {
                    //   setTimeout(function(){location.reload(); }, 200);}
                    //   timeoutFunction();
                    };



            // $scope.editUser =  function (id, action) {
            //     //console.log(id);
            //     $scope.action=action
            //
            //     $scope.update =  function () {   //console.log("Updatei meji id  "+id);
            //     var dataUpdate = {
            //              _id:id,
            //              condition:$scope.car.condition,
            //              body: $scope.car.body,
            //              year: $scope.car.year,
            //              make: $scope.car.make,
            //              model: $scope.car.model,
            //              tranmission: $scope.car.tranmission,};
            //         //console.log("dataUpdate is "+dataUpdate);
            //
            //          $http.put('http://127.0.0.1:8081/update_car', dataUpdate) .then(function(Response) {
            //              console.log("Response is " + Response);});
            // //-------------- Timeout function for update my page  ----------------------//
            //          function timeoutFunction() {
            //              setTimeout(function(){location.reload(); }, 2000);};
            //          timeoutFunction();
            //
            //     };
            // };




        $scope.deleteCar =  function (id) {
                var dataDelete = {_id:id};
               // console.log("dataUpdate is " + dataDelete);
                 alert("You want to delete this car");

                $http.post('http://127.0.0.1:8081/delete_car', dataDelete) .then(function(Response) {
                    console.log("Response is " + Response);});
                //-------------- Timeout function for update my page  ----------------------//
                // function timeoutFunction() {
                //     setTimeout(function(){location.reload(); }, 2000);};
                // timeoutFunction();

        };


    });

  }]);
