//adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('DffFormResource',
    function ($q, $http) {
        //the factory object returned
        return {
            GetFormData: function () {
                return null; //$http.get('/umbraco/dff/dffapi/getformdata');
            }

        };
    }
);