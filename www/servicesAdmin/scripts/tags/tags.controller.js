(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.tags')
		.controller('TagsController', TagsController);

	TagsController.$inject = ['tagsService', 'editTagDialogService', '$ionicListDelegate'];

	/* @ngInject */
	function TagsController(tagsService, editTagDialogService, $ionicListDelegate) {
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
			tagsService.deleteItem(item);
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editTagDialogService.show(item.title, item.body, item.category, item.thumb).then(function(result) {
				if (result.canceled) {
					return;
				}

				tagsService.updateItem(item, result);
			});
		}

		function selectAll() {
			vm.items = tagsService.selectAll();
		}

		function addItem() {
			editTagDialogService.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					title: result.title,
					body: result.body,
					category: result.category,
					thumb: result.thumb
				};
				tagsService.insert(item);
				
			});
		}
	}
})();