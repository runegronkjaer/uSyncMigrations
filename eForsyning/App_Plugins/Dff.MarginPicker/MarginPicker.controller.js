angular.module("umbraco")
    .controller("Dff.MarginPicker.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService','$http',
        function ($scope, $routeParams, assetsService, notificationsService, $http) {

            $scope.GetMarginValuesTop = function () {
                var data = $http.get('/umbraco/dff/dffapi/GetMarginValues?mode=margin-top');

                return data;
            }

            $scope.GetMarginValuesBottom = function () {
                var data = $http.get('/umbraco/dff/dffapi/GetMarginValues?mode=margin-bottom');

                return data;
            }

        }]);























