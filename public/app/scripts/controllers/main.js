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
  });
