angular.module("umbraco")
    .controller("Dff.FormEditor.Elements.Controller", function ($scope) {

            $scope.model.hideSubmitButton = true;

            $scope.elements = [
                {
                    "Name": "Tekstfelt",
                    "Alias": "textstring",
                    "Icon": "icon-remove"
                },
                {
                    "Name": "Tekstboks",
                    "Alias": "textarea",
                    "Icon": "icon-list"
                },
                {
                    "Name": "Liste",
                    "Alias": "list",
                    "Icon": "icon-bulleted-list"
                },
                {
                    "Name": "Overskrift (tekst)",
                    "Alias": "headline",
                    "Icon": "icon-remove color-red"
                },
                {
                    "Name": "Tekst (tekst)",
                    "Alias": "text",
                    "Icon": "icon-list color-red"
                },
                {
                    "Name": "Kvitteringsmail",
                    "Alias": "kvitteringsmail",
                    "Icon": "icon-message",
                    "Required": true
                }
            ];


            $scope.selectItem = function (item) {
                //alert('nu' + item.Name);
                //$scope.newElement.Name = "Uden navn";
                $scope.model.value = item;
                $scope.model.submit($scope.model);
                
                $scope.model.controlToAdd = item.Name;
                $scope.model.show = false;
                
                //$scope.overlay.show = false;
                //$scope.overlay.title = "sfdsdsdf";
                //$scope.form.Unassigned.push($scope.element.Names);

            }

        });
