(function() {
  'use strict';

  angular
    .module('firebase-starter.carComparisation')
    .factory('carComparisationService', carComparisationService);

  carComparisationService.$inject = ['$q','$http'];

  /* @ngInject */
  function carComparisationService($q,$http) {

    var apiBaseUrl = 'http://carsapi.azurewebsites.net/api/';

    var service = {
      getMake: getMake,
      getModel: getModel,
      getYear: getYear,
      getVersion: getVersion,
      getSpec: getSpec,
      compareCar1: {},
      compareCar2: {}
    };
    return service;

    function getMake() {
      return $http({
        type: 'GET',
        url: apiBaseUrl + "make"
      });

    }

    function getModel(makeId){
      return $http({
        type: 'GET',
        url: apiBaseUrl + "model/make/" + makeId
      });

    }

    function getYear(modelId){
      return $http({
        type: 'GET',
        url: apiBaseUrl + "modelyear/model/" + modelId
      });

    }

    function getVersion(modelId,year){
     return $http({
        type: 'GET',
        url: apiBaseUrl + "version/model/" + modelId + "/year/" + year
      })
    }

    function getSpec(versionId){
      return $http({
        type: 'GET',
        url: apiBaseUrl +"cardetail/version/"+ versionId
      });
    }


  }
})();
