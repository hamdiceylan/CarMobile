(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.categories')
		.factory('categoriesService', categoriesService);

	categoriesService.$inject = ['fireDataService'];

	/* @ngInject */
	function categoriesService(fireDataService) {
		var categories = fireDataService.create('categoriesList');
		return categories;
	}
})();
