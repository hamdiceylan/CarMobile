(function() {
  'use strict';

  angular
    .module('firebase-starter.fuelConsumption')
    .controller('FuelConsumption', FuelConsumption);


  /* @ngInject */
  FuelConsumption.$inject = ['$scope','FuelConsumptionService','$stateParams'];

  /* CarComparisationController */
  function FuelConsumption($scope,FuelConsumptionService,$stateParams) {

    $scope.$on('$ionicView.enter',function(){

    });

    var vm = angular.extend(this, {
      carData :null

    });

    (function activate() {

      getCarData($stateParams.versionId);


    })();

    function getCarData(versionId) {
      FuelConsumptionService.getSpec(versionId).then(function (result) {
        vm.carData = JSON.parse(result.data.json);
      });
    }

  }

})();
