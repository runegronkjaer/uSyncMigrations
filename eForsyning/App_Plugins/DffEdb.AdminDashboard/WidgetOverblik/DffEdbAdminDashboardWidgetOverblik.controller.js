angular.module("umbraco").controller("DffEdbAdminDashboardWidgetOverblikController", function ($scope, $http) {
    var vm = this;
    vm.widgets = [];
    vm.loader = false;
    vm.fetch = fetch;
    vm.fetchViaSql = fetchViaSql;
    vm.tid = "";
    vm.tidSql = "";

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function fetch() {
        vm.loader = true;
        var start = performance.now();
        $http.get("/umbraco/api/DashboardApi/GetWidgetUsage").then(function (result) {
            vm.loader = false;
            //vm.widgets = result.data;
            vm.widgets = result.data.map(w => ({
                ...w,
                Sites: w.Sites.map(s => ({
                    ...s,
                    PageNames: s.Pages.map(p => p.PageName).sort().filter(onlyUnique).join(", ")
                }))
            }));
            var slut = performance.now();
            vm.tid = Math.trunc(slut - start) + "ms";
        });
    }

    function fetchViaSql() {
        vm.loader = true;
        var start = performance.now();
        $http.get("/umbraco/api/DashboardApi/GetWidgetUsageViaSql").then(function (result) {
            vm.loader = false;
            //vm.widgets = result.data;
            vm.widgets = result.data.map(w => ({
                ...w,
                Sites: w.Sites.map(s => ({
                    ...s,
                    PageNames: s.Pages.map(p => p.PageName).sort().filter(onlyUnique).join(", ")
                }))
            }));
            var slut = performance.now();
            vm.tidSql = Math.trunc(slut - start) + "ms";
        });
    }

});
