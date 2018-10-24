'use strict';

angular.module('myApp.cars', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cars', {
    templateUrl: 'cars/cars.html',
    controller: 'CarsCtrl'
  })

}])

    .controller('CarsCtrl', ['$scope','$http','service',function($scope,$http, service) {
       // $scope.selectedCar=''
        service.func("http://localhost:8081/api/car_list")
            .then(res=>{
              //  console.log('res in ctrl', res.data)
             $scope.todos = res.data;

                // $scope.FiltredArray = [];
                // $scope.FiltredArray.push($scope.todos[0]);
                // $scope.FiltredArray.push($scope.todos[1]);
                // $scope.FiltredArray.push($scope.todos[2]);
                // $scope.FiltredArray.push($scope.todos[3]);
                // $scope.FiltredArray.push($scope.todos[4]);
                //
                // $scope.PaginationFunction = function(event){
                //     $scope.turId = event.target.id;
                //     $scope.keyTodos= ($scope.turId-1)*5;
                //     $scope.FiltredArray.splice(0,5);
                //     $scope.FiltredArray.push($scope.todos[$scope.keyTodos]);
                //     $scope.FiltredArray.push($scope.todos[$scope.keyTodos+1]);
                //     $scope.FiltredArray.push($scope.todos[$scope.keyTodos+2]);
                //     $scope.FiltredArray.push($scope.todos[$scope.keyTodos+3]);
                //     $scope.FiltredArray.push($scope.todos[$scope.keyTodos+4]);};



/*---------------------------------For Pagination--------------------------------------------*/
            $scope.carOnPage = 5; // էջիս երևացող մեքենաների քանակը
            $scope.startFrom = 0; //  ցույց տալ սկսած startFrom-րդ անդամից
            $scope.CountPageDivs = [];
            for(var i=1; i <= Math.ceil($scope.todos.length/5); i++) {
                $scope.CountPageDivs.push(i);
            }
            $scope.PaginationFunction = function(event){
                $scope.turId = event.target.id;
                //console.log(event)
               $scope.startFrom= ($scope.turId-1)*$scope.carOnPage;
                };

        });
}]);