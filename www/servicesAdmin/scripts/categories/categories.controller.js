(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.categories')
		.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['categoriesService', 'editCategoryDialogService', '$ionicListDelegate'];

	/* @ngInject */
	function CategoriesController(categoriesService, editCategoryDialogService, $ionicListDelegate) {
		var vm = angular.extend(this, {
			items: [],
			addItem: addItem,
			deleteItem: deleteItem,
			updateItem: updateItem
		});

		(function activate() {
			selectAll();
		})();

		// ********************************************************************

		function deleteItem(item) {
			categoriesService.deleteItem(item);
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editCategoryDialogService.show(item.title, item.desc, item.url, item.thumb).then(function(result) {
				if (result.canceled) {
					return;
				}

				categoriesService.updateItem(item, result);
			});
		}

		function selectAll() {
			vm.items = categoriesService.selectAll();

		}

		function addItem() {
			editCategoryDialogService.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					desc: result.desc,
					thumb: result.thumb,
					title: result.title,
					url: result.url
				};

				categoriesService.insert(item);
			});
		}
	}
})();