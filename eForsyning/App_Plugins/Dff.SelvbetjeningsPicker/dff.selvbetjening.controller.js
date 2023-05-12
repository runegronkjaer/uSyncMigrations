angular.module("umbraco")
    .controller("Dff.Selvbetjening.Controller", ['$scope', '$routeParams', 'assetsService', 'notificationsService', 'DffSelvbetjeningResource',
        function ($scope, $routeParams, assetsService, notificationsService, DffSelvbetjeningResource) {

            $scope.items = [];

            DffSelvbetjeningResource.GetSelfServiceItems($routeParams.id).success(function (data) {
                $scope.items = data;
            });
        }]);




