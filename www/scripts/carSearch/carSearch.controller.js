(function() {
  'use strict';

  angular
    .module('firebase-starter.carSearch')
    .controller('CarList', CarList);


  /* @ngInject */
  CarList.$inject = ['$scope','CarSearchService','$state','filterModal'];

  /* CarComparisationController */
  function CarList($scope,CarSearchService,$state,filterModal) {

    $scope.$on('$ionicView.enter',function(){

    });

    var vm = angular.extend(this, {
      carList:null,
      openDetails : openDetails,
      showFilter:showFilter,
      applyFilters:applyFilters,
      loadArticles:loadArticles,
      loadCategories:loadCategories

    });

    (function activate() {

      getDefault();


    })();

    function getDefault() {
      CarSearchService.getCarList().then(function (success) {
        vm.carList = success.data;
      });
    }

    function openDetails(id) {
      $state.go('app.carDetail', { "versionId": id});
    }

    function applyFilters() {
      filterModal.hide();

      var scope = filterModal.scope;
      console.log(scope);
      getDefault();
    }

    function showFilter() {
      var scope = filterModal.scope;
      scope.vm = {
        categories: vm.categories,
        selectedCategory: vm.selectedCategory,
        sortBy: vm.sortBy,
        applyFilters: applyFilters
      };

      filterModal.show();
    }

    function filterByCategory(category) {
      vm.selectedCategory = category;
      loadArticles();
    }

    function loadArticles() {
      articlesService.selectAll().then(function(articles) {
        vm.items = articles;
        console.log('articles ' , articles);
      });
    }

    function loadCategories() {
      articlesService.loadCategories().then(function(categories) {
        vm.categories = categories;
      });
    }

  }

})();
