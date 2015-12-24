'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('MainCtrl', function (Database, $scope) {
    Database.countries()
    	.success(function(data){
    		$scope.countries=data;
    	});

    $scope.refresh=function(){
    	Database.update()
    	.success(function(){
    		toastr.success('Refreshed !', 'Arabic radio');
    	});
    };

    $scope.upload=function(name){
    	Database.upload(name)
    	.success(function(){
    		toastr.success(name+' uploaded !', 'Arabic radio');
    	});
    }
  });
