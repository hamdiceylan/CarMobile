(function() {
  'use strict';

  angular
    .module('firebase-starter.carSearch', [
      'ionic'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.carSearch', {
          url: '/carSearch',
          views: {
            'menuContent': {
              templateUrl: 'scripts/carSearch/carList.html',
              controller: 'CarList as vm'
            }
          },
          resolve: {
            filterModal: function($ionicModal, $rootScope) {
              return $ionicModal.fromTemplateUrl('scripts/carSearch/filter.html', {
                scope: $rootScope,
                animation: 'slide-in-up'
              });
            }
          }
        })
    });

})();
