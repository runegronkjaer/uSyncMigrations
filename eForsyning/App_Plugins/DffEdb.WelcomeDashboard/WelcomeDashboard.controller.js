angular.module("umbraco").controller("DffEdbWelcomeDashboardController", function ($scope, $http, assetsService, dashboardResource) {
    var vm = this;

    assetsService.loadCss(dashboardResource.getRemoteDashboardCssUrl('content'), $scope);

    $http.get("/umbraco/dff/dffapi/GetVelkomstNyhederNodeId").then(function (response) {
        return $http.get("/" + response.data);
    }).then(function (response) {
        vm.html = response.data;
    });
});
