'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$http', '$location',function($scope, $http, $location) {


    $scope.submit = function() {
        $scope.username_error = '';
        $scope.password_error = '';
        
        $http.post('http://localhost:8081/api-token-auth/',$scope.login_form)
        .then(function successCallBack(response) {
            $scope.username_error = '';
            $scope.password_error = '';
            $http.defaults.headers.common['Authorization'] = 'JWT'+ ' ' + response.data['token'];
            console.log($http.defaults.headers.common.Authorization);
            $location.path('/');
        },
        function errorCallBack(response){
            console.log(response.data)
            $scope.username_error = 'username field is required';
            $scope.password_error = 'password field is required';
        });
    }
}]);