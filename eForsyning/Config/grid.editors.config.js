[
    {
        "name": "Accordion",
        "alias": "accordion",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-list",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "renderInGrid": "1",
            "frontView": "",
            "editors": [
                {
                    "name": "Overskrift",
                    "alias": "overskrift",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Elementer",
                    "alias": "items",
                    "propretyType": {},
                    "dataType": "68f38c93-e443-4a7e-b296-5e7e6856c753"
                }
            ]
        }
    },
    {
        "name": "Brødtekst",
        "alias": "rte",
        "view": "rte",
        "icon": "icon-article"
    },
    {
        "name": "Image",
        "alias": "media",
        "view": "media",
        "icon": "icon-picture"
    },
    {
        "name": "Macro",
        "alias": "macro",
        "view": "macro",
        "icon": "icon-settings-alt"
    },
    {
        "name": "Embed",
        "alias": "embed",
        "view": "embed",
        "icon": "icon-movie-alt"
    },
    {
        "name": "Headline",
        "alias": "headline",
        "view": "textstring",
        "icon": "icon-coin",
        "config": {
            "style": "font-size: 36px; line-height: 45px; font-weight: bold",
            "markup": "<h1>#value#</h1>"
        }
    },
    {
        "name": "Quote",
        "alias": "quote",
        "view": "textstring",
        "icon": "icon-quote",
        "config": {
            "style": "border-left: 3px solid #ccc; padding: 10px; color: #ccc; font-family: serif; font-style: italic; font-size: 18px",
            "markup": "<blockquote>#value#</blockquote>"
        }
    },
    {
        "name": "Billeder",
        "alias": "billeder",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-pictures-alt-2",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "renderInGrid": "1",
            "frontView": "",
            "editors": [
                {
                    "name": "Billeder",
                    "alias": "images",
                    "propretyType": {},
                    "dataType": "fc7a0f28-e9a4-464c-a904-3e173268649c",
                    "description": "Vælg et eller flere billeder"
                },
                {
                    "name": "Billedtekst",
                    "alias": "imageText",
                    "propretyType": {},
                    "dataType": "c6bac0dd-4ab9-45b1-8e30-e4b619ee5da3"
                },
                {
                    "name": "Billedhøjde",
                    "alias": "imageHeight",
                    "propretyType": {},
                    "dataType": "dd342f85-c530-4b51-af3c-8a45c08db5bb"
                },
                {
                    "name": "Billeder pr række",
                    "alias": "imagesPrRow",
                    "propretyType": {},
                    "dataType": "27c8efe8-2458-46a7-b50c-29f15a5b7567",
                    "description": "Har ingen effekt hvis der kun er valgt et billede. Hvis der er valgt mere end ét billede og ingen rækker er valgt, vises alle på samme række."
                },
                {
                    "name": "Link",
                    "alias": "link",
                    "propretyType": {},
                    "dataType": "c7488356-ac20-46ee-8d5a-8b14f2d43c37",
                    "description": "Hvis der er flere billeder, får alle det samme link. Er der valgt et link, ignoreres gallery-mode"
                },
                {
                    "name": "Galleri",
                    "alias": "galleryMode",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49",
                    "description": "Alle billeder kan vises i stor udgave"
                },
                {
                    "name": "Afstand til højre og venstre",
                    "alias": "paddingHorizontal",
                    "propretyType": {},
                    "dataType": "64dc5af4-920e-4007-b6a2-319bfa4e8fa0"
                }
            ]
        }
    },
    {
        "name": "Selvbetjening",
        "alias": "selvbetjening",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-keychain",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "renderInGrid": "1",
            "frontView": "",
            "editors": [
                {
                    "name": "Overskrift",
                    "alias": "overskrift",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Brødtekst",
                    "alias": "broedtekst",
                    "propretyType": {},
                    "dataType": "c6bac0dd-4ab9-45b1-8e30-e4b619ee5da3"
                },
                {
                    "name": "Selvbetjenings emner",
                    "alias": "selvbetjeningsEmner",
                    "propretyType": {},
                    "dataType": "c8bc96aa-aac4-41e4-8fa3-d6d1e5ba80bd"
                },
                {
                    "name": "Emner pr række",
                    "alias": "emnerPrRaekke",
                    "propretyType": {},
                    "dataType": "27c8efe8-2458-46a7-b50c-29f15a5b7567",
                    "description": "Hvis intet er valgt vises alle på én række"
                },
                {
                    "name": "Layout",
                    "alias": "layout",
                    "propretyType": {},
                    "dataType": "5b2fbcb2-86f9-4ab9-a1e2-bc464ebe9641"
                },
                {
                    "name": "Farve ikoner",
                    "alias": "farveIkoner",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Baggrundsfarve ikoner",
                    "alias": "baggrundsfarveIkoner",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Afstand til højre og venstre",
                    "alias": "paddingHorizontal",
                    "propretyType": {},
                    "dataType": "64dc5af4-920e-4007-b6a2-319bfa4e8fa0"
                }
            ]
        }
    },
    {
        "name": "Jumbotron",
        "alias": "jumbotron",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-bill",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "frontView": "",
            "editors": [
                {
                    "name": "Overskrift",
                    "alias": "overskrift",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Brødtekst",
                    "alias": "broedtekst",
                    "propretyType": {},
                    "dataType": "c6bac0dd-4ab9-45b1-8e30-e4b619ee5da3"
                },
                {
                    "name": "Links",
                    "alias": "links",
                    "propretyType": {},
                    "dataType": "f73013a8-7584-4d67-be96-45a90c8fad79"
                },
                {
                    "name": "Layout",
                    "alias": "layout",
                    "propretyType": {},
                    "dataType": "5b2fbcb2-86f9-4ab9-a1e2-bc464ebe9641"
                },
                {
                    "name": "Baggrundsfarve knap",
                    "alias": "baggrundsfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Tekstfarve knap",
                    "alias": "tekstfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Knap størrelse",
                    "alias": "knapStoerrelse",
                    "propretyType": {},
                    "dataType": "b9f73eed-8300-4f47-98c2-0e0f55b6c3e3"
                },
                {
                    "name": "Afstand til højre og venstre",
                    "alias": "paddingHorizontal",
                    "propretyType": {},
                    "dataType": "64dc5af4-920e-4007-b6a2-319bfa4e8fa0"
                }
            ],
            "renderInGrid": "1"
        }
    },
    {
        "name": "Firmaoplysninger",
        "alias": "firmaoplysninger",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-info",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "frontView": "",
            "renderInGrid": "1",
            "editors": [
                {
                    "name": "Skjul firmanavn",
                    "alias": "skjulFirmanavn",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul adresse",
                    "alias": "skjulAdresse",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul postnr",
                    "alias": "skjulPostnr",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul by",
                    "alias": "skjulBy",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul land",
                    "alias": "skjulLand",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul telefon",
                    "alias": "skjulTelefon",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul vagttelefon",
                    "alias": "skjulVagttelefon",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul email",
                    "alias": "skjulEmail",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul web",
                    "alias": "skjulWeb",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul CVR",
                    "alias": "skjulCVR",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul Bankkonto",
                    "alias": "skjulBankkonto",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Skjul EAN",
                    "alias": "skjulEAN",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                }
            ]
        }
    },
    {
        "name": "Links",
        "alias": "links",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-link",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Links",
                    "alias": "links",
                    "propretyType": {},
                    "dataType": "1d8afecf-9ac4-42ee-8ebd-e6f401b32ddc"
                }
            ],
            "frontView": "",
            "renderInGrid": "1"
        }
    },
    {
        "name": "Åbningstider",
        "alias": "aabningstider",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-operator",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "renderInGrid": "1",
            "frontView": "",
            "editors": [
                {
                    "name": "Overskrift",
                    "alias": "overskrift",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                }
            ]
        }
    },
    {
        "name": "Dokumenter",
        "alias": "dokumenter",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-documents",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Dokumenter",
                    "alias": "dokumenter",
                    "propretyType": {},
                    "dataType": "687a517f-0452-432c-87bc-00c68d414a17"
                },
                {
                    "name": "Dokumenter pr række",
                    "alias": "dokumenterPrRaekke",
                    "propretyType": {},
                    "dataType": "27c8efe8-2458-46a7-b50c-29f15a5b7567",
                    "description": "Har ingen effekt hvis der kun er valgt et dokument. Hvis der er valgt mere end ét dokument og ingen rækker er valgt, vises alle på samme række."
                },
                {
                    "name": "Listevisning",
                    "alias": "dokumentListevisning",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Nyeste dokument først",
                    "alias": "documentsOrderDesc",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                }
            ],
            "frontView": "",
            "renderInGrid": "1"
        }
    },
    {
        "name": "Link bokse",
        "alias": "linkBokse",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-list",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Linkboks type",
                    "alias": "linkboksType",
                    "propretyType": {},
                    "dataType": "b65acf07-9055-4a0d-9cfa-715519bd8ed9",
                    "description": "Vælg tekst eller billeder. Vælges intet anvendes boksene med tekst"
                },
                {
                    "name": "Links",
                    "alias": "links",
                    "propretyType": {},
                    "dataType": "00b7c066-38ed-4ecc-a683-db2ae0ac3723"
                },
                {
                    "name": "Links pr række",
                    "alias": "linksPrRaekke",
                    "propretyType": {},
                    "dataType": "27c8efe8-2458-46a7-b50c-29f15a5b7567"
                },
                {
                    "name": "Centrer tekst",
                    "alias": "centrerTekst",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Links baggrundsfarve",
                    "alias": "baggrundsfarve",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Links tekstfarve",
                    "alias": "tekstfarve",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Ensfarvet",
                    "alias": "ensfarvet",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49",
                    "description": "Slå glidende toning fra"
                }
            ],
            "renderInGrid": "1",
            "frontView": ""
        }
    },
    {
        "name": "Personer i kategori",
        "alias": "personerIKategori",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-users",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Person kategori",
                    "alias": "personKategori",
                    "propretyType": {},
                    "dataType": "107f0b74-8f26-47cc-8cab-de3426f51211"
                },
                {
                    "name": "Medtag kategorioverskrift",
                    "alias": "medtagKategorioverskrift",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                },
                {
                    "name": "Personer pr række",
                    "alias": "personerPrRow",
                    "propretyType": {},
                    "dataType": "f607023d-4a48-42ba-abb5-80b9f7f4dada"
                },
                {
                    "name": "Billedhøjde",
                    "alias": "imageHeight",
                    "propretyType": {},
                    "dataType": "dd342f85-c530-4b51-af3c-8a45c08db5bb"
                }
            ],
            "frontView": ""
        }
    },
    {
        "name": "Formular",
        "alias": "formular",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-script",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "renderInGrid": "1",
            "frontView": "",
            "editors": [
                {
                    "name": "Form",
                    "alias": "form",
                    "propretyType": {},
                    "dataType": "e2ca8630-4c1a-4d15-a607-ce461222dc91",
                    "description": "Vælg den form du vil indsætte"
                },
                {
                    "name": "Knap tekst",
                    "alias": "knapTekst",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
                    "description": "Teksten på send-knappen. Udfyldes intet, er teksten \"Send\""
                },
                {
                    "name": "Baggrundsfarve knap",
                    "alias": "baggrundsfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Tekstfarve knap",
                    "alias": "tekstfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Knap størrelse",
                    "alias": "knapStoerrelse",
                    "propretyType": {},
                    "dataType": "b9f73eed-8300-4f47-98c2-0e0f55b6c3e3"
                },
                {
                    "name": "Afstand til højre og venstre",
                    "alias": "paddingHorizontal",
                    "propretyType": {},
                    "dataType": "64dc5af4-920e-4007-b6a2-319bfa4e8fa0"
                },
                {
                    "name": "Placeholders",
                    "alias": "placeholders",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49",
                    "description": "Bruger labels i felterne istedet for over dem."
                }
            ]
        }
    },
    {
        "name": "Info bokse",
        "alias": "infoBokse",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-thumbnail-list",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "renderInGrid": "1",
            "frontView": "",
            "editors": [
                {
                    "name": "Info bokse",
                    "alias": "infoBokse",
                    "propretyType": {},
                    "dataType": "872096f0-406f-4b7f-b0fc-62ea36d11e59"
                },
                {
                    "name": "Billedhøjde",
                    "alias": "imageHeight",
                    "propretyType": {},
                    "dataType": "dd342f85-c530-4b51-af3c-8a45c08db5bb"
                },
                {
                    "name": "Baggrundsfarve bokse",
                    "alias": "baggrundsfarveBokse",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Baggrundsfarve knap",
                    "alias": "baggrundsfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Tekstfarve knap",
                    "alias": "tekstfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Knap størrelse",
                    "alias": "knapStrrelse",
                    "propretyType": {},
                    "dataType": "b9f73eed-8300-4f47-98c2-0e0f55b6c3e3"
                }
            ]
        }
    },
    {
        "name": "Søgeresultat",
        "alias": "searchResult",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-search",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "renderInGrid": "1",
            "frontView": "",
            "editors": [
                {
                    "name": "Overskrift",
                    "alias": "overskrift",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
                    "description": "Sæt ## ind der var antallet af resultater skal stå, og @@ der hvor søgedordet skal stå"
                },
                {
                    "name": "Overskrift hvis ingen fundet",
                    "alias": "overskriftNoResults",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
                    "description": "Sæt @@ ind der hvor søgeordet skal stå"
                },
                {
                    "name": "Baggrundsfarve knap",
                    "alias": "baggrundsfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Tekstfarve knap",
                    "alias": "tekstfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Vis søgefelt",
                    "alias": "showSearchField",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49",
                    "description": "Vi søgefeltet under resultaterne"
                }
            ]
        }
    },
    {
        "name": "Eksternt indhold",
        "alias": "eksterntIndhold",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-frame-alt",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Url",
                    "alias": "url",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
                    "description": "Stien til det der skal vises"
                },
                {
                    "name": "Billedknap",
                    "alias": "billedknap",
                    "propretyType": {},
                    "dataType": "93929b9a-93a2-4e2a-b239-d99334440a59",
                    "description": "Hvis et billede vælges, ignoreres knapindstillingerne nedenfor"
                },
                {
                    "name": "Knaptekst",
                    "alias": "knaptekst",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Baggrundsfarve knap",
                    "alias": "baggrundsfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Tekstfarve knap",
                    "alias": "tekstfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Knap størrelse",
                    "alias": "knapStoerrelse",
                    "propretyType": {},
                    "dataType": "b9f73eed-8300-4f47-98c2-0e0f55b6c3e3"
                }
            ],
            "frontView": "",
            "renderInGrid": "1"
        }
    },
    {
        "name": "Login form",
        "alias": "loginForm",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-keyhole",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "renderInGrid": "0",
            "frontView": "",
            "editors": [
                {
                    "name": "Overskrift",
                    "alias": "overskrift",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
                    "description": ""
                },
                {
                    "name": "Baggrundsfarve knap",
                    "alias": "baggrundsfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Tekstfarve knap",
                    "alias": "tekstfarveKnap",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Knap størrelse",
                    "alias": "knapStoerrelse",
                    "propretyType": {},
                    "dataType": "b9f73eed-8300-4f47-98c2-0e0f55b6c3e3"
                }
            ]
        }
    },
    {
        "name": "Undermenu",
        "alias": "undermenu",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-item-arrangement",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "renderInGrid": "1",
            "frontView": "",
            "editors": [
                {
                    "name": "Menupunkter pr række",
                    "alias": "menupunkterPrRaekke",
                    "propretyType": {},
                    "dataType": "27c8efe8-2458-46a7-b50c-29f15a5b7567"
                },
                {
                    "name": "Menupunkt baggrundsfarve",
                    "alias": "menupunktBaggrundsfarve",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Menupunkt tekstfarve",
                    "alias": "menupunktTekstfarve",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                },
                {
                    "name": "Ensfarvet",
                    "alias": "ensfarvet",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49",
                    "description": "Slå glidende toning fra"
                }
            ]
        }
    },
    {
        "name": "Video",
        "alias": "LeBlender.video",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-video",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Video url",
                    "alias": "videoUrl",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
                    "description": "Youtube eller Vimeo-url"
                },
                {
                    "name": "Ikon farve",
                    "alias": "iconColor",
                    "propretyType": {},
                    "dataType": "df5f8055-ddef-4464-80f5-0a1336766742"
                }
            ],
            "renderInGrid": "1",
            "frontView": ""
        }
    },
    {
        "name": "HTML",
        "alias": "rawhtml",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-code",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Html",
                    "alias": "html",
                    "propretyType": {},
                    "dataType": "c6bac0dd-4ab9-45b1-8e30-e4b619ee5da3",
                    "description": "Indsæt din html her"
                },
                {
                    "name": "CSS Styles",
                    "alias": "cssStyles",
                    "propretyType": {},
                    "dataType": "c6bac0dd-4ab9-45b1-8e30-e4b619ee5da3"
                }
            ],
            "renderInGrid": "1",
            "frontView": ""
        }
    },
    {
        "name": "Feed",
        "alias": "feed",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-rss",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Feed",
                    "alias": "feedpicker",
                    "propretyType": {},
                    "dataType": "d7875567-4fd8-4cd7-ba03-016fa3c633cd",
                    "description": "Vælg feed"
                },
                {
                    "name": "Feed layout",
                    "alias": "feedLayout",
                    "propretyType": {},
                    "dataType": "d269aad1-3c46-4e63-8f34-a4cb1ff25a16",
                    "description": "Vælg layout for Feed Indhold."
                },
                {
                    "name": "Antal Feed Indhold",
                    "alias": "antalFeedIndhold",
                    "propretyType": {},
                    "dataType": "2e6d3631-066e-44b8-aec4-96f09099b2b5",
                    "description": "Angiv antallet af Feed Indhold der skal vises. Ved 0 eller blank udstilles alle Feed Indhold i det angivne Feed."
                },
                {
                    "name": "Feed overskrift",
                    "alias": "feedOverskrift",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
                    "description": "Angiv overskrift på Feed gældende ved listevisning."
                }
            ],
            "min": null,
            "frontView": ""
        }
    },
    {
        "name": "Widget",
        "alias": "dffedbWidget",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-wand",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Widget",
                    "alias": "widget",
                    "propretyType": {},
                    "dataType": "b74e5d09-6343-4421-bf97-767c989a0f45"
                },
                {
                    "name": "Hvid tekst",
                    "alias": "hvidTekst",
                    "propretyType": {},
                    "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
                }
            ],
            "frontView": "",
            "renderInGrid": "1"
        }
    }
]