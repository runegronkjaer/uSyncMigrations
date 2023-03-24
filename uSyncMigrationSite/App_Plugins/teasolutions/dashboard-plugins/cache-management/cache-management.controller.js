angular.module('umbraco').controller('TeaSolutions.CacheManagementController', function ($scope, $http, $routeParams, assetsService, contentResource, notificationsService) {
  $scope.loading = false;


  $http.get('backoffice/tea/CacheManagement/GetLastClear').success(function (lastClear) {
    $scope.lastClear = JSON.parse(lastClear);
  });

  $scope.clearCache = function () {
    if (!$scope.loading) {
      $scope.loading = true;

      $http.get('backoffice/tea/CacheManagement/ClearCache').success(function (lastClear) {
        $scope.loading = false;
        $scope.lastClear = JSON.parse(lastClear);

        notificationsService.success("Success", "Cache has been cleared");
      });
    }
  }

  $http.get('backoffice/tea/DestinationsManagement/GetLastDestinationsUpdate').success(function (lastUpdated) {
    $scope.lastUpdated = JSON.parse(lastUpdated);
  });

  $scope.updateDestinations = function () {
    if (!$scope.loading) {
      $scope.loading = true;
      var now = new Date(Date.now())
      $scope.updateStarted = now.toTimeString();
      $http.get('backoffice/tea/DestinationsManagement/UpdateDestinations').success(function (lastUpdated) {
        $scope.loading = false;
        $scope.lastUpdated = JSON.parse(lastUpdated);

        notificationsService.success("Success", "Destinations has been updated");
      }).error(function () {
        $scope.loading = false;
        notificationsService.error("Error", "Error updating destinations");
      });
    }
  }
});