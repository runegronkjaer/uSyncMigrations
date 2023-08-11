angular.module('umbraco')
	.controller('Dff.FormEditor.Templates.Controller', function ($scope, DffFormTemplateResource) {

		$scope.model.hideSubmitButton = true;

		$scope.templates = [];

		DffFormTemplateResource.GetFormTemplates().then(function (response) {
			$scope.templates = response.data;
		});

		$scope.selectItem = function (item) {
			$scope.model.value = item;
			$scope.model.submit($scope.model);

			$scope.model.controlToAdd = item.Name;
			$scope.model.show = false;
		};
	});
