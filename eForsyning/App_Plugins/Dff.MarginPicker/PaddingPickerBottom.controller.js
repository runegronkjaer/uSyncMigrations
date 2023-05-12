angular.module("umbraco")
    .controller("Dff.PaddingPickerBottom.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService','$http',
        function ($scope, $routeParams, assetsService, notificationsService, $http) {

            $scope.GetPaddingValuesBottom = function () {
                var data = $http.get('/umbraco/dff/dffapi/GetMarginValues?mode=padding-bottom');

                return data;
            }

        }]);























