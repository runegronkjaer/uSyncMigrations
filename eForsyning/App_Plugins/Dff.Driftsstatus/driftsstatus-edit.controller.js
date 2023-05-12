angular.module("umbraco")
    .controller("DffDriftsstatusOverlayController",
        ["$scope", "$routeParams", "assetsService", "notificationsService", "dffDriftsstatusResource",
            function($scope, $routeParams, assetsService, notificationsService, dffDriftsstatusResource) {
                var vm = this;
                vm.afslutStatus = afslutStatus;

                function afslutStatus(model) {
                    var dto = {
                        Id: model.value.id
                    };
                    dffDriftsstatusResource.AfslutDriftsstatus($routeParams.id, dto).then(function() {
                        model.close(model, true);
                    });
                }
        }]);