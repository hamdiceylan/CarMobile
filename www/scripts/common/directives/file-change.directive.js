(function() {
	'use strict';

	angular
		.module('firebase-starter.common')
		.directive('fileChange', ['$parse', function($parse) {
			return {
				restrict: 'A',
				link: function($scope, element, attrs) {
					var attrHandler = $parse(attrs['fileChange']);
					var handler = function(e) {
						$scope.$apply(function() {
							attrHandler($scope, { $event: e, files: e.target.files });
						});
					};
					element[0].addEventListener('change', handler, false);
				}
			};
		}]);
})();