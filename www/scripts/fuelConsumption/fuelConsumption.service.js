(function() {
  'use strict';

  angular
    .module('firebase-starter.fuelConsumption')
    .factory('FuelConsumptionService', FuelConsumptionService);

  FuelConsumptionService.$inject = ['$http'];

  /* @ngInject */
  function FuelConsumptionService($http) {

    var apiBaseUrl = 'http://carsapi.azurewebsites.net/api/';

    var service = {
      getSpec: getSpec
    };
    return service;

    function getSpec(versionId){
      return $http({
        type: 'GET',
        url: apiBaseUrl +"cardetail/version/"+ versionId
      });
    }

  }
})();
