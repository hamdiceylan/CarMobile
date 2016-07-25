(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.categories')
		.factory('editCategoryDialogService', editCategoryDialogService);

	editCategoryDialogService.$inject = ['$rootScope', '$ionicModal', '$q'];

	/* @ngInject */
	function editCategoryDialogService($rootScope, $ionicModal, $q) {
		var scope = createModal();
		var service = {
			show: show
		};
		return service;

		// ***************************************************

		function show(key, value) {
			var defer = $q.defer();

			scope.data = {
				key: key,
				value: value
			}

			scope.cancel = function() {
				scope.modal.hide();
				defer.reject();
			}
			scope.save = function() {
				if (scope.data.key && scope.data.value) {
					scope.modal.hide();
					defer.resolve({
						key: scope.data.key,
						value: scope.data.value
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

			$ionicModal.fromTemplateUrl('scripts/categories/edit-category.html', {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
			});

			return scope;
		}
	}
})();
