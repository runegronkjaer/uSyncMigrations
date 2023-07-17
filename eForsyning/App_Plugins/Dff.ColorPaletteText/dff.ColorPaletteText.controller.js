angular.module("umbraco")
    .controller("Dff.ColorPaletteText.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService', 'DffColorTextResource',
        function ($scope, $routeParams, assetsService, notificationsService, DffColorTextResource) {

            $scope.colors = [];
            //alert($routeParams.id);
          DffColorTextResource.GetThemeColors($routeParams.id).then(function (data) {
            $scope.colors = data.data;           
            });

            $scope.toggleItem = function (color) {
                if ($scope.model.value == color) {
                    $scope.model.value = "";
                }
                else {
                    $scope.model.value = color;
                }
            };

            if ($scope.model.value.length == 0) {
                if ($scope.model.value == "") {
                    $scope.model.value = [];
                    $scope.model.value[0] = "Hvid";
                    $scope.model.value[1] = "Hvid";
                    $scope.model.value[2] = "Hvid";
                    $scope.model.value[3] = "Hvid";
                    $scope.model.value[4] = "Hvid";
                }
            }
        }]);