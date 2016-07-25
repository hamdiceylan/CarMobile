(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.tags')
		.factory('editTagDialogService', editTagDialogService);

	editTagDialogService.$inject = ['$rootScope', '$ionicModal', '$q', 'categoriesService'];

	/* @ngInject */
	function editTagDialogService($rootScope, $ionicModal, $q, categoriesService) {
		var scope = createModal();
		var service = {
			show: show
		};
		return service;

		// ***************************************************

		function show(key, value, category, thumb) {
			var defer = $q.defer();
			var cat = categoriesService.selectAll();

			scope.data = {
				title: key,
				body: value,
				category: cat,
				thumb: thumb,
				selectedOption: _.findWhere(cat, {$id: category})
				
			}

			scope.cancel = function() {
				scope.modal.hide();
				defer.reject();
			}
			scope.save = function() {
				if (scope.data.title && scope.data.body) {
					scope.modal.hide();
					defer.resolve({
						title: scope.data.title,
						body: scope.data.body,
						category: scope.data.selectedOption.$id,
						thumb: scope.data.thumb
					});
				} else {
					alert('Key and value should be filled');
				}
			}

			scope.modal.show();
			return defer.promise;
		}

		function createModal() {
			var scope = $rootScope.$new();

			$ionicModal.fromTemplateUrl('scripts/tags/edit-tag.html', {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
			});

			return scope;
		}
	}
})();
