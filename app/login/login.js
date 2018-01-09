'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$http', '$location',function($scope, $http, $location) {

    $scope.redirectToHome =  function (){
        $http.defaults.headers.common.Authorization = localStorage.getItem("token");
        $http.get('http://localhost:8081/users/users-details/').
        then(function successCallBack(response){
            localStorage.setItem("is_superuser",response.data[0]['is_superuser']);
            if(response.data[0]['is_superuser']){
                location.reload();  
                console.log(localStorage.getItem('is_superuser'))
                $location.path('/admin');
            }
            else{
                $location.path('/view2');
                location.reload();  
            }
        },
        function errorCallBack(response){
            console.log(response.data)
        });
    };
    if (localStorage.getItem("token") !== null){
        $scope.redirectToHome();
    }
    $scope.submit = function() {
        $scope.username_error = '';
        $scope.password_error = '';
        
        $http.post('http://localhost:8081/api-token-auth/',$scope.login_form)
        .then(function successCallBack(response) {
            $scope.username_error = '';
            $scope.password_error = '';
            localStorage.setItem("token","JWT "+response.data['token']);
            console.log($http.defaults.headers.common.Authorization);
            $scope.redirectToHome();
        },
        function errorCallBack(response){
            console.log(response.data)
            $scope.username_error = 'username field is required';
            $scope.password_error = 'password field is required';
        });
    }
}]);