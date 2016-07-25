(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.tags', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.tags', {
					url: '/tags',
					views: {
						'menuContent': {
							templateUrl: 'scripts/tags/tags.html',
							controller: 'TagsController as vm'
						}
					}
				});
		});
})();