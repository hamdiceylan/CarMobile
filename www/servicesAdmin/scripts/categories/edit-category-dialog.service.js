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

		function show(key, value, url, thumb) {
			var defer = $q.defer();

			scope.data = {
				title: key,
				desc: value,
				url: url,
				thumb: thumb
			}

			scope.cancel = function() {
				scope.modal.hide();
				defer.reject();
			}
			scope.save = function() {
				if (scope.data.title && scope.data.desc) {
					scope.modal.hide();
					defer.resolve({
						title: scope.data.title,
						desc: scope.data.desc,
						url: scope.data.url,
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

			$ionicModal.fromTemplateUrl('scripts/categories/edit-category.html', {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
			});

			return scope;
		}
	}
})();
