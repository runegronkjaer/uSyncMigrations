angular.module("umbraco")
    .controller("Dff.Colors.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService', 'DffColorsResource',
        function ($scope, $routeParams, assetsService, notificationsService, DffColorsResource) {

            $scope.colors = [];
            $scope.addColors = $scope.model.config.addColors;

            //alert($routeParams.id);

            DffColorsResource.GetThemeColors($routeParams.id, $scope.addColors).success(function (data) {
                $scope.colors = data;
            });

            $scope.setActive = function (color) {
                if ($scope.model.value !== "" && Number($scope.model.value) === color) {
                    return 'active';
                } 
            };

            $scope.toggleItem = function (color) {
                if ($scope.model.value == color) {
                    $scope.model.value = "";
                }
                else {
                    $scope.model.value = color;
                }
            };

        }]);




