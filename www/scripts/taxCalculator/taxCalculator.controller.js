(function() {
  'use strict';

  angular
    .module('firebase-starter.taxCalculator')
    .controller('TaxCalculator', TaxCalculator);


  /* @ngInject */
  TaxCalculator.$inject = ['$scope','TaxCalculatorService','$stateParams'];

  /* CarComparisationController */
  function TaxCalculator($scope,TaxCalculatorService,$stateParams) {

    $scope.$on('$ionicView.enter',function(){

    });

    var vm = angular.extend(this, {
      showResult : false,
      calculateTax:calculateTax
    });

    (function activate() {


    })();

    function calculateTax() {
      vm.showResult = !vm.showResult;

    }

  }

})();
