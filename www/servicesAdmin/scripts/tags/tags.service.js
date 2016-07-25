(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.tags')
		.factory('tagsService', tagsService);

	tagsService.$inject = ['fireDataService'];

	/* @ngInject */
	function tagsService(fireDataService) {
		var tags = fireDataService.create('menuItems');
		return tags;
	}
})();
