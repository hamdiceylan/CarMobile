(function() {
  'use strict';

  angular
    .module('firebase-starter.carSearch')
    .factory('CarSearchService', CarSearchService);

  CarSearchService.$inject = ['$http'];

  /* @ngInject */
  function CarSearchService($http) {

    var service = {
      getCarList: getCarList
    };
    return service;

    function getCarList() {

      return $http({
        type: 'GET',
        url: "http://carsapi.azurewebsites.net/api/version/cheapest/100"
      });

    }

  }
})();
