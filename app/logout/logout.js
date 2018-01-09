'use strict';

angular.module('myApp.logout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/logout', {
    templateUrl: 'logout/logout.html',
    controller: 'LogoutCtrl'
  });
}])
.controller('LogoutCtrl', ['$scope', '$location', function($scope,  $location) {
    console.log('LogoutCtrl')
    if(localStorage.getItem("token") !== null) {
        console.log("got it")
        location.reload();
        localStorage.removeItem("is_superuser");
        localStorage.removeItem("token");
        $location.path('/login');
    }
    else{
        location.reload();
        console.log("NOPE")
    }
}]);