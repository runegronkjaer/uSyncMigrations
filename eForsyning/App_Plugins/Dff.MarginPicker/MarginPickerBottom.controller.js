angular.module("umbraco")
    .controller("Dff.MarginPickerBottom.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService','$http',
        function ($scope, $routeParams, assetsService, notificationsService, $http) {

            $scope.GetMarginValuesBottom = function () {
                var data = $http.get('/umbraco/dff/dffapi/GetMarginValues?mode=margin-bottom');

                return data;
            }

        }]);























