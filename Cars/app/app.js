'use strict';

// Declare app level module which depends on views, and components
const app = angular.module('myApp', [
  'ngRoute',
    'myApp.home',
    'myApp.service',
    'myApp.cars',
    'myApp.carOnclick',
    'myApp.admin',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
