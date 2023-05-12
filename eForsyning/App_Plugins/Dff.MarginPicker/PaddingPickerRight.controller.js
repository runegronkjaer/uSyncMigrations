angular.module("umbraco")
    .controller("Dff.PaddingPickerRight.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService', '$http',
        function ($scope, $routeParams, assetsService, notificationsService, $http) {

            $scope.GetPaddingValuesRight = function () {
                var data = $http.get('/umbraco/dff/dffapi/GetMarginValues?mode=padding-right');

                return data;
            }

        }]);























