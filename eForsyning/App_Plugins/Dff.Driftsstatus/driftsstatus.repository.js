//adds the resource to umbraco.resources module:
angular.module("umbraco.resources").factory("dffDriftsstatusResource",
    function($q, $http) {
        //the factory object returned
        return {
            GetAlleDriftsstatus: function(nodeId) {
                return $http.get("/umbraco/dff/driftsstatusapi/hentalle?nodeid=" + nodeId).then(function(result) {
                    return result.data;
                });
            },

            PostDriftsstatus: function(nodeId, data) {
                return $http.post("/umbraco/dff/driftsstatusapi/gem?nodeid=" + nodeId, data).then(function(result) {
                    return result.data;
                });
            },

            AfslutDriftsstatus: function(nodeId, data) {
                return $http.post("/umbraco/dff/driftsstatusapi/markerafsluttet?nodeid=" + nodeId, data).then(
                    function(result) {
                        return result.data;
                    });
            },

            HentEforsyningSettingsForVaerk: function(nodeId) {
                return $http.get("/umbraco/dff/dffapi/HentEforsyningSettingsForVaerk?id=" + nodeId).then(
                    function (result) {
                        return result.data.map(function(setting) {
                            return angular.extend({},
                                setting,
                                {
                                    ForsyningId: setting.ForsyningId.toLowerCase()
                                });
                        });
                    });
            }
        }
    });