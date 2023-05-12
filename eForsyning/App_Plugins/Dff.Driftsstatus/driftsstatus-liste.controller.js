angular.module("umbraco")
    .controller("DffDriftsstatusController", ["$scope", "$routeParams", "$filter", "dffDriftsstatusResource", "dffPickerBuilder",
        function ($scope, $routeParams, $filter, dffDriftsstatusResource, dffPickerBuilder) {
            var vm = this;
            vm.openOverlay = openOverlay;
            vm.driftsstatusser = [];

            // Skjul overskriften på siden
            $scope.model.hideLabel = true;

            vm.gridTileProperties = getGridTileProperties();
            hentAktuelleDriftsstatusser();

            function getGridTileProperties() {
                return [
                    {
                        "alias": "formatFraDato",
                        "header": "Fra"
                    },
                    {
                        "alias": "formatTilDato",
                        "header": "Til."
                    },
                    {
                        "alias": "Besked",
                        "header": "Besked"
                    }
                ];
            }

            function openOverlay(item) {
                var title = item ? "Rediger driftsstatus" : "Opret driftsstatus";
                hentForsyningIdPickerValues().then(function (forsyningIdListe) {
                    var forsyningTypeListe = hentForsyningTypeListe();
                    var model = dtoToModel(item && item.driftsstatus, forsyningIdListe, forsyningTypeListe);
                    vm.overlay = {
                        view: "/app_plugins/dff.driftsstatus/driftsstatus-edit.html",
                        show: true,
                        title: title,
                        value: model,
                        submit: function (submittedModel) {
                            var dto = modelToDto(submittedModel.value);
                            dffDriftsstatusResource.PostDriftsstatus($routeParams.id, dto).then(function() {
                                hentAktuelleDriftsstatusser();
                                vm.overlay.show = false;
                                vm.overlay = null;
                            });
                        },
                        close: function (_, refresh) {
                            refresh && hentAktuelleDriftsstatusser();
                            vm.overlay.show = false;
                            vm.overlay = null;
                        }
                    };
                });
            };

            function dtoToModel(dto, forsyningIdListe, forsyningTypeListe) {
                var forsyningType = dto ? dto.Type : 1; //Default: Varme
                dto = dto || { Periode: {} };
                var forsyningId = dto.ForsyningId || forsyningIdListe.length === 1 && forsyningIdListe[0].id;
                var result = {
                    id: dto.Id,
                    forsyningId: dffPickerBuilder.buildDropdownPicker("Forsyningsid", forsyningId, forsyningIdListe),
                    fraDato: dffPickerBuilder.buildDateTimePicker("Gyldig fra", dto.Periode.FraDato),
                    tilDato: dffPickerBuilder.buildDateTimePicker("Gyldig til", dto.Periode.TilDato),
                    overskrift: dffPickerBuilder.buildTextPicker("Overskrift", dto.Overskrift),
                    besked: dffPickerBuilder.buildTextareaPicker("Besked", dto.Besked),
                    kritisk: dffPickerBuilder.buildBooleanPicker("Kritisk", dto.Kritisk ? "1" : "0"),
                    forsyningType: dffPickerBuilder.buildDropdownPicker("Forsyningstype", forsyningType, forsyningTypeListe)
                };
                return result;
            }

            function modelToDto(model) {
                var fraDato = parseDate(model.fraDato.value !== null ? model.fraDato.value : new Date().toISOString());
                var tilDato = parseDate(model.tilDato.value !== null ? model.tilDato.value : getNextDay(fraDato).toISOString());
                if (tilDato < fraDato) {
                    var tmpDate = tilDato;
                    tilDato = fraDato;
                    fraDato = tmpDate;
                }
                var result = {
                    Id: model.id,
                    ForsyningId: model.forsyningId.value,
                    Type: +model.forsyningType.value,
                    Periode: {
                        FraDato: fraDato,
                        TilDato: tilDato
                    },
                    Overskrift: model.overskrift.value,
                    Besked: model.besked.value,
                    Kritisk: !!+model.kritisk.value
                };
                return result;
            }

            function getNextDay(value) {
                var nextDay = new Date();
                nextDay.setDate(value.getDate() + 1);
                return nextDay;
            }

            function parseDate(value) {
                // Safari og andre browsere parser datoer forskelligt.
                // Safari accepterer ikke "2020-09-25 13:03:25". Det gør andre browsere.
                // Safari parser "2020-09-25T13:03:25" som UTC. Andre browsere parser som lokal-tid.
                // Vi vælger derfor selv at parse datoen vha. string.split()
                var s = (value || "").split(/[^0-9]/);
                return new Date(s[0], s[1] - 1, s[2], s[3], s[4], s[5]);
            }

            function hentAktuelleDriftsstatusser() {
                dffDriftsstatusResource.GetAlleDriftsstatus($routeParams.id).then(function(data) {
                    vm.driftsstatusser = [];
                    data.forEach(function (element) {
                        var erHistorisk = new Date(element.Periode.TilDato) <= new Date();
                        var icontype = erHistorisk
                            ? "icon-check"
                            : element.Kritisk
                            ? "icon-alert"
                            : "icon-info";
                        var driftsstatus = {
                            driftsstatus: element,
                            name: element.Overskrift,
                            icon: icontype,
                            selected: false,
                            Besked: String(element.Besked).replace(/<[^>]+>/gm, ""),
                            formatFraDato: $filter("date")(element.Periode.FraDato, "dd-MM-yyyy HH:mm"),
                            formatTilDato: $filter("date")(element.Periode.TilDato, "dd-MM-yyyy HH:mm")
                        }
                        vm.driftsstatusser.push(driftsstatus);
                    });
                });
            };

            function hentForsyningIdPickerValues() {
                return dffDriftsstatusResource.HentEforsyningSettingsForVaerk($routeParams.id).then(
                    function(settings) {
                        return settings.map(function(setting) {
                            return {
                                id: setting.ForsyningId,
                                value: setting.ForsyningsNavn
                            }
                        });
                    });
            }

            function hentForsyningTypeListe() {
                return [
                    {
                        id: 1,
                        value: "Varme"
                    },
                    {
                        id: 2,
                        value: "Vand"
                    },
                    {
                        id: 3,
                        value: "Andet"
                    }
                ];
            }
        }]);