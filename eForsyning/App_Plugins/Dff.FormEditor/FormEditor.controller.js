angular.module("umbraco")
    .controller("Dff.FormEditor.Controller", function ($scope, overlayService) {

            if (!$scope.model.value) {
                $scope.model.value = {
                    Unassigned: [],
                    Rows: []
                };
            }

            $scope.rowDeleteState = false;

            $scope.test = JSON.stringify($scope.model.value.Rows);

            $scope.toogleState = function () {
                $scope.rowDeleteState = !$scope.rowDeleteState;
            }

            $scope.openAddFormElement = function () {
                var overlayFormElement = {
                    view: "/app_plugins/dff.formeditor/formEditor.elements.html",
                    show: false,
                    title: "Vælg formelement",
                    submit: function (model) {
                        console.log("Submit");
                        $scope.addElement(model.value);
                        overlayService.close();
                    },
                    close: function () {
                        console.log("Close");
                        overlayService.close();
                    },
                    hideSubmitButton: true,
                    position: 'right'
                }
                overlayService.open(overlayFormElement);
            }
            $scope.openSelectTemplate = function () {
                const overlayTemplate = {
                    view: "/app_plugins/dff.formeditor/formEditor.templates.html?4",
                    show: false,
                    title: "Vælg template",
                    submit: function (model) {
                        console.log("Submit");
                        $scope.addTemplate(model.value);
                        overlayService.close();
                    },
                    close: function () {
                        console.log("Close");
                        overlayService.close();
                    },
                    hideSubmitButton: true,
                    position: 'right'
                }
                overlayService.open(overlayTemplate);
                
            }
            



            $scope.model.hideLabel = true;

            $scope.fieldSortableOptions = getFieldSortableOptions();

            var emptyValue = '{ Value: ""}';

            $scope.addElement = function (element) {
                var newElement = {
                    Label: "",
                    Alias: guid(),
                    Help: "",
                    Rows: 10,
                    Type: element.Alias,
                    Required: element.Required || false,
                    ListType: 'dropdown',
                    Values: [eval('(' + emptyValue + ')')],
                    Edit: true,
                    Icon: element.Icon,
                    Name: element.Name
                };

                $scope.model.value.Unassigned.push(newElement);
            }

            $scope.addTemplate = function (template) {
                //alert(JSON.stringify($scope.model.value.Rows));
                //alert(template.FormJSON);
                if (confirm('Er du sikker på at du vil anvende denne template?')) {
                    $scope.model.value.Rows = $.parseJSON(template.FormJSON);
                    $scope.model.value.Unassigned = [];
                }
            }

            $scope.deleteRow = function (row) {
                if (confirm('Er du sikker på at du vil slette denne række?')) {
                    var index = $scope.model.value.Rows.indexOf(row);
                    $scope.model.value.Rows.splice(index, 1);
                }
            }

            $scope.deleteUnassignedElement = function (element) {
                if (confirm('Er du sikker på at du vil slette dette element?')) {
                    var index = $scope.model.value.Unassigned.indexOf(element);
                    $scope.model.value.Unassigned.splice(index, 1);
                }
            }

            $scope.deleteElement = function (el) {
                //alert(JSON.stringify($scope.model.value.Rows));
                if (confirm('Er du sikker på at du vil slette dette element?')) {
                    $scope.model.value.Rows.filter(function(r) {
                        return !!r;
                    }).forEach(function (row) {
                        row.Cells.forEach(function (cell) {
                            cell.Elements = cell.Elements.filter(function (x) { return x.Alias !== el.Alias; });
                        });
                    });
                    
                }
            }

            $scope.addRow = function (cols) {

                var span = 12;

                switch (cols) {
                    case 2:
                        span = 6;
                        break;
                    case 3:
                        span = 4;
                        break;
                    default:
                        span = 12;
                        break;
                }

                var row = {
                    Cells: []
                };

                for (i = 0; i < cols; i++) {
                    var cell = {
                        Columns: span,
                        Elements: []
                    };

                    row.Cells.push(cell);
                }

                $scope.model.value.Rows.push(row);
            }


            $scope.form =
                {
                "Unassigned": [{
                    "Label": "Navn x",
                    "Alias": "navnx",
                    "Help": "",
                    "Type": "textstring",
                    "Required": false,
                    "Values": null,
                    "Edit": false
                 },
                 {
                    "Label": "Navn y",
                    "Alias": "navny",
                    "Help": "",
                    "Type": "textstring",
                    "Required": false,
                    "Values": null,
                    "Edit": false
                    },
                {
                    "Label": "Navn z",
                    "Alias": "navnz",
                    "Help": "",
                    "Type": "textstring",
                    "Required": false,
                    "Values": null,
                    "Edit": false
                }],
                "Rows": [{
                    "Cells": [
                    {
                        "Columns": 6,
                        "Elements": [{
                            "Label": "Navn",
                            "Alias": "1234124234",
                            "Help": "",
                            "Type": "textstring",
                            "Required": false,
                            "Values": null,
                            "Edit": false
                        },
                        {
                            "Label": "Navn 2",
                            "Alias": "navn",
                            "Help": "",
                            "Type": "textstring",
                            "Required": false,
                            "Values": null,
                            "Edit": false
                        },
                        {
                            "Label": "Navn 3",
                            "Alias": "navn",
                            "Help": "",
                            "Type": "textstring",
                            "Required": false,
                            "Values": null,
                            "Edit": false
                        }]
                    }, {
                        "Columns": 6,
                        "Elements": [{
                            "Label": "Email",
                            "Alias": "email",
                            "Help": "",
                            "Type": "textstring",
                            "Required": false,
                            "Values": null,
                            "Edit": false
                        }]
                    }]
                    }, {
                        "Cells": [{
                            "Columns": 12,
                            "Elements": [{
                                "Label": "Adresse",
                                "Alias": "adresse",
                                "Help": "",
                                "Type": "textstring",
                                "Required": false,
                                "Values": null,
                                "Edit": false
                            }]
                        }]
                    }]
                };

            $scope.addValue = function (values, $index) {
                values.push(eval('(' + emptyValue + ')'));
            }

            //remove a link from the model
            $scope.removeValue = function (values, $index) {
                if (values.length > 1) {
                    if (confirm('Er du sikker på at du vil slette denne værdi?')) {
                        values.splice($index, 1);
                    }
                }
            }

            //defines the options for the jquery sortable    
            $scope.sortableOptions = {
                axis: 'y',
                cursor: "move",
                handle: ".handle",
                update: function (ev, ui) {

                },
                stop: function (ev, ui) {

                }
            };

        });


function getFieldSortableOptions() {
    return {
        cursor: "move",
        connectWith: ".formulate-cell",
        tolerance: "pointer",
        items: ".formulate-cell-field",
        opacity: 0.5
    };
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

