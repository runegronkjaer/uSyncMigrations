angular.module("umbraco").controller("DffEdbAdminDashboardController", function ($scope, $http) {
    var vm = this;
    $http.get("/umbraco/api/DashboardApi/GetForsyningerMedSammeForsyningsId").
        then(
            function successCallback(response) {
            vm.forsyningerMedSammeId = response.data;
        },
        function errorCallback(response) {
            console.log("Unable to get GetForsyningerMedSammeForsyningsId");
        });

    $http.get("/umbraco/api/DashboardApi/GetForsyningerUdenForsyningsId").
        then(
            function successCallback(response) {
                vm.forsyningerUdenForsyningsId = response.data;
            },
            function errorCallback(response) {
                console.log("Unable to get GetForsyningerUdenForsyningsId");
        });

    $scope.KonverterNyhederTilFeed = function() {
        vm.KonverteringIgang = true;
        $http.get("/umbraco/api/KonverterApi/KonverterNyhederTilFeed").then(
            function successCallback(response) {
                vm.KonverteringFaerdig = true;
            });
    };
});
