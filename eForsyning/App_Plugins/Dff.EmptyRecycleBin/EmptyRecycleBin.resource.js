//adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('DffEmptyRecycleBinResource',
    function ($q, $http) {
        //the factory object returned
        return {
            EmptyRecycleBin: function (id) {
                return $http.get('/umbraco/dff/recyclebinapi/EmptyLocalRecycleBin?id=' + id);
            }

        };
    }
);