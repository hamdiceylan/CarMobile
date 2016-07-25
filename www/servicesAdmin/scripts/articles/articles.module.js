(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.articles', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.articles', {
					url: '/articles',
					views: {
						'menuContent': {
							templateUrl: 'scripts/articles/articles.html',
							controller: 'ArticlesController as vm'
						}
					}
				})
				.state('app.article', {
					url: '/article/:id',
					views: {
						'menuContent': {
							templateUrl: 'scripts/articles/article.html',
							controller: 'ArticleController as vm'
						}
					}
				})
				.state('app.edit-body', {
					url: '/articles/:id/body',
					views: {
						'menuContent': {
							templateUrl: 'scripts/articles/edit-body.html',
							controller: 'EditBodyController as vm'
						}
					}
				});
		});
})();