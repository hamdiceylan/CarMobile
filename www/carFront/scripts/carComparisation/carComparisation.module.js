(function() {
  'use strict';

  angular
    .module('firebase-starter.carComparisation', [
      'ionic'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.carComparisation', {
          url: '/carComparisation',
          views: {
            'menuContent': {
              templateUrl: 'scripts/carComparisation/carComparisation.html',
              controller: 'CarComparisationController as vm'
            }
          }
        })
        .state('app.carComparisationMake', {
          url: '/make/:carNumber',
          views: {
            'menuContent': {
              templateUrl: 'scripts/carComparisation/make.html',
              controller: 'MakeController as vm'
            }
          }
        })
        .state('app.carComparisationModel', {
          url: '/model/:carNumber/:makeId',
          views: {
            'menuContent': {
              templateUrl: 'scripts/carComparisation/model.html',
              controller: 'ModelController as vm'
            }
          }
        })
        .state('app.carComparisationYear', {
          url: '/year/:carNumber/:makeId/:modelId',
          views: {
            'menuContent': {
              templateUrl: 'scripts/carComparisation/year.html',
              controller: 'YearController as vm'
            }
          }
        })
        .state('app.carComparisationVersion', {
          url: '/version/:carNumber/:makeId/:modelId/:year',
          views: {
            'menuContent': {
              templateUrl: 'scripts/carComparisation/version.html',
              controller: 'VersionController as vm'
            }
          }
        })
    });
})();
