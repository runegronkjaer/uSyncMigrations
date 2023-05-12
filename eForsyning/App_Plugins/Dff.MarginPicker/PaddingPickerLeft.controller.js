angular.module("umbraco")
    .controller("Dff.PaddingPickerLeft.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService','$http',
        function ($scope, $routeParams, assetsService, notificationsService, $http) {

            $scope.GetPaddingValuesLeft = function () {
                var data = $http.get('/umbraco/dff/dffapi/GetMarginValues?mode=padding-left');

                return data;
            }

        }]);























