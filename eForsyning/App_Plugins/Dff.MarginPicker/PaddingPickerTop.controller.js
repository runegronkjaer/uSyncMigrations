angular.module("umbraco")
    .controller("Dff.PaddingPickerTop.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService','$http',
        function ($scope, $routeParams, assetsService, notificationsService, $http) {

            $scope.GetPaddingValuesTop = function () {
                var data = $http.get('/umbraco/dff/dffapi/GetMarginValues?mode=padding-top');

                return data;
            }

        }]);























