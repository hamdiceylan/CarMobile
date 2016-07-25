(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.home', [
			'ionic',
			'ngCordova',
			'firebase-starter-admin.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						'menuContent': {
							templateUrl: 'scripts/home/home.html',
							controller: 'HomeController as vm'
						}
					}
				});
		});
})();
