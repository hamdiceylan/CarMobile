(function() {
	'use strict';

	angular
		.module('firebase-starter-admin.articles')
		.controller('ArticleController', ArticleController);

	ArticleController.$inject = [
		'articlesService', '$stateParams', 'cameraService', 'amazonS3Service', '$ionicLoading', '$window', '$state', 'fieldEditor', 'listsService', '$ionicPopup', '_', 'ENV'];

	/* @ngInject */
	function ArticleController(
		articlesService, $stateParams, cameraService, amazonS3Service, $ionicLoading, $window, $state, fieldEditor, listsService, $ionicPopup, _, ENV) {
		var vm = angular.extend(this, {
			columnWidth: Math.ceil(100 / ENV.columnsInGallery),
			item: null,
			imageGroups: [],
			uploadImage: uploadImage,
			uploadImageWebView: uploadImageWebView,
			removeImage: removeImage,
			changeTitle: changeTitle,
			isWebView: !$window.Camera,
			chooseCategory: chooseCategory,
			chooseTags: chooseTags,
			changeBody: changeBody
		});

		(function activate() {
			loadItem();
		})();

		// ********************************************************************

		function loadItem() {
			articlesService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;

				if (item.images) {
					vm.imageGroups = _.chunk(item.images, ENV.columnsInGallery);
				}
			});
		}

		function changeTitle() {
			fieldEditor.showTextFieldEditor({
				title: 'Title',
				value: vm.item.title
			}).then(function(title) {
				vm.item.title = title;
				articlesService.saveItem(vm.item.$id, {
					title: title
				});
			});
		}

		function chooseCategory() {
			listsService.getCategories().$loaded().then(function(categories) {
				fieldEditor.showSelector({
					items: categories,
					selectedItem: vm.item.category
				}).then(function(category) {
					vm.item.category = category;
					articlesService.saveItem(vm.item.$id, {
						category: category.key
					});
				});
			});
		}

		function chooseTags() {
			listsService.getTags().$loaded().then(function(tags) {
				fieldEditor.showSelector({
					items: tags,
					selectedItems: vm.item.tags || [],
					multi: true
				}).then(function(tags) {
					vm.item.tags = tags;
					vm.item.tagsString = _.pluck(tags, 'value').join(', ')
					articlesService.saveItem(vm.item.$id, {
						tags: _.map(tags, 'key')
					});
				});
			});
		}

		function changeBody() {
			$state.go('app.edit-body', {
				id: $stateParams.id
			});
		}

		function removeImage(item) {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete the image',
				template: 'Are you sure you want to delete the image?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					var index = vm.item.images.indexOf(item);
					vm.item.images.splice(index, 1);
					articlesService.saveItem(vm.item.$id, {
						images: vm.item.images
					});
					amazonS3Service.deleteImage(item.url);
					loadItem();
				}
			});
		}

		function uploadToS3(dataUri) {
			$ionicLoading.show({});
			amazonS3Service.upload(dataUri)
				.then(function(url) {
					$ionicLoading.hide({});
					addImage(url);
					loadItem();
				}, function(err) {
					$ionicLoading.hide({});
					console.log(err);
				});
		}

		function addImage(url) {
			if (!vm.item.images) {
				vm.item.images = [];
			}
			vm.item.images.push({
				url: url
			});
			articlesService.saveItem(vm.item.$id, {
				images: vm.item.images
			});
		}

		function uploadImageWebView($event, files) {
			if (!files[0]) {
				return;
			}

			var reader = new FileReader();
			reader.onloadend = function(e) {
				var data = e.target.result;
				console.log('Loaded ' + typeof data);
				uploadToS3(data);
				//send you binary data via $http or $resource or do anything else with it
			}
			reader.readAsDataURL(files[0]);
		}

		function uploadImage() {
			cameraService.getPhoto().then(uploadToS3);
		}
	}
})();
