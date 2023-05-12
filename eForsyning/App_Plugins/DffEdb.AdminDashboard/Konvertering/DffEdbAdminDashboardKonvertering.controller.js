angular.module("umbraco").controller("DffEdbAdminDashboardKonverteringController", function ($scope, $http) {
    var vm = this;
    vm.count = {};
    vm.processing = false;
    vm.error = false;
    vm.success = false;

    vm.visAntalNyeOgGamleEforsyninger = function visAntalNyeOgGamleEforsyninger() {
        $http.get("/umbraco/api/DffEdbAdminApi/GetCountNyGammelEForsyning").then(function (data) {
            vm.count = data.data;
        });
    };

    vm.konverterAlleSitesTilAngular8 = function konverterAlleSitesTilAngular8() {
        if (confirm("Ønsker du at konvertere alle E|Forsyninger til ny Angular 8+?")) {
            vm.udfoer("konverterAlleSitesTilAngular8", $http.post("/umbraco/api/DffEdbAdminApi/AktiverAngular8"));
        }
    };

    vm.konverterAlleSitesTilAngularJS = function konverterAlleSitesTilAngularJS() {
        if (confirm("Ønsker du at konvertere alle E|Forsyninger til gammel AngularJS 1.x?")) {
            vm.udfoer("konverterAlleSitesTilAngularJS", $http.post("/umbraco/api/DffEdbAdminApi/DeaktiverAngular8"));
        }
    };

    vm.tilfojWidgetPaaAlleVaerker = function brugDriftsstatusPaaAlleVaerker() {
        vm.udfoer("tilfojWidgetPaaAlleVaerker", $http.post("/umbraco/api/DffEdbAdminApi/TilfojWidgetPaaAlleVaerker"));
    };

    vm.aktiverKontaktoplysningKampagnerPaaAlleEforsyninger = function aktiverKontaktoplysningKampagnerPaaAlleEforsyninger() {
        vm.udfoer("aktiverKontaktoplysningKampagnerPaaAlleEforsyninger", $http.post("/umbraco/api/DffEdbAdminApi/aktiverKontaktoplysningKampagnerPaaAlleEforsyninger"))
    }

    vm.udfoer = function udfoer(opgavenavn, promise) {
        vm.error = false;
        vm.success = false;
        vm.processing = true;
        console.log("Starter: " + opgavenavn);
        try {
            promise.then(function () {
                console.log("Udført: " + opgavenavn);
                vm.processing = false;
                vm.success = true;
                vm.visAntalNyeOgGamleEforsyninger();
            }, function (error) {
                console.error("FEJL: " + opgavenavn, error);
                vm.processing = false;
                vm.error = true;
            });
        }
        catch (error) {
            console.log("FEJL: " + opgavenavn, error);
            vm.processing = false;
            vm.error = true;
        }
    };

    vm.visAntalNyeOgGamleEforsyninger();

});
