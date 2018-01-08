'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.register',
  'myApp.login',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when("/",{
    templateUrl: "register/register.html",
    controller: "RegisterCtrl"
  })
  .when('/register/reg',{
    templateUrl: 'register/reg.html',
    controller: 'RegCtrl'
  })
  .when('/login',{
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  })
  .otherwise({redirectTo: '/view1'});
}]);
