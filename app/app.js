'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.register',
  'myApp.login',
  'myApp.logout',
  'myApp.admin',
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
  .when('/logout',{
    templateUrl: 'logout/logout.html',
    controller: 'LogoutCtrl'
  })
  .when('/admin',{
    templateUrl: 'admin/admin.html',
    controller: 'AdminCtrl'
  })
  .when('/admin/create-player',{
    templateUrl: 'admin/new_player.html',
    controller: 'NewPlayerCtrl'
  })
  .otherwise({redirectTo: '/view1'});
}]).
controller('navBarCtrl', ['$scope', '$location', function($scope,  $location) {
    $scope.status = {
        active:"active"
    }
}]).
directive('navBar', function () {
    console.log("directive")
    return {
        restrict: "A",
        templateUrl: function(){
            if(localStorage.getItem("token")!== null){
                if(localStorage.getItem("is_superuser")){
                    return 'navbar-admin.html';
                }
                else{
                    console.log("USER")
                    return 'navbar-user.html';
                }
            }
            else{
                console.log("NONE")
                return 'navbar-none.html';
            }
            return 'navbar-none.html';
        }
    };
});