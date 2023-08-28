(function () {
  function iconPicker($scope, $http, editorService, assetsService) {
    assetsService.loadCss("/App_Plugins/NcIconPicker/assets/admin.css");

    $scope.openIconPicker = function () {
      $http.get('/dist/icons/icons.json')
        .then(function (res) {
          $scope.icons = res.data.icons;

          var options = {
            title: 'NC Icon Picker',
            view: '/App_Plugins/NcIconPicker/views/IconList.view.html',
            size: 'small',
            icons: res.data.icons,
            submit: function (data) {
              $scope.model.value = data;
              editorService.close();
            },
            close: function () {
              editorService.close();
            }
          };

          editorService.open(options);
        });
    };
  }

  angular.module("umbraco").controller("Novicell.IconPicker", iconPicker);
})();