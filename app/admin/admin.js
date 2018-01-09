'use strict';

angular.module('myApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'admin/admin.html',
    controller: 'AdminCtrl'
  }).
  when('/admin/create-player',{
    templateUrl: 'admin/new_player.html',
    controller: 'NewPlayerCtrl'
  }).
  when('/admin/create-team',{
    templateUrl: 'admin/team.html',
    controller: 'TeamController'
  }).
  when('/admin/view-players',{
    templateUrl: 'admin/players.html',
    controller: 'PlayersCtrl'
  });
}]).
controller('AdminCtrl', ['$scope', '$location', '$http', function($scope,  $location, $http) {
    $http.defaults.headers.common.Authorization = localStorage.getItem('token');
    $scope.getMatchDetails = function () {
        $http.get('http://localhost:8081/match/match-detail/').
        then(function successCallBack(response) {
            console.log(response.data)
        }, function errorCallBack(response) {
            console.log(response.data)
        });
    }
    $scope.getMatchDetails();
}]).
controller('NewPlayerCtrl', ['$scope', '$location', '$http', function($scope,  $location, $http) {
    $http.defaults.headers.common.Authorization = localStorage.getItem('token');
    $scope.submit = function() {
        var skill_data = {};
        var skill_keys = ['zeroes','ones', 'twos', 'threes', 'fours', 'six', 'wickets', 'total_matches'];
        for(let key = 0; key<skill_keys.length; key++){
            skill_data[key] = $scope.form[key];
            console.log(skill_data)
        }
        $http.post('http://localhost:8081/players/players-detail/', $scope.form).
        then(function successCallBack(response) {
            console.log(response)
        }, function errorCallBack(response) {
            console.log(response)
        });   
    }
}]).
controller('TeamController', ['$scope', '$http', function($scope, $http) {
    $http.defaults.headers.common.Authorization = localStorage.getItem('token');
    $http.get('http://localhost:8081/players/players-detail/').
    then(function successCallBack(response){
        console.log(response.data)
        let total_players = response.data;    
        $scope.total_players = response.data.length;
        console.log($scope.total_players)
        for (let current_player = 0; current_player<total_players; current_player++){
            console.log(total_players[current_player])
        }
        $scope.required_players = 0;
        if($scope.total_players < 11){
            $scope.required_players = 11 - $scope.total_players; 
        }
    },function errorCallBack(response){
        console.log(response)
    });    
}]).
controller('PlayersCtrl', ['$scope','$http' , function($scope, $http){
    $http.defaults.headers.common.Authorization = localStorage.getItem('token');
    var player_detail = false, player_stat = false, player_skill = false;
    $scope.players = [];
    $http.get('http://localhost:8081/players/players-detail/').
    then(function successCallBack(response){
        console.log(response.data)
        $scope.players = response.data;
        $scope.no_of_players = response.data.length;
        console.log($scope.no_of_players, $scope.players)
        player_detail = true;
    }, function errorCallBack(response){
        console.log(response);
    });
    $http.get('http://localhost:8081/players/players-stats/').
    then(function successCallBack(response){
        console.log(response.data)
        $scope.players_stats = response.data;
        player_stat = true; 
    }, function errorCallBack(response){
        console.log(response)
    });
    $http.get('http://localhost:8081/players/players-skill/').
    then(function successCallBack(response){
        console.log(response)
        $scope.players_skills = response.data;
        player_skill = true;
    }, function errorCallBack(response){
        console.log(response)
    });

    if(player_detail && player_skill && player_stat){
        console.log($scope.players, $scope.no_of_players, $scope.players_skill)
    }
}]);