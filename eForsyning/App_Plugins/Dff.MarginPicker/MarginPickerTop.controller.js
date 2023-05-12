angular.module("umbraco")
    .controller("Dff.MarginPickerTop.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService','$http',
        function ($scope, $routeParams, assetsService, notificationsService, $http) {

            $scope.GetMarginValuesTop = function () {
                var data = $http.get('/umbraco/dff/dffapi/GetMarginValues?mode=margin-top');

                return data;
            }

        }]);























