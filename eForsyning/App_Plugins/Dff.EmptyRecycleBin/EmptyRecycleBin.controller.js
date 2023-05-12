angular.module("umbraco")
    .controller("Dff.EmptyRecycleBin.Controller", ['$scope', '$routeParams', '$http', 'assetsService', 'notificationsService', 'DffEmptyRecycleBinResource', 'umbracoMenuActions',
        function ($scope, $routeParams, $http, assetsService, notificationsService, DffEmptyRecycleBinResource, navigationService, umbracoMenuActions ) {

            $scope.busy = false;

            $scope.onConfirm = function (e) {
                $scope.busy = true;
                //alert($scope.currentNode.id);
                DffEmptyRecycleBinResource.EmptyRecycleBin($scope.currentNode.id)
                    .success(function (response) {
                        //umbracoMenuActions.RefreshNode({ entity: { id: $scope.currentNode.id }, section: 'content', treeAlias: 'content' });

                        $scope.busy = false;
                        $scope.nav.hideDialog();
                        notificationsService.success("Skraldespanden er nu tom");
                    })
            }

            $scope.onCancel = function (e) {
                $scope.nav.hideDialog();
            }

        }]);

