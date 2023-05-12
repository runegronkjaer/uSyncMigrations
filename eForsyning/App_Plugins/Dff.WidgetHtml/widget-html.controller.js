angular.module("umbraco")
    .controller("DffHtmlWidgetController", ["$scope", "$location", "$routeParams", "contentResource",
        function ($scope, $location, $routeParams, contentResource) {
            var vm = this;

            vm.url = $location.$$protocol + "://" + $location.$$host;
            vm.nodeId = $routeParams.id;
            vm.widgetSelector = null;

            if ($routeParams.section === "content") {
                contentResource.getById($routeParams.id).then(function(data) {
                    vm.widgetSelector = toTagName(data.contentTypeAlias);
                });
            }

            function toTagName(value)
            {
                return "dffedb-" + toKebabCase(removeWidgetPostfix(value));
            }

            function removeWidgetPostfix(value) {
                return value.toLowerCase().endsWith("widget") ? value.slice(0, -6) : value;
            }

            function toKebabCase(value)
            {
                return value.replace(/([A-Z])/g, "-$1").toLowerCase();
            }
        }]);