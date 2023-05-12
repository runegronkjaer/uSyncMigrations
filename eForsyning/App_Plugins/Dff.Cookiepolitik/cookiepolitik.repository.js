angular.module("umbraco.resources").factory("dffCookieRepository",
    function ($http) {
        return {
            GetCookies: function (nodeId) {
                return $http.get("/umbraco/dff/cookiescanner/GetCookieUmbracoViewModels?nodeid=" + nodeId).then(function (result) {
                    return result.data;
                });
            }
        }
    });