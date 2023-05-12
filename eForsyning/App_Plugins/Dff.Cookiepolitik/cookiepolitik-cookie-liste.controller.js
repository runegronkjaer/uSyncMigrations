angular.module("umbraco")
    .controller("DffCookiepolitikCookieListeController", ["$scope", "$routeParams", "$filter", "dffCookieRepository",
        function ($scope, $routeParams, $filter, dffCookieRepository) {
            var vm = this;

            // Skjul overskriften på siden
            //$scope.model.hideLabel = true;
            hentCookies();

            function hentCookies() {
                dffCookieRepository.GetCookies($routeParams.id).then(function(data) {
                    vm.cookies = {
                        mandatory: [],
                        optional: []
                    };
                    data.forEach(function (cookie) {
                        cookie.scanTime = $filter("date")(cookie.scanTime, "dd-MM-yyyy HH:mm");
                        if (cookie.mandatory)
                            vm.cookies.mandatory.push(cookie);
                        else
                            vm.cookies.optional.push(cookie);
                    });
                });
            };
        }]);