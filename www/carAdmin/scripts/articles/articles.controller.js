(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.articles')
		.controller('ArticlesController', ArticlesController);

	ArticlesController.$inject = ['articlesService', '$ionicListDelegate', 'editArticleService', '$state'];

	/* @ngInject */
	function ArticlesController(articlesService, $ionicListDelegate, editArticleService, $state) {
		var vm = angular.extend(this, {
			items: [],
			addItem: addItem,
			deleteItem: deleteItem,
			updateItem: updateItem,
			openDetails: openDetails
		});

		(function activate() {
			selectAll();
		})();

		// ********************************************************************

		function openDetails(item) {
			$state.go('app.article', {
				id: item.$id
			});
		}

		function deleteItem(item) {
			articlesService.deleteItem(item);
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editArticleService.show(item.title, item.body).then(function(result) {
				if (result.canceled) {
					return;
				}

				articlesService.saveItem(item.$id, {
					title: result.title,
					body: result.body
				});
			});
		}

		function selectAll() {
			vm.items = articlesService.selectAll();
		}

		function addItem() {
			editArticleService.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					title: result.title,
					body: result.body
				};

				articlesService.insert(item);
			});
		}
	}
})();