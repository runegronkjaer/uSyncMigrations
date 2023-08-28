(function () {
  function iconPickerDialog($scope) {
    $scope.setIcon = function (icon) {
      if ($scope.model.submit) {
        $scope.model.submit(icon);
      }
    }

    $scope.close = function () {
      if ($scope.model.close) {
        $scope.model.close();
      }
    }
  }

  angular.module("umbraco").controller("Novicell.IconPickerDialog", iconPickerDialog);
})();