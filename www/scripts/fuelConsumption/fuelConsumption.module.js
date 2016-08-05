(function() {
  'use strict';

  angular
    .module('firebase-starter.fuelConsumption', [
      'ionic'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.fuelConsumption', {
          url: '/fuelConsumption/:versionId',
          views: {
            'menuContent': {
              templateUrl: 'scripts/fuelConsumption/fuelConsumption.html',
              controller: 'FuelConsumption as vm'
            }
          }
        })
    });

})();
