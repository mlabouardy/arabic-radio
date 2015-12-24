'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:StationsCtrl
 * @description
 * # StationsCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('StationsCtrl', function ($routeParams, $scope, Database) {
    $scope.name=$routeParams.name;
    $scope.stations=[];
    Database.stations($scope.name)
    	.success(function(data){
    		$scope.stations=data;
    	});
    $scope.create=function(){
    	$scope.stations.push($scope.station);
    	Database.save($scope.stations, $scope.name);
    	$scope.station={};
    }
    $scope.delete=function(index){
    	$scope.stations.splice(index,1);
    	Database.save($scope.stations, $scope.name);
    }

    $scope.update=function(){
    	 Database.update()
	    	.success(function(data){
	    		$scope.stations=data;
	    	});
    }
  });
