angular.module('umbraco').controller('TeaSolutions.PriceOverviewController', function ($scope, $http, $routeParams, assetsService, contentResource, notificationsService) {
  $scope.loading = false;


  $http.get('backoffice/tea/PriceOverview/GetPricesForCountryList').success(function (data) {
    //console.log(data);
    $scope.priceForCountryList = data;
  });

  $scope.getForCountry = function (id) {
    //console.log('click' + id);

    $http.get('backoffice/tea/PriceOverview/GetAllDestinationMonthOverview?id=' + id).success(function (data) {
      //console.log(data);
      $scope.destinations = data;
    });

    jQuery('.countries').hide();
    jQuery('.back').css('display', 'inline-block');
    jQuery('.destinations').show();
  };

  $scope.back = function () {
    jQuery('.back').hide();
    jQuery('.destinations').hide();
    jQuery('.countries').show();
  }
});