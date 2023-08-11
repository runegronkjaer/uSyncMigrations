//adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('DffFormTemplateResource',
    function ($q, $http) {
        //the factory object returned
        return {
            GetFormTemplates: function () {
                return $http.get('/umbraco/backoffice/dff/dffapi/getformtemplates');
            }

        };
    }
);