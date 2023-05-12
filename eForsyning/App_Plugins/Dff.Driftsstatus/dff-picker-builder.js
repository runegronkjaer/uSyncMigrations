angular.module("umbraco").factory("dffPickerBuilder",
    function() {
        const service = {
            buildTextPicker: buildTextPicker,
            buildTextareaPicker: buildTextareaPicker,
            buildBooleanPicker: buildBooleanPicker,
            buildDropdownPicker: buildDropdownPicker,
            buildDateTimePicker: buildDateTimePicker
        };
        return service;

        function buildTextPicker(overskrift, value) {
            return {
                label: overskrift,
                editor: "Umbraco.Textbox",
                view: "textbox",
                config: {
                },
                value: value
            };
        }

        function buildTextareaPicker(overskrift, value) {
            return {
                label: overskrift,
                editor: "Umbraco.Textarea",
                view: "rte",
                config: {
                    editor: {
                        toolbar: ["code", "bold", "italic", "bullist", "numlist", "link", "umbmediapicker", "fullscreen"],
                        dimensions: {
                            height: 300,
                            width: "100%"
                        }
                    }
                },
                value: value
            };
        }

        function buildBooleanPicker(overskrift, value) {
            return {
                label: overskrift,
                editor: "Umbraco.Boolean",
                view: "boolean",
                config: {
                },
                value: value
            };
        }

        function buildDropdownPicker(overskrift, value, items) {
            return {
                label: overskrift,
                editor: "Umbraco.Dropdown",
                view: "dropdown",
                config: {
                    items: items || []
                },
                value: value
            };
        }

        function buildDateTimePicker(overskrift, value) {
            return {
                label: overskrift,
                editor: "Umbraco.DateTime",
                view: "datepicker",
                config: {
                    pickDate: true,
                    pickTime: true,
                    useSeconds: false,
                    format: "DD-MM-YYYY HH:mm",
                    icons: {
                        time: "icon-time",
                        date: "icon-calendar",
                        up: "icon-chevron-up",
                        down: "icon-chevron-down"
                    }
                },
                value: value
            }
        }
    });