(function() {
  'use strict';

  angular
    .module('firebase-starter.taxCalculator')
    .factory('TaxCalculatorService', TaxCalculatorService);

  TaxCalculatorService.$inject = ['$http'];

  /* @ngInject */
  function TaxCalculatorService($http) {


    var service = {
    };
    return service;
    

  }
})();
