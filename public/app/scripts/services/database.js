'use strict';

/**
 * @ngdoc service
 * @name publicApp.Database
 * @description
 * # Database
 * Service in the publicApp.
 */
angular.module('publicApp')
  .service('Database', function ($http) {
  	var url='http://localhost:3000';
   	return{
   		save:function(data,country){
   			return $http.post(url+'/country/'+country, JSON.stringify(data));
   		},
   		stations:function(country){
   			return $http.get(url+'/country/'+country);
   		},
   		countries:function(){
   			return $http.get(url+'/countries');
   		}
   	}
  });
