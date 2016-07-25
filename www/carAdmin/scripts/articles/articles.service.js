(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.articles')
		.factory('articlesService', articlesService);

	articlesService.$inject = ['firebaseDb', '_', '$firebaseArray', '$firebaseObject', 'listsService'];

	/* @ngInject */
	function articlesService(firebaseDb, _, $firebaseArray, $firebaseObject, listsService) {
		var collectionName = 'articles';
		var articles;

		var service = {
			selectAll: selectAll,
			selectOne: selectOne,
			saveItem: saveItem,
			deleteItem: deleteItem,
			insert: insert
		};
		return service;

		function insert(item) {
			return articles.$add(item);
		}

		function deleteItem(item) {
			return articles.$remove(item).then(function(ref) {
				return ref.key() === item.$id; // true
			});
		}

		function saveItem(id, source) {
			var one = firebaseDb.child(collectionName).child(id);
			return $firebaseObject(one).$loaded().then(function(item) {
				angular.extend(item, source);
				return item.$save();
			});
		}

		function selectOne(id) {
			var one = firebaseDb.child(collectionName).child(id);
			return $firebaseObject(one).$loaded()
				.then(enrichCategory)
				.then(enrichTags);
		}

		function enrichCategory(item) {
			return getCategory(item.category).then(function(category) {
				return angular.extend({}, item, {
					category: category
				});
			});
		}

		function enrichTags(item) {
			return getTags(item.tags).then(function(tags) {
				return angular.extend({}, item, {
					tags: tags,
					tagsString: _.pluck(tags, 'value').join(', ')
				});
			});
		}

		function getCategory(key) {
			return listsService.getCategories().$loaded().then(function(categories) {
				return _.find(categories, 'key', key);
			});
		}

		function getTags(keys) {
			return listsService.getTags().$loaded().then(function(tags) {
				return _.filter(tags, function(tag) {
					return !!_.find(keys, function(key) {
						return key === tag.key;
					});
				});
			});
		}

		function selectAll() {
			var query = firebaseDb.child(collectionName);
			articles = $firebaseArray(query);
			return articles;
		}
	}
})();
