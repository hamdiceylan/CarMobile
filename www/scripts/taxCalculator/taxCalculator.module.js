(function() {
  'use strict';

  angular
    .module('firebase-starter.taxCalculator', [
      'ionic'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.taxCalculator', {
          url: '/taxCalculator',
          views: {
            'menuContent': {
              templateUrl: 'scripts/taxCalculator/taxCalculator.html',
              controller: 'TaxCalculator as vm'
            }
          }
        })
    });

})();
