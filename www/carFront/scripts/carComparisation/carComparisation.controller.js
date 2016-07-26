(function() {
  'use strict';

  angular
    .module('firebase-starter.carComparisation')
    .controller('CarComparisationController', CarComparisationController)
    .controller('MakeController', MakeController)
    .controller('ModelController', ModelController)
    .controller('YearController', YearController)
    .controller('VersionController', VersionController);

  /* @ngInject */
  CarComparisationController.$inject = [
    '$ionicSlideBoxDelegate',  '$stateParams', '$ionicPopup','carComparisationService','$scope'];

  /* CarComparisationController */
  function CarComparisationController($ionicSlideBoxDelegate, $stateParams, $ionicPopup,carComparisationService,$scope) {

    $scope.$on('$ionicView.enter',function(){
      vm.car1 = carComparisationService.compareCar1;
      vm.car2 = carComparisationService.compareCar2;
    });


    var vm = angular.extend(this, {
      rating: 0,
      item: null,
      car1: {},
      car2: {},
      carName1: ''
    });

    (function activate() {
      vm.car1 = carComparisationService.compareCar1;
      vm.car2 = carComparisationService.compareCar2;
      vm.carName1 = carComparisationService.carName1;

    })();


  }

  /* @ngInject */
  MakeController.$inject = ['$stateParams','carComparisationService'];
  /* Make Controller */

  function MakeController($stateParams,carComparisationService){

    var vm = angular.extend(this, {
      rating: 0,
      item: null
    });

    vm.carNumber = $stateParams.carNumber;

    (function activate() {
      getMake();

    })();

    function getMake() {
      carComparisationService.getMake().
      success(function (success) {
        vm.make = success;
      });
    }

  }


  /* @ngInject */
  ModelController.$inject = ['$stateParams','carComparisationService'];
  /* Model ModelController */

  function ModelController($stateParams,carComparisationService){

    var vm = angular.extend(this, {
      rating: 0,
      item: null
    });

    vm.carNumber = $stateParams.carNumber;
    vm.makeId = $stateParams.makeId;

    (function activate() {
      getModel($stateParams.makeId);

    })();

    function getModel(makeId) {
      carComparisationService.getModel(makeId).
      success(function (success) {
        vm.models = success;
      });
    }

  }



  /* @ngInject */
  YearController.$inject = ['$stateParams','carComparisationService'];
  /* Year Controller */

  function YearController($stateParams,carComparisationService){

    var vm = angular.extend(this, {
      rating: 0,
      item: null
    });

    vm.carNumber = $stateParams.carNumber;
    vm.makeId = $stateParams.makeId;
    vm.modelId = $stateParams.modelId;

    (function activate() {
      getYear($stateParams.modelId);

    })();

    function getYear(modelId) {
      carComparisationService.getYear(modelId).
      success(function (success) {
        vm.years = success;
      });
    }

  }



    /* @ngInject */
  VersionController.$inject = ['$stateParams','carComparisationService','$state'];
  /* Version Controller */

  function VersionController($stateParams,carComparisationService,$state){

    var vm = angular.extend(this, {
      rating: 0,
      item: null,
      getCarSpec : getCarSpec
    });

    vm.carNumber = $stateParams.carNumber;
    vm.makeId = $stateParams.makeId;
    vm.modelId = $stateParams.modelId;
    vm.year = $stateParams.year;

    (function activate() {
      getVersion($stateParams.modelId,$stateParams.year);

    })();

    function getVersion(modelId,year) {
      carComparisationService.getVersion(modelId,year).
      success(function (success) {
        vm.versions = success;
      });
    }

    function getCarSpec(version){
      console.log(version);
     carComparisationService.getSpec(version.id).
      success(function (success) {
        if (vm.carNumber == 1) {
          carComparisationService.compareCar1 = JSON.parse(success.json).version.feature;
          carComparisationService.carName1 = JSON.parse(success.json).version.name;

        }
        else if (vm.carNumber == 2) {
          carComparisationService.compareCar2 = JSON.parse(success.json).version.feature;

        }

        $state.go('app.carComparisation');
        console.log(success);
      });
    }

  }




})();
