//adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('DffSelvbetjeningResource',
    function ($q, $http) {
    	//the factory object returned
    	return {
            GetSelfServiceItems: function (id) {
                return $http.get('/umbraco/dff/dffapi/GetSelfServiceItems?id=' + id);
    		}

    	};
    }
);