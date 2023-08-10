﻿(function() {
    "use strict";

    var DffMultiUrlPickerController = function($scope, angularHelper, entityResource, iconHelper, editorService) {

        this.renderModel = [];

        if ($scope.preview) {
            return;
        }

        if (!Array.isArray($scope.model.value)) {
            $scope.model.value = [];
        }


        $scope.model.value.forEach(function(link) {
            link.icon = iconHelper.convertFromLegacyIcon(link.icon);
            this.renderModel.push(link);
        }.bind(this));

        $scope.$on("formSubmitting",
            function() {
                $scope.model.value = this.renderModel;
            }.bind(this));

        $scope.$watch(function() {
                return this.renderModel.length;
            }.bind(this),
            function() {
                if ($scope.model.config && $scope.model.config.minNumberOfItems) {
                    $scope.multiUrlPickerForm.minCount.$setValidity("minCount",
                        +$scope.model.config.minNumberOfItems <= this.renderModel.length);
                }
                if ($scope.model.config && $scope.model.config.maxNumberOfItems) {
                    $scope.multiUrlPickerForm.maxCount.$setValidity("maxCount",
                        +$scope.model.config.maxNumberOfItems >= this.renderModel.length);
                }
                this.sortableOptions.disabled = this.renderModel.length === 1;
            }.bind(this));

        this.sortableOptions = {
            distance: 10,
            tolerance: "pointer",
            scroll: true,
            zIndex: 6000,
            update: function() {
                angularHelper.getCurrentForm($scope).$setDirty();
            }
        };

        this.remove = function($index) {
            this.renderModel.splice($index, 1);

            angularHelper.getCurrentForm($scope).$setDirty();
        };

      this.openLinkPicker = function (link, $index) {
            var target = link
                ? {
                    name: link.name,
                    // the linkPicker breaks if it get an id or udi for media
                    id: link.isMedia ? null : link.id,
                    udi: link.isMedia ? null : link.udi,
                    url: link.url,
                    target: link.target,
                    description: link.description,
                    userIcon: link.userIcon,
                    image: link.image ?? {
                        id: "",
                        udi: "",
                        isMedia: "",
                        name: "",
                        url: ""
                    }
                }
                : null;

            this.linkPickerOverlay = {
                //view: '/app_plugins/dff.linkpicker/linkpicker.overlay.html',
                view: "/app_plugins/dff.linkpicker/linkpicker.overlay.html?11",
                currentTarget: target,
                size: 'small',
                submit: function(model) {
                    model.target.image = model.mediaPickerModel.value[0];
                    if (model.target.url) {
                        if (link) {
                            if (link.isMedia && link.url === model.target.url) {
                                // we can assume the existing media item is changed and no new file has been selected
                                // so we don't need to update the id, udi and isMedia fields
                            } else {
                                link.id = model.target.id;
                                link.udi = model.target.udi;
                                link.isMedia = model.target.isMedia;
                                link.description = model.target.description;
                                link.userIcon = model.target.userIcon;

                            }

                            link.name = model.target.name || model.target.url;
                            link.target = model.target.target;
                            link.url = model.target.url;
                            link.image = model.target.image;
                        } else {
                            link = {
                                id: model.target.id,
                                isMedia: model.target.isMedia,
                                name: model.target.name || model.target.url,
                                target: model.target.target,
                                udi: model.target.udi,
                                url: model.target.url,
                                description: model.target.description,
                                userIcon: model.target.userIcon,
                                image: model.target.image
                            };
                            this.renderModel.push(link);
                        }

                        if (link.udi) {
                            var entityType = link.isMedia ? "media" : "document";

                            entityResource.getById(link.udi, entityType)
                                .then(function(data) {
                                    link.icon = iconHelper.convertFromLegacyIcon(data.icon);
                                    link.published =
                                        !(data.metaData &&
                                            data.metaData.IsPublished === false &&
                                            entityType === "document");
                                });
                        } else {
                            link.published = true;
                            link.icon = "icon-link";
                        }

                        angularHelper.getCurrentForm($scope).$setDirty();
                    }
                    
                    this.linkPickerOverlay.show = false;
                    this.linkPickerOverlay = null;
                    editorService.close();
                }.bind(this),
                close: function() {
                    this.linkPickerOverlay.show = false;
                    this.linkPickerOverlay = null;
                    editorService.close();
                }.bind(this)
            };
            
          editorService.open(this.linkPickerOverlay);
        };
    };

    angular.module("umbraco")
        .controller("Dff.MultiUrlPickerController", DffMultiUrlPickerController);


    angular.module("umbraco").controller("Dff.Overlays.LinkPickerController",
        function($scope,
            eventsService,
            entityResource,
            contentResource,
            userService,
            localizationService,
            treeService,
            editorService) {
            var dialogOptions = $scope.model;

            $scope.treeInit = () => {
                
                $scope.dialogTreeApi.callbacks.treeNodeSelect((data) => {
                    console.log('yay?', data);
                });
                $scope.dialogTreeApi.callbacks.treeNodeSelect((data) => nodeSelectHandler(null, data));

                $scope.dialogTreeApi.callbacks.treeLoaded(treeLoadedHandler);
            };

            // this ensures that we only sync the tree once and only when it's ready
            var oneTimeTreeSync = {
                executed: false,
                treeReady: false,
                sync: function () {
                    // don't run this if:
                    // - it was already run once
                    // - the tree isn't ready yet
                    // - the model path hasn't been loaded yet
                    if (this.executed || !this.treeReady || !($scope.model.target && $scope.model.target.path)) {
                        return;
                    }

                    this.executed = true;
                    // sync the tree to the model path
                    $scope.dialogTreeApi.syncTree({
                        path: $scope.model.target.path,
                        tree: "content"
                    });
                }
            };
            function treeLoadedHandler(args) {
                oneTimeTreeSync.treeReady = true;
                oneTimeTreeSync.sync();
            }
            
            $scope.dialogTreeApi = {};
            
            var searchText = "Search...";
            localizationService.localize("general_search").then(function(value) {
                searchText = value + "...";
            });

            if (!$scope.model.title) {
                localizationService.localize("defaultdialogs_selectLink").then((data) => {
                    $scope.model.title = data;
                });
            }
            $scope.dialogTreeEventHandler = $({});
            $scope.model.target = {};
            $scope.model.target.image = {};
            $scope.searchInfo = {
                searchFromId: null,
                searchFromName: null,
                showSearch: false,
                results: [],
                selectedSearchResults: []
            };

            $scope.treeNode = undefined;
            
            if (dialogOptions.currentTarget) {
                $scope.model.target = dialogOptions.currentTarget;

                //if we have a node ID, we fetch the current node to build the form data
                if ($scope.model.target.id || $scope.model.target.udi) {

                    //will be either a udi or an int
                    var id = $scope.model.target.udi ? $scope.model.target.udi : $scope.model.target.id;

                    if (!$scope.model.target.path) {

                        entityResource.getPath(id, "Document").then(function(path) {
                            $scope.model.target.path = path;
                        });
                    }

                    contentResource.getNiceUrl(id).then(function(url) {
                        $scope.model.target.url = url;
                    });
                }
            }

            function nodeSelectHandler(ev, args) {

                if (args && args.event) {
                    args.event.preventDefault();
                    args.event.stopPropagation();
                }

                eventsService.emit("dialogs.linkPicker.select", args);

                if ($scope.currentNode) {
                    //un-select if there's a current one selected
                    $scope.currentNode.selected = false;
                }

                $scope.currentNode = args.node;
                $scope.currentNode.selected = true;
                $scope.model.target.id = args.node.id;
                $scope.model.target.udi = args.node.udi;
                $scope.model.target.name = args.node.name;

                if (args.node.id < 0) {
                    $scope.model.target.url = "/";
                } else {
                    contentResource.getNiceUrl(args.node.id).then(function(url) {
                        $scope.model.target.url = url;
                    });
                }

                if (!angular.isUndefined($scope.model.target.isMedia)) {
                    delete $scope.model.target.isMedia;
                }
            }

            function nodeExpandedHandler(ev, args) {
                // open mini list view for list views
                if (args.node.metaData.isContainer) {
                    openMiniListView(args.node);
                }
            }
            
            $scope.model.mediaPickerModel = {
                value: $scope.model.target.image.key ? [$scope.model.target.image] : [], // or your value
                config: {
                    disableFolderSelect: true,
                    onlyImages: true,
                    multiple: false,
                    validationLimit: {
                        min: null,
                        max: 1
                    }
                }
            };


            $scope.switchToMediaPicker = function() {
                userService.getCurrentUser().then(function(userData) {
                    $scope.mediaPickerOverlay = {
                        startNodeId: userData.startMediaId,
                        disableFolderSelect: true,
                        onlyImages: true,
                        submit: function(model) {
                            var media = model.selection[0];

                            $scope.model.target.id = media.id;
                            $scope.model.target.udi = media.udi;
                            $scope.model.target.isMedia = true;
                            $scope.model.target.name = media.name;
                            $scope.model.target.url = media.image; 

                            $scope.mediaPickerOverlay.show = false;
                            $scope.mediaPickerOverlay = null;
                            editorService.close();
                        },
                        close: function() {
                            editorService.close();
                        }
                    };
                    editorService.mediaPicker($scope.mediaPickerOverlay);
                });
            };


            $scope.hideSearch = function() {
                $scope.searchInfo.showSearch = false;
                $scope.searchInfo.searchFromId = null;
                $scope.searchInfo.searchFromName = null;
                $scope.searchInfo.results = [];
            };

            // method to select a search result
            $scope.selectResult = function(evt, result) {
                result.selected = result.selected === true ? false : true;
                nodeSelectHandler(evt, { event: evt, node: result });
            };

            //callback when there are search results
            $scope.onSearchResults = function(results) {
                $scope.searchInfo.results = results;
                $scope.searchInfo.showSearch = true;
            };

            $scope.dialogTreeEventHandler.bind("treeNodeSelect", nodeSelectHandler);
            $scope.dialogTreeEventHandler.bind("treeNodeExpanded", nodeExpandedHandler);

            $scope.$on("$destroy",
                function() {
                    $scope.dialogTreeEventHandler.unbind("treeNodeSelect", nodeSelectHandler);
                    $scope.dialogTreeEventHandler.unbind("treeNodeExpanded", nodeExpandedHandler);
                });

            // Mini list view
            $scope.selectListViewNode = function(node) {
                node.selected = node.selected === true ? false : true;
                nodeSelectHandler({}, { node: node });
            };

            $scope.closeMiniListView = function() {
                $scope.miniListView = undefined;
            };

            function openMiniListView(node) {
                $scope.miniListView = node;
            }


            $scope.icons = [
                { value: "fa-500px", label: "&#xf26e; 500Px" },
                { value: "fa-adjust", label: "&#xf042; Adjust" },
                { value: "fa-adn", label: "&#xf170; Adn" },
                { value: "fa-align-center", label: "&#xf037; Align-Center" },
                { value: "fa-align-justify", label: "&#xf039; Align-Justify" },
                { value: "fa-align-left", label: "&#xf036; Align-Left" },
                { value: "fa-align-right", label: "&#xf038; Align-Right" },
                { value: "fa-amazon", label: "&#xf270; Amazon" },
                { value: "fa-ambulance", label: "&#xf0f9; Ambulance" },
                {
                    value: "fa-american-sign-language-interpreting",
                    label: "&#xf2a3; American-Sign-Language-Interpreting"
                },
                { value: "fa-anchor", label: "&#xf13d; Anchor" },
                { value: "fa-android", label: "&#xf17b; Android" },
                { value: "fa-angellist", label: "&#xf209; Angellist" },
                { value: "fa-angle-double-down", label: "&#xf103; Angle-Double-Down" },
                { value: "fa-angle-double-left", label: "&#xf100; Angle-Double-Left" },
                { value: "fa-angle-double-right", label: "&#xf101; Angle-Double-Right" },
                { value: "fa-angle-double-up", label: "&#xf102; Angle-Double-Up" },
                { value: "fa-angle-down", label: "&#xf107; Angle-Down" },
                { value: "fa-angle-left", label: "&#xf104; Angle-Left" },
                { value: "fa-angle-right", label: "&#xf105; Angle-Right" },
                { value: "fa-angle-up", label: "&#xf106; Angle-Up" },
                { value: "fa-apple", label: "&#xf179; Apple" },
                { value: "fa-archive", label: "&#xf187; Archive" },
                { value: "fa-area-chart", label: "&#xf1fe; Area-Chart" },
                { value: "fa-arrow-circle-down", label: "&#xf0ab; Arrow-Circle-Down" },
                { value: "fa-arrow-circle-left", label: "&#xf0a8; Arrow-Circle-Left" },
                { value: "fa-arrow-circle-o-down", label: "&#xf01a; Arrow-Circle-O-Down" },
                { value: "fa-arrow-circle-o-left", label: "&#xf190; Arrow-Circle-O-Left" },
                { value: "fa-arrow-circle-o-right", label: "&#xf18e; Arrow-Circle-O-Right" },
                { value: "fa-arrow-circle-o-up", label: "&#xf01b; Arrow-Circle-O-Up" },
                { value: "fa-arrow-circle-right", label: "&#xf0a9; Arrow-Circle-Right" },
                { value: "fa-arrow-circle-up", label: "&#xf0aa; Arrow-Circle-Up" },
                { value: "fa-arrow-down", label: "&#xf063; Arrow-Down" },
                { value: "fa-arrow-left", label: "&#xf060; Arrow-Left" },
                { value: "fa-arrow-right", label: "&#xf061; Arrow-Right" },
                { value: "fa-arrow-up", label: "&#xf062; Arrow-Up" },
                { value: "fa-arrows", label: "&#xf047; Arrows" },
                { value: "fa-arrows-alt", label: "&#xf0b2; Arrows-Alt" },
                { value: "fa-arrows-h", label: "&#xf07e; Arrows-H" },
                { value: "fa-arrows-v", label: "&#xf07d; Arrows-V" },
                { value: "fa-asl-interpreting", label: "&#xf2a3; Asl-Interpreting" },
                { value: "fa-assistive-listening-systems", label: "&#xf2a2; Assistive-Listening-Systems" },
                { value: "fa-asterisk", label: "&#xf069; Asterisk" },
                { value: "fa-at", label: "&#xf1fa; At" },
                { value: "fa-audio-description", label: "&#xf29e; Audio-Description" },
                { value: "fa-automobile", label: "&#xf1b9; Automobile" },
                { value: "fa-backward", label: "&#xf04a; Backward" },
                { value: "fa-balance-scale", label: "&#xf24e; Balance-Scale" },
                { value: "fa-ban", label: "&#xf05e; Ban" },
                { value: "fa-bank", label: "&#xf19c; Bank" },
                { value: "fa-bar-chart", label: "&#xf080; Bar-Chart" },
                { value: "fa-bar-chart-o", label: "&#xf080; Bar-Chart-O" },
                { value: "fa-barcode", label: "&#xf02a; Barcode" },
                { value: "fa-bars", label: "&#xf0c9; Bars" },
                { value: "fa-battery-0", label: "&#xf244; Battery-0" },
                { value: "fa-battery-1", label: "&#xf243; Battery-1" },
                { value: "fa-battery-2", label: "&#xf242; Battery-2" },
                { value: "fa-battery-3", label: "&#xf241; Battery-3" },
                { value: "fa-battery-4", label: "&#xf240; Battery-4" },
                { value: "fa-battery-empty", label: "&#xf244; Battery-Empty" },
                { value: "fa-battery-full", label: "&#xf240; Battery-Full" },
                { value: "fa-battery-half", label: "&#xf242; Battery-Half" },
                { value: "fa-battery-quarter", label: "&#xf243; Battery-Quarter" },
                { value: "fa-battery-three-quarters", label: "&#xf241; Battery-Three-Quarters" },
                { value: "fa-bed", label: "&#xf236; Bed" },
                { value: "fa-beer", label: "&#xf0fc; Beer" },
                { value: "fa-behance", label: "&#xf1b4; Behance" },
                { value: "fa-behance-square", label: "&#xf1b5; Behance-Square" },
                { value: "fa-bell", label: "&#xf0f3; Bell" },
                { value: "fa-bell-o", label: "&#xf0a2; Bell-O" },
                { value: "fa-bell-slash", label: "&#xf1f6; Bell-Slash" },
                { value: "fa-bell-slash-o", label: "&#xf1f7; Bell-Slash-O" },
                { value: "fa-bicycle", label: "&#xf206; Bicycle" },
                { value: "fa-binoculars", label: "&#xf1e5; Binoculars" },
                { value: "fa-birthday-cake", label: "&#xf1fd; Birthday-Cake" },
                { value: "fa-bitbucket", label: "&#xf171; Bitbucket" },
                { value: "fa-bitbucket-square", label: "&#xf172; Bitbucket-Square" },
                { value: "fa-bitcoin", label: "&#xf15a; Bitcoin" },
                { value: "fa-black-tie", label: "&#xf27e; Black-Tie" },
                { value: "fa-blind", label: "&#xf29d; Blind" },
                { value: "fa-bluetooth", label: "&#xf293; Bluetooth" },
                { value: "fa-bluetooth-b", label: "&#xf294; Bluetooth-B" },
                { value: "fa-bold", label: "&#xf032; Bold" },
                { value: "fa-bolt", label: "&#xf0e7; Bolt" },
                { value: "fa-bomb", label: "&#xf1e2; Bomb" },
                { value: "fa-book", label: "&#xf02d; Book" },
                { value: "fa-bookmark", label: "&#xf02e; Bookmark" },
                { value: "fa-bookmark-o", label: "&#xf097; Bookmark-O" },
                { value: "fa-braille", label: "&#xf2a1; Braille" },
                { value: "fa-briefcase", label: "&#xf0b1; Briefcase" },
                { value: "fa-btc", label: "&#xf15a; Btc" },
                { value: "fa-bug", label: "&#xf188; Bug" },
                { value: "fa-building", label: "&#xf1ad; Building" },
                { value: "fa-building-o", label: "&#xf0f7; Building-O" },
                { value: "fa-bullhorn", label: "&#xf0a1; Bullhorn" },
                { value: "fa-bullseye", label: "&#xf140; Bullseye" },
                { value: "fa-bus", label: "&#xf207; Bus" },
                { value: "fa-buysellads", label: "&#xf20d; Buysellads" },
                { value: "fa-cab", label: "&#xf1ba; Cab" },
                { value: "fa-calculator", label: "&#xf1ec; Calculator" },
                { value: "fa-calendar", label: "&#xf073; Calendar" },
                { value: "fa-calendar-check-o", label: "&#xf274; Calendar-Check-O" },
                { value: "fa-calendar-minus-o", label: "&#xf272; Calendar-Minus-O" },
                { value: "fa-calendar-o", label: "&#xf133; Calendar-O" },
                { value: "fa-calendar-plus-o", label: "&#xf271; Calendar-Plus-O" },
                { value: "fa-calendar-times-o", label: "&#xf273; Calendar-Times-O" },
                { value: "fa-camera", label: "&#xf030; Camera" },
                { value: "fa-camera-retro", label: "&#xf083; Camera-Retro" },
                { value: "fa-car", label: "&#xf1b9; Car" },
                { value: "fa-caret-down", label: "&#xf0d7; Caret-Down" },
                { value: "fa-caret-left", label: "&#xf0d9; Caret-Left" },
                { value: "fa-caret-right", label: "&#xf0da; Caret-Right" },
                { value: "fa-caret-square-o-down", label: "&#xf150; Caret-Square-O-Down" },
                { value: "fa-caret-square-o-left", label: "&#xf191; Caret-Square-O-Left" },
                { value: "fa-caret-square-o-right", label: "&#xf152; Caret-Square-O-Right" },
                { value: "fa-caret-square-o-up", label: "&#xf151; Caret-Square-O-Up" },
                { value: "fa-caret-up", label: "&#xf0d8; Caret-Up" },
                { value: "fa-cart-arrow-down", label: "&#xf218; Cart-Arrow-Down" },
                { value: "fa-cart-plus", label: "&#xf217; Cart-Plus" },
                { value: "fa-cc", label: "&#xf20a; Cc" },
                { value: "fa-cc-amex", label: "&#xf1f3; Cc-Amex" },
                { value: "fa-cc-diners-club", label: "&#xf24c; Cc-Diners-Club" },
                { value: "fa-cc-discover", label: "&#xf1f2; Cc-Discover" },
                { value: "fa-cc-jcb", label: "&#xf24b; Cc-Jcb" },
                { value: "fa-cc-mastercard", label: "&#xf1f1; Cc-Mastercard" },
                { value: "fa-cc-paypal", label: "&#xf1f4; Cc-Paypal" },
                { value: "fa-cc-stripe", label: "&#xf1f5; Cc-Stripe" },
                { value: "fa-cc-visa", label: "&#xf1f0; Cc-Visa" },
                { value: "fa-certificate", label: "&#xf0a3; Certificate" },
                { value: "fa-chain", label: "&#xf0c1; Chain" },
                { value: "fa-chain-broken", label: "&#xf127; Chain-Broken" },
                { value: "fa-check", label: "&#xf00c; Check" },
                { value: "fa-check-circle", label: "&#xf058; Check-Circle" },
                { value: "fa-check-circle-o", label: "&#xf05d; Check-Circle-O" },
                { value: "fa-check-square", label: "&#xf14a; Check-Square" },
                { value: "fa-check-square-o", label: "&#xf046; Check-Square-O" },
                { value: "fa-chevron-circle-down", label: "&#xf13a; Chevron-Circle-Down" },
                { value: "fa-chevron-circle-left", label: "&#xf137; Chevron-Circle-Left" },
                { value: "fa-chevron-circle-right", label: "&#xf138; Chevron-Circle-Right" },
                { value: "fa-chevron-circle-up", label: "&#xf139; Chevron-Circle-Up" },
                { value: "fa-chevron-down", label: "&#xf078; Chevron-Down" },
                { value: "fa-chevron-left", label: "&#xf053; Chevron-Left" },
                { value: "fa-chevron-right", label: "&#xf054; Chevron-Right" },
                { value: "fa-chevron-up", label: "&#xf077; Chevron-Up" },
                { value: "fa-child", label: "&#xf1ae; Child" },
                { value: "fa-chrome", label: "&#xf268; Chrome" },
                { value: "fa-circle", label: "&#xf111; Circle" },
                { value: "fa-circle-o", label: "&#xf10c; Circle-O" },
                { value: "fa-circle-o-notch", label: "&#xf1ce; Circle-O-Notch" },
                { value: "fa-circle-thin", label: "&#xf1db; Circle-Thin" },
                { value: "fa-clipboard", label: "&#xf0ea; Clipboard" },
                { value: "fa-clock-o", label: "&#xf017; Clock-O" },
                { value: "fa-clone", label: "&#xf24d; Clone" },
                { value: "fa-close", label: "&#xf00d; Close" },
                { value: "fa-cloud", label: "&#xf0c2; Cloud" },
                { value: "fa-cloud-download", label: "&#xf0ed; Cloud-Download" },
                { value: "fa-cloud-upload", label: "&#xf0ee; Cloud-Upload" },
                { value: "fa-cny", label: "&#xf157; Cny" },
                { value: "fa-code", label: "&#xf121; Code" },
                { value: "fa-code-fork", label: "&#xf126; Code-Fork" },
                { value: "fa-codepen", label: "&#xf1cb; Codepen" },
                { value: "fa-codiepie", label: "&#xf284; Codiepie" },
                { value: "fa-coffee", label: "&#xf0f4; Coffee" },
                { value: "fa-cog", label: "&#xf013; Cog" },
                { value: "fa-cogs", label: "&#xf085; Cogs" },
                { value: "fa-columns", label: "&#xf0db; Columns" },
                { value: "fa-comment", label: "&#xf075; Comment" },
                { value: "fa-comment-o", label: "&#xf0e5; Comment-O" },
                { value: "fa-commenting", label: "&#xf27a; Commenting" },
                { value: "fa-commenting-o", label: "&#xf27b; Commenting-O" },
                { value: "fa-comments", label: "&#xf086; Comments" },
                { value: "fa-comments-o", label: "&#xf0e6; Comments-O" },
                { value: "fa-compass", label: "&#xf14e; Compass" },
                { value: "fa-compress", label: "&#xf066; Compress" },
                { value: "fa-connectdevelop", label: "&#xf20e; Connectdevelop" },
                { value: "fa-contao", label: "&#xf26d; Contao" },
                { value: "fa-copy", label: "&#xf0c5; Copy" },
                { value: "fa-copyright", label: "&#xf1f9; Copyright" },
                { value: "fa-creative-commons", label: "&#xf25e; Creative-Commons" },
                { value: "fa-credit-card", label: "&#xf09d; Credit-Card" },
                { value: "fa-credit-card-alt", label: "&#xf283; Credit-Card-Alt" },
                { value: "fa-crop", label: "&#xf125; Crop" },
                { value: "fa-crosshairs", label: "&#xf05b; Crosshairs" },
                { value: "fa-css3", label: "&#xf13c; Css3" },
                { value: "fa-cube", label: "&#xf1b2; Cube" },
                { value: "fa-cubes", label: "&#xf1b3; Cubes" },
                { value: "fa-cut", label: "&#xf0c4; Cut" },
                { value: "fa-cutlery", label: "&#xf0f5; Cutlery" },
                { value: "fa-dashboard", label: "&#xf0e4; Dashboard" },
                { value: "fa-dashcube", label: "&#xf210; Dashcube" },
                { value: "fa-database", label: "&#xf1c0; Database" },
                { value: "fa-deaf", label: "&#xf2a4; Deaf" },
                { value: "fa-deafness", label: "&#xf2a4; Deafness" },
                { value: "fa-dedent", label: "&#xf03b; Dedent" },
                { value: "fa-delicious", label: "&#xf1a5; Delicious" },
                { value: "fa-desktop", label: "&#xf108; Desktop" },
                { value: "fa-deviantart", label: "&#xf1bd; Deviantart" },
                { value: "fa-diamond", label: "&#xf219; Diamond" },
                { value: "fa-digg", label: "&#xf1a6; Digg" },
                { value: "fa-dollar", label: "&#xf155; Dollar" },
                { value: "fa-dot-circle-o", label: "&#xf192; Dot-Circle-O" },
                { value: "fa-download", label: "&#xf019; Download" },
                { value: "fa-dribbble", label: "&#xf17d; Dribbble" },
                { value: "fa-dropbox", label: "&#xf16b; Dropbox" },
                { value: "fa-drupal", label: "&#xf1a9; Drupal" },
                { value: "fa-edge", label: "&#xf282; Edge" },
                { value: "fa-edit", label: "&#xf044; Edit" },
                { value: "fa-eject", label: "&#xf052; Eject" },
                { value: "fa-ellipsis-h", label: "&#xf141; Ellipsis-H" },
                { value: "fa-ellipsis-v", label: "&#xf142; Ellipsis-V" },
                { value: "fa-empire", label: "&#xf1d1; Empire" },
                { value: "fa-envelope", label: "&#xf0e0; Envelope" },
                { value: "fa-envelope-o", label: "&#xf003; Envelope-O" },
                { value: "fa-envelope-square", label: "&#xf199; Envelope-Square" },
                { value: "fa-envira", label: "&#xf299; Envira" },
                { value: "fa-eraser", label: "&#xf12d; Eraser" },
                { value: "fa-eur", label: "&#xf153; Eur" },
                { value: "fa-euro", label: "&#xf153; Euro" },
                { value: "fa-exchange", label: "&#xf0ec; Exchange" },
                { value: "fa-exclamation", label: "&#xf12a; Exclamation" },
                { value: "fa-exclamation-circle", label: "&#xf06a; Exclamation-Circle" },
                { value: "fa-exclamation-triangle", label: "&#xf071; Exclamation-Triangle" },
                { value: "fa-expand", label: "&#xf065; Expand" },
                { value: "fa-expeditedssl", label: "&#xf23e; Expeditedssl" },
                { value: "fa-external-link", label: "&#xf08e; External-Link" },
                { value: "fa-external-link-square", label: "&#xf14c; External-Link-Square" },
                { value: "fa-eye", label: "&#xf06e; Eye" },
                { value: "fa-eye-slash", label: "&#xf070; Eye-Slash" },
                { value: "fa-eyedropper", label: "&#xf1fb; Eyedropper" },
                { value: "fa-fa", label: "&#xf2b4; Fa" },
                { value: "fa-facebook", label: "&#xf09a; Facebook" },
                { value: "fa-facebook-f", label: "&#xf09a; Facebook-F" },
                { value: "fa-facebook-official", label: "&#xf230; Facebook-Official" },
                { value: "fa-facebook-square", label: "&#xf082; Facebook-Square" },
                { value: "fa-fast-backward", label: "&#xf049; Fast-Backward" },
                { value: "fa-fast-forward", label: "&#xf050; Fast-Forward" },
                { value: "fa-fax", label: "&#xf1ac; Fax" },
                { value: "fa-feed", label: "&#xf09e; Feed" },
                { value: "fa-female", label: "&#xf182; Female" },
                { value: "fa-fighter-jet", label: "&#xf0fb; Fighter-Jet" },
                { value: "fa-file", label: "&#xf15b; File" },
                { value: "fa-file-archive-o", label: "&#xf1c6; File-Archive-O" },
                { value: "fa-file-audio-o", label: "&#xf1c7; File-Audio-O" },
                { value: "fa-file-code-o", label: "&#xf1c9; File-Code-O" },
                { value: "fa-file-excel-o", label: "&#xf1c3; File-Excel-O" },
                { value: "fa-file-image-o", label: "&#xf1c5; File-Image-O" },
                { value: "fa-file-movie-o", label: "&#xf1c8; File-Movie-O" },
                { value: "fa-file-o", label: "&#xf016; File-O" },
                { value: "fa-file-pdf-o", label: "&#xf1c1; File-Pdf-O" },
                { value: "fa-file-photo-o", label: "&#xf1c5; File-Photo-O" },
                { value: "fa-file-picture-o", label: "&#xf1c5; File-Picture-O" },
                { value: "fa-file-powerpoint-o", label: "&#xf1c4; File-Powerpoint-O" },
                { value: "fa-file-sound-o", label: "&#xf1c7; File-Sound-O" },
                { value: "fa-file-text", label: "&#xf15c; File-Text" },
                { value: "fa-file-text-o", label: "&#xf0f6; File-Text-O" },
                { value: "fa-file-video-o", label: "&#xf1c8; File-Video-O" },
                { value: "fa-file-word-o", label: "&#xf1c2; File-Word-O" },
                { value: "fa-file-zip-o", label: "&#xf1c6; File-Zip-O" },
                { value: "fa-files-o", label: "&#xf0c5; Files-O" },
                { value: "fa-film", label: "&#xf008; Film" },
                { value: "fa-filter", label: "&#xf0b0; Filter" },
                { value: "fa-fire", label: "&#xf06d; Fire" },
                { value: "fa-fire-extinguisher", label: "&#xf134; Fire-Extinguisher" },
                { value: "fa-firefox", label: "&#xf269; Firefox" },
                { value: "fa-first-order", label: "&#xf2b0; First-Order" },
                { value: "fa-flag", label: "&#xf024; Flag" },
                { value: "fa-flag-checkered", label: "&#xf11e; Flag-Checkered" },
                { value: "fa-flag-o", label: "&#xf11d; Flag-O" },
                { value: "fa-flash", label: "&#xf0e7; Flash" },
                { value: "fa-flask", label: "&#xf0c3; Flask" },
                { value: "fa-flickr", label: "&#xf16e; Flickr" },
                { value: "fa-floppy-o", label: "&#xf0c7; Floppy-O" },
                { value: "fa-folder", label: "&#xf07b; Folder" },
                { value: "fa-folder-o", label: "&#xf114; Folder-O" },
                { value: "fa-folder-open", label: "&#xf07c; Folder-Open" },
                { value: "fa-folder-open-o", label: "&#xf115; Folder-Open-O" },
                { value: "fa-font", label: "&#xf031; Font" },
                { value: "fa-font-awesome", label: "&#xf2b4; Font-Awesome" },
                { value: "fa-fonticons", label: "&#xf280; Fonticons" },
                { value: "fa-fort-awesome", label: "&#xf286; Fort-Awesome" },
                { value: "fa-forumbee", label: "&#xf211; Forumbee" },
                { value: "fa-forward", label: "&#xf04e; Forward" },
                { value: "fa-foursquare", label: "&#xf180; Foursquare" },
                { value: "fa-frown-o", label: "&#xf119; Frown-O" },
                { value: "fa-futbol-o", label: "&#xf1e3; Futbol-O" },
                { value: "fa-gamepad", label: "&#xf11b; Gamepad" },
                { value: "fa-gavel", label: "&#xf0e3; Gavel" },
                { value: "fa-gbp", label: "&#xf154; Gbp" },
                { value: "fa-ge", label: "&#xf1d1; Ge" },
                { value: "fa-gear", label: "&#xf013; Gear" },
                { value: "fa-gears", label: "&#xf085; Gears" },
                { value: "fa-genderless", label: "&#xf22d; Genderless" },
                { value: "fa-get-pocket", label: "&#xf265; Get-Pocket" },
                { value: "fa-gg", label: "&#xf260; Gg" },
                { value: "fa-gg-circle", label: "&#xf261; Gg-Circle" },
                { value: "fa-gift", label: "&#xf06b; Gift" },
                { value: "fa-git", label: "&#xf1d3; Git" },
                { value: "fa-git-square", label: "&#xf1d2; Git-Square" },
                { value: "fa-github", label: "&#xf09b; Github" },
                { value: "fa-github-alt", label: "&#xf113; Github-Alt" },
                { value: "fa-github-square", label: "&#xf092; Github-Square" },
                { value: "fa-gitlab", label: "&#xf296; Gitlab" },
                { value: "fa-gittip", label: "&#xf184; Gittip" },
                { value: "fa-glass", label: "&#xf000; Glass" },
                { value: "fa-glide", label: "&#xf2a5; Glide" },
                { value: "fa-glide-g", label: "&#xf2a6; Glide-G" },
                { value: "fa-globe", label: "&#xf0ac; Globe" },
                { value: "fa-google", label: "&#xf1a0; Google" },
                { value: "fa-google-plus", label: "&#xf0d5; Google-Plus" },
                { value: "fa-google-plus-circle", label: "&#xf2b3; Google-Plus-Circle" },
                { value: "fa-google-plus-official", label: "&#xf2b3; Google-Plus-Official" },
                { value: "fa-google-plus-square", label: "&#xf0d4; Google-Plus-Square" },
                { value: "fa-google-wallet", label: "&#xf1ee; Google-Wallet" },
                { value: "fa-graduation-cap", label: "&#xf19d; Graduation-Cap" },
                { value: "fa-gratipay", label: "&#xf184; Gratipay" },
                { value: "fa-group", label: "&#xf0c0; Group" },
                { value: "fa-h-square", label: "&#xf0fd; H-Square" },
                { value: "fa-hacker-news", label: "&#xf1d4; Hacker-News" },
                { value: "fa-hand-grab-o", label: "&#xf255; Hand-Grab-O" },
                { value: "fa-hand-lizard-o", label: "&#xf258; Hand-Lizard-O" },
                { value: "fa-hand-o-down", label: "&#xf0a7; Hand-O-Down" },
                { value: "fa-hand-o-left", label: "&#xf0a5; Hand-O-Left" },
                { value: "fa-hand-o-right", label: "&#xf0a4; Hand-O-Right" },
                { value: "fa-hand-o-up", label: "&#xf0a6; Hand-O-Up" },
                { value: "fa-hand-paper-o", label: "&#xf256; Hand-Paper-O" },
                { value: "fa-hand-peace-o", label: "&#xf25b; Hand-Peace-O" },
                { value: "fa-hand-pointer-o", label: "&#xf25a; Hand-Pointer-O" },
                { value: "fa-hand-rock-o", label: "&#xf255; Hand-Rock-O" },
                { value: "fa-hand-scissors-o", label: "&#xf257; Hand-Scissors-O" },
                { value: "fa-hand-spock-o", label: "&#xf259; Hand-Spock-O" },
                { value: "fa-hand-stop-o", label: "&#xf256; Hand-Stop-O" },
                { value: "fa-hard-of-hearing", label: "&#xf2a4; Hard-Of-Hearing" },
                { value: "fa-hashtag", label: "&#xf292; Hashtag" },
                { value: "fa-hdd-o", label: "&#xf0a0; Hdd-O" },
                { value: "fa-header", label: "&#xf1dc; Header" },
                { value: "fa-headphones", label: "&#xf025; Headphones" },
                { value: "fa-heart", label: "&#xf004; Heart" },
                { value: "fa-heart-o", label: "&#xf08a; Heart-O" },
                { value: "fa-heartbeat", label: "&#xf21e; Heartbeat" },
                { value: "fa-history", label: "&#xf1da; History" },
                { value: "fa-home", label: "&#xf015; Home" },
                { value: "fa-hospital-o", label: "&#xf0f8; Hospital-O" },
                { value: "fa-hotel", label: "&#xf236; Hotel" },
                { value: "fa-hourglass", label: "&#xf254; Hourglass" },
                { value: "fa-hourglass-1", label: "&#xf251; Hourglass-1" },
                { value: "fa-hourglass-2", label: "&#xf252; Hourglass-2" },
                { value: "fa-hourglass-3", label: "&#xf253; Hourglass-3" },
                { value: "fa-hourglass-end", label: "&#xf253; Hourglass-End" },
                { value: "fa-hourglass-half", label: "&#xf252; Hourglass-Half" },
                { value: "fa-hourglass-o", label: "&#xf250; Hourglass-O" },
                { value: "fa-hourglass-start", label: "&#xf251; Hourglass-Start" },
                { value: "fa-houzz", label: "&#xf27c; Houzz" },
                { value: "fa-html5", label: "&#xf13b; Html5" },
                { value: "fa-i-cursor", label: "&#xf246; I-Cursor" },
                { value: "fa-ils", label: "&#xf20b; Ils" },
                { value: "fa-image", label: "&#xf03e; Image" },
                { value: "fa-inbox", label: "&#xf01c; Inbox" },
                { value: "fa-indent", label: "&#xf03c; Indent" },
                { value: "fa-industry", label: "&#xf275; Industry" },
                { value: "fa-info", label: "&#xf129; Info" },
                { value: "fa-info-circle", label: "&#xf05a; Info-Circle" },
                { value: "fa-inr", label: "&#xf156; Inr" },
                { value: "fa-instagram", label: "&#xf16d; Instagram" },
                { value: "fa-institution", label: "&#xf19c; Institution" },
                { value: "fa-internet-explorer", label: "&#xf26b; Internet-Explorer" },
                { value: "fa-intersex", label: "&#xf224; Intersex" },
                { value: "fa-ioxhost", label: "&#xf208; Ioxhost" },
                { value: "fa-italic", label: "&#xf033; Italic" },
                { value: "fa-joomla", label: "&#xf1aa; Joomla" },
                { value: "fa-jpy", label: "&#xf157; Jpy" },
                { value: "fa-jsfiddle", label: "&#xf1cc; Jsfiddle" },
                { value: "fa-key", label: "&#xf084; Key" },
                { value: "fa-keyboard-o", label: "&#xf11c; Keyboard-O" },
                { value: "fa-krw", label: "&#xf159; Krw" },
                { value: "fa-language", label: "&#xf1ab; Language" },
                { value: "fa-laptop", label: "&#xf109; Laptop" },
                { value: "fa-lastfm", label: "&#xf202; Lastfm" },
                { value: "fa-lastfm-square", label: "&#xf203; Lastfm-Square" },
                { value: "fa-leaf", label: "&#xf06c; Leaf" },
                { value: "fa-leanpub", label: "&#xf212; Leanpub" },
                { value: "fa-legal", label: "&#xf0e3; Legal" },
                { value: "fa-lemon-o", label: "&#xf094; Lemon-O" },
                { value: "fa-level-down", label: "&#xf149; Level-Down" },
                { value: "fa-level-up", label: "&#xf148; Level-Up" },
                { value: "fa-life-bouy", label: "&#xf1cd; Life-Bouy" },
                { value: "fa-life-buoy", label: "&#xf1cd; Life-Buoy" },
                { value: "fa-life-ring", label: "&#xf1cd; Life-Ring" },
                { value: "fa-life-saver", label: "&#xf1cd; Life-Saver" },
                { value: "fa-lightbulb-o", label: "&#xf0eb; Lightbulb-O" },
                { value: "fa-line-chart", label: "&#xf201; Line-Chart" },
                { value: "fa-link", label: "&#xf0c1; Link" },
                { value: "fa-linkedin", label: "&#xf0e1; Linkedin" },
                { value: "fa-linkedin-square", label: "&#xf08c; Linkedin-Square" },
                { value: "fa-linux", label: "&#xf17c; Linux" },
                { value: "fa-list", label: "&#xf03a; List" },
                { value: "fa-list-alt", label: "&#xf022; List-Alt" },
                { value: "fa-list-ol", label: "&#xf0cb; List-Ol" },
                { value: "fa-list-ul", label: "&#xf0ca; List-Ul" },
                { value: "fa-location-arrow", label: "&#xf124; Location-Arrow" },
                { value: "fa-lock", label: "&#xf023; Lock" },
                { value: "fa-long-arrow-down", label: "&#xf175; Long-Arrow-Down" },
                { value: "fa-long-arrow-left", label: "&#xf177; Long-Arrow-Left" },
                { value: "fa-long-arrow-right", label: "&#xf178; Long-Arrow-Right" },
                { value: "fa-long-arrow-up", label: "&#xf176; Long-Arrow-Up" },
                { value: "fa-low-vision", label: "&#xf2a8; Low-Vision" },
                { value: "fa-magic", label: "&#xf0d0; Magic" },
                { value: "fa-magnet", label: "&#xf076; Magnet" },
                { value: "fa-mail-forward", label: "&#xf064; Mail-Forward" },
                { value: "fa-mail-reply", label: "&#xf112; Mail-Reply" },
                { value: "fa-mail-reply-all", label: "&#xf122; Mail-Reply-All" },
                { value: "fa-male", label: "&#xf183; Male" },
                { value: "fa-map", label: "&#xf279; Map" },
                { value: "fa-map-marker", label: "&#xf041; Map-Marker" },
                { value: "fa-map-o", label: "&#xf278; Map-O" },
                { value: "fa-map-pin", label: "&#xf276; Map-Pin" },
                { value: "fa-map-signs", label: "&#xf277; Map-Signs" },
                { value: "fa-mars", label: "&#xf222; Mars" },
                { value: "fa-mars-double", label: "&#xf227; Mars-Double" },
                { value: "fa-mars-stroke", label: "&#xf229; Mars-Stroke" },
                { value: "fa-mars-stroke-h", label: "&#xf22b; Mars-Stroke-H" },
                { value: "fa-mars-stroke-v", label: "&#xf22a; Mars-Stroke-V" },
                { value: "fa-maxcdn", label: "&#xf136; Maxcdn" },
                { value: "fa-meanpath", label: "&#xf20c; Meanpath" },
                { value: "fa-medium", label: "&#xf23a; Medium" },
                { value: "fa-medkit", label: "&#xf0fa; Medkit" },
                { value: "fa-meh-o", label: "&#xf11a; Meh-O" },
                { value: "fa-mercury", label: "&#xf223; Mercury" },
                { value: "fa-microphone", label: "&#xf130; Microphone" },
                { value: "fa-microphone-slash", label: "&#xf131; Microphone-Slash" },
                { value: "fa-minus", label: "&#xf068; Minus" },
                { value: "fa-minus-circle", label: "&#xf056; Minus-Circle" },
                { value: "fa-minus-square", label: "&#xf146; Minus-Square" },
                { value: "fa-minus-square-o", label: "&#xf147; Minus-Square-O" },
                { value: "fa-mixcloud", label: "&#xf289; Mixcloud" },
                { value: "fa-mobile", label: "&#xf10b; Mobile" },
                { value: "fa-mobile-phone", label: "&#xf10b; Mobile-Phone" },
                { value: "fa-modx", label: "&#xf285; Modx" },
                { value: "fa-money", label: "&#xf0d6; Money" },
                { value: "fa-moon-o", label: "&#xf186; Moon-O" },
                { value: "fa-mortar-board", label: "&#xf19d; Mortar-Board" },
                { value: "fa-motorcycle", label: "&#xf21c; Motorcycle" },
                { value: "fa-mouse-pointer", label: "&#xf245; Mouse-Pointer" },
                { value: "fa-music", label: "&#xf001; Music" },
                { value: "fa-navicon", label: "&#xf0c9; Navicon" },
                { value: "fa-neuter", label: "&#xf22c; Neuter" },
                { value: "fa-newspaper-o", label: "&#xf1ea; Newspaper-O" },
                { value: "fa-object-group", label: "&#xf247; Object-Group" },
                { value: "fa-object-ungroup", label: "&#xf248; Object-Ungroup" },
                { value: "fa-odnoklassniki", label: "&#xf263; Odnoklassniki" },
                { value: "fa-odnoklassniki-square", label: "&#xf264; Odnoklassniki-Square" },
                { value: "fa-opencart", label: "&#xf23d; Opencart" },
                { value: "fa-openid", label: "&#xf19b; Openid" },
                { value: "fa-opera", label: "&#xf26a; Opera" },
                { value: "fa-optin-monster", label: "&#xf23c; Optin-Monster" },
                { value: "fa-outdent", label: "&#xf03b; Outdent" },
                { value: "fa-pagelines", label: "&#xf18c; Pagelines" },
                { value: "fa-paint-brush", label: "&#xf1fc; Paint-Brush" },
                { value: "fa-paper-plane", label: "&#xf1d8; Paper-Plane" },
                { value: "fa-paper-plane-o", label: "&#xf1d9; Paper-Plane-O" },
                { value: "fa-paperclip", label: "&#xf0c6; Paperclip" },
                { value: "fa-paragraph", label: "&#xf1dd; Paragraph" },
                { value: "fa-paste", label: "&#xf0ea; Paste" },
                { value: "fa-pause", label: "&#xf04c; Pause" },
                { value: "fa-pause-circle", label: "&#xf28b; Pause-Circle" },
                { value: "fa-pause-circle-o", label: "&#xf28c; Pause-Circle-O" },
                { value: "fa-paw", label: "&#xf1b0; Paw" },
                { value: "fa-paypal", label: "&#xf1ed; Paypal" },
                { value: "fa-pencil", label: "&#xf040; Pencil" },
                { value: "fa-pencil-square", label: "&#xf14b; Pencil-Square" },
                { value: "fa-pencil-square-o", label: "&#xf044; Pencil-Square-O" },
                { value: "fa-percent", label: "&#xf295; Percent" },
                { value: "fa-phone", label: "&#xf095; Phone" },
                { value: "fa-phone-square", label: "&#xf098; Phone-Square" },
                { value: "fa-photo", label: "&#xf03e; Photo" },
                { value: "fa-picture-o", label: "&#xf03e; Picture-O" },
                { value: "fa-pie-chart", label: "&#xf200; Pie-Chart" },
                { value: "fa-pied-piper", label: "&#xf2ae; Pied-Piper" },
                { value: "fa-pied-piper-alt", label: "&#xf1a8; Pied-Piper-Alt" },
                { value: "fa-pied-piper-pp", label: "&#xf1a7; Pied-Piper-Pp" },
                { value: "fa-pinterest", label: "&#xf0d2; Pinterest" },
                { value: "fa-pinterest-p", label: "&#xf231; Pinterest-P" },
                { value: "fa-pinterest-square", label: "&#xf0d3; Pinterest-Square" },
                { value: "fa-plane", label: "&#xf072; Plane" },
                { value: "fa-play", label: "&#xf04b; Play" },
                { value: "fa-play-circle", label: "&#xf144; Play-Circle" },
                { value: "fa-play-circle-o", label: "&#xf01d; Play-Circle-O" },
                { value: "fa-plug", label: "&#xf1e6; Plug" },
                { value: "fa-plus", label: "&#xf067; Plus" },
                { value: "fa-plus-circle", label: "&#xf055; Plus-Circle" },
                { value: "fa-plus-square", label: "&#xf0fe; Plus-Square" },
                { value: "fa-plus-square-o", label: "&#xf196; Plus-Square-O" },
                { value: "fa-power-off", label: "&#xf011; Power-Off" },
                { value: "fa-print", label: "&#xf02f; Print" },
                { value: "fa-product-hunt", label: "&#xf288; Product-Hunt" },
                { value: "fa-puzzle-piece", label: "&#xf12e; Puzzle-Piece" },
                { value: "fa-qq", label: "&#xf1d6; Qq" },
                { value: "fa-qrcode", label: "&#xf029; Qrcode" },
                { value: "fa-question", label: "&#xf128; Question" },
                { value: "fa-question-circle", label: "&#xf059; Question-Circle" },
                { value: "fa-question-circle-o", label: "&#xf29c; Question-Circle-O" },
                { value: "fa-quote-left", label: "&#xf10d; Quote-Left" },
                { value: "fa-quote-right", label: "&#xf10e; Quote-Right" },
                { value: "fa-ra", label: "&#xf1d0; Ra" },
                { value: "fa-random", label: "&#xf074; Random" },
                { value: "fa-rebel", label: "&#xf1d0; Rebel" },
                { value: "fa-recycle", label: "&#xf1b8; Recycle" },
                { value: "fa-reddit", label: "&#xf1a1; Reddit" },
                { value: "fa-reddit-alien", label: "&#xf281; Reddit-Alien" },
                { value: "fa-reddit-square", label: "&#xf1a2; Reddit-Square" },
                { value: "fa-refresh", label: "&#xf021; Refresh" },
                { value: "fa-registered", label: "&#xf25d; Registered" },
                { value: "fa-remove", label: "&#xf00d; Remove" },
                { value: "fa-renren", label: "&#xf18b; Renren" },
                { value: "fa-reorder", label: "&#xf0c9; Reorder" },
                { value: "fa-repeat", label: "&#xf01e; Repeat" },
                { value: "fa-reply", label: "&#xf112; Reply" },
                { value: "fa-reply-all", label: "&#xf122; Reply-All" },
                { value: "fa-resistance", label: "&#xf1d0; Resistance" },
                { value: "fa-retweet", label: "&#xf079; Retweet" },
                { value: "fa-rmb", label: "&#xf157; Rmb" },
                { value: "fa-road", label: "&#xf018; Road" },
                { value: "fa-rocket", label: "&#xf135; Rocket" },
                { value: "fa-rotate-left", label: "&#xf0e2; Rotate-Left" },
                { value: "fa-rotate-right", label: "&#xf01e; Rotate-Right" },
                { value: "fa-rouble", label: "&#xf158; Rouble" },
                { value: "fa-rss", label: "&#xf09e; Rss" },
                { value: "fa-rss-square", label: "&#xf143; Rss-Square" },
                { value: "fa-rub", label: "&#xf158; Rub" },
                { value: "fa-ruble", label: "&#xf158; Ruble" },
                { value: "fa-rupee", label: "&#xf156; Rupee" },
                { value: "fa-safari", label: "&#xf267; Safari" },
                { value: "fa-save", label: "&#xf0c7; Save" },
                { value: "fa-scissors", label: "&#xf0c4; Scissors" },
                { value: "fa-scribd", label: "&#xf28a; Scribd" },
                { value: "fa-search", label: "&#xf002; Search" },
                { value: "fa-search-minus", label: "&#xf010; Search-Minus" },
                { value: "fa-search-plus", label: "&#xf00e; Search-Plus" },
                { value: "fa-sellsy", label: "&#xf213; Sellsy" },
                { value: "fa-send", label: "&#xf1d8; Send" },
                { value: "fa-send-o", label: "&#xf1d9; Send-O" },
                { value: "fa-server", label: "&#xf233; Server" },
                { value: "fa-share", label: "&#xf064; Share" },
                { value: "fa-share-alt", label: "&#xf1e0; Share-Alt" },
                { value: "fa-share-alt-square", label: "&#xf1e1; Share-Alt-Square" },
                { value: "fa-share-square", label: "&#xf14d; Share-Square" },
                { value: "fa-share-square-o", label: "&#xf045; Share-Square-O" },
                { value: "fa-shekel", label: "&#xf20b; Shekel" },
                { value: "fa-sheqel", label: "&#xf20b; Sheqel" },
                { value: "fa-shield", label: "&#xf132; Shield" },
                { value: "fa-ship", label: "&#xf21a; Ship" },
                { value: "fa-shirtsinbulk", label: "&#xf214; Shirtsinbulk" },
                { value: "fa-shopping-bag", label: "&#xf290; Shopping-Bag" },
                { value: "fa-shopping-basket", label: "&#xf291; Shopping-Basket" },
                { value: "fa-shopping-cart", label: "&#xf07a; Shopping-Cart" },
                { value: "fa-sign-in", label: "&#xf090; Sign-In" },
                { value: "fa-sign-language", label: "&#xf2a7; Sign-Language" },
                { value: "fa-sign-out", label: "&#xf08b; Sign-Out" },
                { value: "fa-signal", label: "&#xf012; Signal" },
                { value: "fa-signing", label: "&#xf2a7; Signing" },
                { value: "fa-simplybuilt", label: "&#xf215; Simplybuilt" },
                { value: "fa-sitemap", label: "&#xf0e8; Sitemap" },
                { value: "fa-skyatlas", label: "&#xf216; Skyatlas" },
                { value: "fa-skype", label: "&#xf17e; Skype" },
                { value: "fa-slack", label: "&#xf198; Slack" },
                { value: "fa-sliders", label: "&#xf1de; Sliders" },
                { value: "fa-slideshare", label: "&#xf1e7; Slideshare" },
                { value: "fa-smile-o", label: "&#xf118; Smile-O" },
                { value: "fa-snapchat", label: "&#xf2ab; Snapchat" },
                { value: "fa-snapchat-ghost", label: "&#xf2ac; Snapchat-Ghost" },
                { value: "fa-snapchat-square", label: "&#xf2ad; Snapchat-Square" },
                { value: "fa-soccer-ball-o", label: "&#xf1e3; Soccer-Ball-O" },
                { value: "fa-sort", label: "&#xf0dc; Sort" },
                { value: "fa-sort-alpha-asc", label: "&#xf15d; Sort-Alpha-Asc" },
                { value: "fa-sort-alpha-desc", label: "&#xf15e; Sort-Alpha-Desc" },
                { value: "fa-sort-amount-asc", label: "&#xf160; Sort-Amount-Asc" },
                { value: "fa-sort-amount-desc", label: "&#xf161; Sort-Amount-Desc" },
                { value: "fa-sort-asc", label: "&#xf0de; Sort-Asc" },
                { value: "fa-sort-desc", label: "&#xf0dd; Sort-Desc" },
                { value: "fa-sort-down", label: "&#xf0dd; Sort-Down" },
                { value: "fa-sort-numeric-asc", label: "&#xf162; Sort-Numeric-Asc" },
                { value: "fa-sort-numeric-desc", label: "&#xf163; Sort-Numeric-Desc" },
                { value: "fa-sort-up", label: "&#xf0de; Sort-Up" },
                { value: "fa-soundcloud", label: "&#xf1be; Soundcloud" },
                { value: "fa-space-shuttle", label: "&#xf197; Space-Shuttle" },
                { value: "fa-spinner", label: "&#xf110; Spinner" },
                { value: "fa-spoon", label: "&#xf1b1; Spoon" },
                { value: "fa-spotify", label: "&#xf1bc; Spotify" },
                { value: "fa-square", label: "&#xf0c8; Square" },
                { value: "fa-square-o", label: "&#xf096; Square-O" },
                { value: "fa-stack-exchange", label: "&#xf18d; Stack-Exchange" },
                { value: "fa-stack-overflow", label: "&#xf16c; Stack-Overflow" },
                { value: "fa-star", label: "&#xf005; Star" },
                { value: "fa-star-half", label: "&#xf089; Star-Half" },
                { value: "fa-star-half-empty", label: "&#xf123; Star-Half-Empty" },
                { value: "fa-star-half-full", label: "&#xf123; Star-Half-Full" },
                { value: "fa-star-half-o", label: "&#xf123; Star-Half-O" },
                { value: "fa-star-o", label: "&#xf006; Star-O" },
                { value: "fa-steam", label: "&#xf1b6; Steam" },
                { value: "fa-steam-square", label: "&#xf1b7; Steam-Square" },
                { value: "fa-step-backward", label: "&#xf048; Step-Backward" },
                { value: "fa-step-forward", label: "&#xf051; Step-Forward" },
                { value: "fa-stethoscope", label: "&#xf0f1; Stethoscope" },
                { value: "fa-sticky-note", label: "&#xf249; Sticky-Note" },
                { value: "fa-sticky-note-o", label: "&#xf24a; Sticky-Note-O" },
                { value: "fa-stop", label: "&#xf04d; Stop" },
                { value: "fa-stop-circle", label: "&#xf28d; Stop-Circle" },
                { value: "fa-stop-circle-o", label: "&#xf28e; Stop-Circle-O" },
                { value: "fa-street-view", label: "&#xf21d; Street-View" },
                { value: "fa-strikethrough", label: "&#xf0cc; Strikethrough" },
                { value: "fa-stumbleupon", label: "&#xf1a4; Stumbleupon" },
                { value: "fa-stumbleupon-circle", label: "&#xf1a3; Stumbleupon-Circle" },
                { value: "fa-subscript", label: "&#xf12c; Subscript" },
                { value: "fa-subway", label: "&#xf239; Subway" },
                { value: "fa-suitcase", label: "&#xf0f2; Suitcase" },
                { value: "fa-sun-o", label: "&#xf185; Sun-O" },
                { value: "fa-superscript", label: "&#xf12b; Superscript" },
                { value: "fa-support", label: "&#xf1cd; Support" },
                { value: "fa-table", label: "&#xf0ce; Table" },
                { value: "fa-tablet", label: "&#xf10a; Tablet" },
                { value: "fa-tachometer", label: "&#xf0e4; Tachometer" },
                { value: "fa-tag", label: "&#xf02b; Tag" },
                { value: "fa-tags", label: "&#xf02c; Tags" },
                { value: "fa-tasks", label: "&#xf0ae; Tasks" },
                { value: "fa-taxi", label: "&#xf1ba; Taxi" },
                { value: "fa-television", label: "&#xf26c; Television" },
                { value: "fa-tencent-weibo", label: "&#xf1d5; Tencent-Weibo" },
                { value: "fa-terminal", label: "&#xf120; Terminal" },
                { value: "fa-text-height", label: "&#xf034; Text-Height" },
                { value: "fa-text-width", label: "&#xf035; Text-Width" },
                { value: "fa-th", label: "&#xf00a; Th" },
                { value: "fa-th-large", label: "&#xf009; Th-Large" },
                { value: "fa-th-list", label: "&#xf00b; Th-List" },
                { value: "fa-themeisle", label: "&#xf2b2; Themeisle" },
                { value: "fa-thumb-tack", label: "&#xf08d; Thumb-Tack" },
                { value: "fa-thumbs-down", label: "&#xf165; Thumbs-Down" },
                { value: "fa-thumbs-o-down", label: "&#xf088; Thumbs-O-Down" },
                { value: "fa-thumbs-o-up", label: "&#xf087; Thumbs-O-Up" },
                { value: "fa-thumbs-up", label: "&#xf164; Thumbs-Up" },
                { value: "fa-ticket", label: "&#xf145; Ticket" },
                { value: "fa-times", label: "&#xf00d; Times" },
                { value: "fa-times-circle", label: "&#xf057; Times-Circle" },
                { value: "fa-times-circle-o", label: "&#xf05c; Times-Circle-O" },
                { value: "fa-tint", label: "&#xf043; Tint" },
                { value: "fa-toggle-down", label: "&#xf150; Toggle-Down" },
                { value: "fa-toggle-left", label: "&#xf191; Toggle-Left" },
                { value: "fa-toggle-off", label: "&#xf204; Toggle-Off" },
                { value: "fa-toggle-on", label: "&#xf205; Toggle-On" },
                { value: "fa-toggle-right", label: "&#xf152; Toggle-Right" },
                { value: "fa-toggle-up", label: "&#xf151; Toggle-Up" },
                { value: "fa-trademark", label: "&#xf25c; Trademark" },
                { value: "fa-train", label: "&#xf238; Train" },
                { value: "fa-transgender", label: "&#xf224; Transgender" },
                { value: "fa-transgender-alt", label: "&#xf225; Transgender-Alt" },
                { value: "fa-trash", label: "&#xf1f8; Trash" },
                { value: "fa-trash-o", label: "&#xf014; Trash-O" },
                { value: "fa-tree", label: "&#xf1bb; Tree" },
                { value: "fa-trello", label: "&#xf181; Trello" },
                { value: "fa-tripadvisor", label: "&#xf262; Tripadvisor" },
                { value: "fa-trophy", label: "&#xf091; Trophy" },
                { value: "fa-truck", label: "&#xf0d1; Truck" },
                { value: "fa-try", label: "&#xf195; Try" },
                { value: "fa-tty", label: "&#xf1e4; Tty" },
                { value: "fa-tumblr", label: "&#xf173; Tumblr" },
                { value: "fa-tumblr-square", label: "&#xf174; Tumblr-Square" },
                { value: "fa-turkish-lira", label: "&#xf195; Turkish-Lira" },
                { value: "fa-tv", label: "&#xf26c; Tv" },
                { value: "fa-twitch", label: "&#xf1e8; Twitch" },
                { value: "fa-twitter", label: "&#xf099; Twitter" },
                { value: "fa-twitter-square", label: "&#xf081; Twitter-Square" },
                { value: "fa-umbrella", label: "&#xf0e9; Umbrella" },
                { value: "fa-underline", label: "&#xf0cd; Underline" },
                { value: "fa-undo", label: "&#xf0e2; Undo" },
                { value: "fa-universal-access", label: "&#xf29a; Universal-Access" },
                { value: "fa-university", label: "&#xf19c; University" },
                { value: "fa-unlink", label: "&#xf127; Unlink" },
                { value: "fa-unlock", label: "&#xf09c; Unlock" },
                { value: "fa-unlock-alt", label: "&#xf13e; Unlock-Alt" },
                { value: "fa-unsorted", label: "&#xf0dc; Unsorted" },
                { value: "fa-upload", label: "&#xf093; Upload" },
                { value: "fa-usb", label: "&#xf287; Usb" },
                { value: "fa-usd", label: "&#xf155; Usd" },
                { value: "fa-user", label: "&#xf007; User" },
                { value: "fa-user-md", label: "&#xf0f0; User-Md" },
                { value: "fa-user-plus", label: "&#xf234; User-Plus" },
                { value: "fa-user-secret", label: "&#xf21b; User-Secret" },
                { value: "fa-user-times", label: "&#xf235; User-Times" },
                { value: "fa-users", label: "&#xf0c0; Users" },
                { value: "fa-venus", label: "&#xf221; Venus" },
                { value: "fa-venus-double", label: "&#xf226; Venus-Double" },
                { value: "fa-venus-mars", label: "&#xf228; Venus-Mars" },
                { value: "fa-viacoin", label: "&#xf237; Viacoin" },
                { value: "fa-viadeo", label: "&#xf2a9; Viadeo" },
                { value: "fa-viadeo-square", label: "&#xf2aa; Viadeo-Square" },
                { value: "fa-video-camera", label: "&#xf03d; Video-Camera" },
                { value: "fa-vimeo", label: "&#xf27d; Vimeo" },
                { value: "fa-vimeo-square", label: "&#xf194; Vimeo-Square" },
                { value: "fa-vine", label: "&#xf1ca; Vine" },
                { value: "fa-vk", label: "&#xf189; Vk" },
                { value: "fa-volume-control-phone", label: "&#xf2a0; Volume-Control-Phone" },
                { value: "fa-volume-down", label: "&#xf027; Volume-Down" },
                { value: "fa-volume-off", label: "&#xf026; Volume-Off" },
                { value: "fa-volume-up", label: "&#xf028; Volume-Up" },
                { value: "fa-warning", label: "&#xf071; Warning" },
                { value: "fa-wechat", label: "&#xf1d7; Wechat" },
                { value: "fa-weibo", label: "&#xf18a; Weibo" },
                { value: "fa-weixin", label: "&#xf1d7; Weixin" },
                { value: "fa-whatsapp", label: "&#xf232; Whatsapp" },
                { value: "fa-wheelchair", label: "&#xf193; Wheelchair" },
                { value: "fa-wheelchair-alt", label: "&#xf29b; Wheelchair-Alt" },
                { value: "fa-wifi", label: "&#xf1eb; Wifi" },
                { value: "fa-wikipedia-w", label: "&#xf266; Wikipedia-W" },
                { value: "fa-windows", label: "&#xf17a; Windows" },
                { value: "fa-won", label: "&#xf159; Won" },
                { value: "fa-wordpress", label: "&#xf19a; Wordpress" },
                { value: "fa-wpbeginner", label: "&#xf297; Wpbeginner" },
                { value: "fa-wpforms", label: "&#xf298; Wpforms" },
                { value: "fa-wrench", label: "&#xf0ad; Wrench" },
                { value: "fa-xing", label: "&#xf168; Xing" },
                { value: "fa-xing-square", label: "&#xf169; Xing-Square" },
                { value: "fa-y-combinator", label: "&#xf23b; Y-Combinator" },
                { value: "fa-y-combinator-square", label: "&#xf1d4; Y-Combinator-Square" },
                { value: "fa-yahoo", label: "&#xf19e; Yahoo" },
                { value: "fa-yc", label: "&#xf23b; Yc" },
                { value: "fa-yc-square", label: "&#xf1d4; Yc-Square" },
                { value: "fa-yelp", label: "&#xf1e9; Yelp" },
                { value: "fa-yen", label: "&#xf157; Yen" },
                { value: "fa-yoast", label: "&#xf2b1; Yoast" },
                { value: "fa-youtube", label: "&#xf167; Youtube" },
                { value: "fa-youtube-play", label: "&#xf16a; Youtube-Play" },
                { value: "fa-youtube-square", label: "&#xf166; Youtube-Square" }
            ];

        });

})()