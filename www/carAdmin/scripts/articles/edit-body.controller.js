(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.articles')
		.controller('EditBodyController', EditBodyController);

	EditBodyController.$inject = ['articlesService', '$stateParams', '$ionicHistory'];

	/* @ngInject */
	function EditBodyController(articlesService, $stateParams, $ionicHistory) {
		var vm = angular.extend(this, {
			item: null,
			body: '',
			save: save,
			cancel: cancel
		});

		(function activate() {
			loadItem();
		})();

		// ********************************************************************

		function loadItem() {
			articlesService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;
				vm.body = item.body;
			});
		}

		function save() {
			articlesService.saveItem(vm.item.$id, {
				body: vm.body
			});
			$ionicHistory.goBack();
		}

		function cancel() {
			$ionicHistory.goBack();
		}
	}
})();