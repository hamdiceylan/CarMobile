(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.tags')
		.factory('editTagDialogService', editTagDialogService);

	editTagDialogService.$inject = ['$rootScope', '$ionicModal', '$q'];

	/* @ngInject */
	function editTagDialogService($rootScope, $ionicModal, $q) {
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

			$ionicModal.fromTemplateUrl('scripts/tags/edit-tag.html', {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
			});

			return scope;
		}
	}
})();
