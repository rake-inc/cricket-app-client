'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])
.controller('RegisterCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    if($http.defaults.headers.common.Authorization !== undefined) {
        $location.path('/view2');
    }
    $scope.submit = function () {
        $scope.form['is_staff'] = false;
        if($scope.form['is_superuser'] == 'Admin'){
            $scope.form['is_superuser'] = true;
            $scope.form['is_staff'] = true;
        }
        $http.post('http://localhost:8081/users/create-user/', $scope.form)
        .success(function(data, status, headers){
            console.log(data, status, headers)
            $location.path('/login');
        })
        .error(function(data, status, headers){
            console.log(data, status, headers)  
        });
    }
}])
.controller('RegCtrl', [function() {
    console.log("RegCtrl")
}]);