angular.module("umbraco")
    .controller("Dff.FormEditor.Templates.Controller", ['$scope', '$routeParams', 'assetsService', 'dialogService','DffFormTemplateResource',
        function ($scope, $routeParams, assetsService, dialogService, DffFormTemplateResource) {

            $scope.model.hideSubmitButton = true;

            $scope.templates = [];

            DffFormTemplateResource.GetFormTemplates().success(function (data) {
                $scope.templates = data;
            });

            $scope.selectItem = function (item) {
                //alert('nu' + item.Name);
                //$scope.newElement.Name = "Uden navn";
                $scope.model.value = item;
                $scope.model.submit($scope.model);
                
                $scope.model.controlToAdd = item.Name;
                $scope.model.show = false;
                
                //$scope.overlay.show = false;
                //$scope.overlay.title = "sfdsdsdf";
                //$scope.form.Unassigned.push($scope.element.Names);

            }

        }]);
