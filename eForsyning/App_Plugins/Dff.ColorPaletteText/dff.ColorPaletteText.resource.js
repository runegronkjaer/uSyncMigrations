//adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('DffColorTextResource',
    function ($q, $http) {
    	//the factory object returned
    	return {
    		GetThemeColors: function (id) {
    			return $http.get('/umbraco/dff/dffapi/GetThemeTextColors?id=' + id);
    		}

    	};
    }
);