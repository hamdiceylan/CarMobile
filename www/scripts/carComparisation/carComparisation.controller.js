(function() {
  'use strict';

  angular
    .module('firebase-starter.carComparisation')
    .controller('CarComparisationController', CarComparisationController)
    .controller('MakeController', MakeController)
    .controller('ModelController', ModelController)
    .controller('YearController', YearController)
    .controller('VersionController', VersionController)
    .controller('CarDetailController', CarDetailController);


  /* @ngInject */
  CarComparisationController.$inject = [
    '$ionicSlideBoxDelegate',  '$stateParams', '$ionicPopup','carComparisationService','$scope'];

  /* CarComparisationController */
  function CarComparisationController($ionicSlideBoxDelegate, $stateParams, $ionicPopup,carComparisationService,$scope) {

    $scope.$on('$ionicView.enter',function(){
      vm.car1 = carComparisationService.compareCar1;
      vm.car2 = carComparisationService.compareCar2;
      vm.compareCar1Image = carComparisationService.compareCar1Image;
      vm.compareCar2Image = carComparisationService.compareCar2Image;
      vm.carName1 = carComparisationService.carName1;
      vm.carName2 = carComparisationService.carName2;
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
          carComparisationService.compareCar1Image = JSON.parse(success.json).version.showCasePicture;
          $state.go('app.carComparisation');

        }
        else if (vm.carNumber == 2) {
          carComparisationService.compareCar2 = JSON.parse(success.json).version.feature;
          carComparisationService.carName2 = JSON.parse(success.json).version.name;
          carComparisationService.car2bigImage = JSON.parse(success.json).version.showCasePicture;

          $state.go('app.carComparisation');

        }
        else if (vm.carNumber == 3) {
          carComparisationService.compareCar2 = JSON.parse(success.json).version.feature;
          $state.go('app.carDetail', { "versionId": version.id});

        }
        else if (vm.carNumber == 4) {
          $state.go('app.fuelConsumption', { "versionId": version.id});
        }

        console.log(success);
      });
    }

  }


  /* @ngInject */
  CarDetailController.$inject = ['$stateParams','carComparisationService'];
  /* Version Controller */

  function CarDetailController($stateParams,carComparisationService){

    var vm = angular.extend(this, {
      rating: 0,
      item: null,
      getCarSpec : getCarSpec
    });

    vm.versionId = $stateParams.versionId;

    (function activate() {
      getCarSpec(vm.versionId);
    })();

    function getCarSpec(versionId){
      carComparisationService.getSpec(versionId).
      success(function (success) {
        vm.CarDetails = JSON.parse(success.json);
        console.log(vm.CarDetails);
        vm.bigImage = vm.CarDetails.version.showCasePicture.replace("/180x135/","/660x495/");
      });
    }

  }

})();
