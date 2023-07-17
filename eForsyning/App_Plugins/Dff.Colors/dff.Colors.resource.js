//adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('DffColorsResource',
    function ($q, $http) {
    	//the factory object returned
    	return {
    		GetThemeColors: function (id, addColors) {
          return $http.get('/umbraco/backoffice/dff/dffapi/GetThemeColors?id=' + id + '&addColors=' + addColors);
    		}

    	};
    }
);