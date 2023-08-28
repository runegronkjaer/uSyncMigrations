[
  {
    "name": "Rich text editor",
    "alias": "rte",
    "view": "rte",
    "icon": "icon-article",
    "render": "/Views/Partials/Grid/editors/NovicellEditors/rte.cshtml"
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
    "icon": "icon-movie-alt",
    "config": {
      "renderInGrid": "1",
      "editors": [
        {
          "name": "Embed snippet",
          "alias": "embedSnippet",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
          "description": "Insert an iframe tag."
        }
      ]
    }
  },
  {
    "name": "Quote",
    "alias": "quote",
    "view": "textstring",
    "icon": "icon-quote",
    "config": {
      "style": "border-left: 3px solid #ccc; padding: 10px; color: #ccc; font-family: serif; font-variant: italic; font-size: 18px",
      "markup": "<div class=\"grid-quote\"><blockquote nc-search-key=\"grid-quote\">#value#</blockquote></div>"
    }
  },
  {
    "name": "Page Header",
    "alias": "pageHeader",
    "view": "textstring",
    "icon": "icon-font",
    "config": {
      "markup": "<h2 class=\"text-header\" nc-search-key=\"grid-pageheader\">#value#</h2>",
      "style": "font-size: 28px; line-height: 24px; font-weight: bold"
    }
  },
  {
    "name": "Section Header",
    "alias": "sectionHeader",
    "view": "textstring",
    "icon": "icon-font",
    "config": {
      "style": "font-size: 20px; line-height: 29px; font-weight: bold",
      "markup": "<h3 class=\"text-header\" nc-search-key=\"grid-sectionheader\">#value#</h3>"
    }
  },
  {
    "name": "Focalpoint Image",
    "alias": "focalpointImage",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-umb-media",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "renderInGrid": "1",
      "expiration": 1000,
      "frontView": "/Views/Partials/Grid/editors/NovicellEditors/FocalpointImage.cshtml",
      "editors": [
        {
          "name": "Image",
          "alias": "image",
          "propretyType": {},
          "dataType": "f8e9eebb-b9d0-41b8-9128-576056ab0db5",
          "description": "Select or upload an image to use."
        },
        {
          "name": "Choose crop",
          "alias": "chooseCrop",
          "propretyType": {},
          "dataType": "b540977a-7b6b-41bd-8a1f-3308244be0f5"
        }
      ]
    }
  },
  {
    "name": "Focalpoint Image Link",
    "alias": "FocalpointImageLink",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-umb-media",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/editors/NovicellEditors/FocalpointImageLink.cshtml",
      "renderInGrid": "1",
      "min": null,
      "max": null,
      "expiration": 1000,
      "editors": [
        {
          "name": "Image",
          "alias": "image",
          "propretyType": {},
          "dataType": "f8e9eebb-b9d0-41b8-9128-576056ab0db5",
          "description": "Select or upload an image to use."
        },
        {
          "name": "Link picker",
          "alias": "linkPicker",
          "propretyType": {},
          "dataType": "9038c803-6bf2-4c56-958d-f4a2ed487a94",
          "description": "Select where the image links to."
        }
      ]
    }
  },
  {
    "name": "Postal Address",
    "alias": "PostalAddress",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-pin-location",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "editors": [
        {
          "name": "Company name / header",
          "alias": "name",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Company description",
          "alias": "description",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Street",
          "alias": "streetAddress",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "City",
          "alias": "addressLocality",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Zipcode",
          "alias": "postalCode",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Region",
          "alias": "addressRegion",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Country",
          "alias": "addressCountry",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Telephone",
          "alias": "telephone",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Email",
          "alias": "email",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        }
      ],
      "renderInGrid": "1",
      "min": 1,
      "max": 1,
      "expiration": 1000,
      "frontView": "/Views/Partials/Grid/editors/NovicellEditors/PostalAddress.cshtml"
    }
  },
  {
    "name": "News List",
    "alias": "NewsList",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-newspaper-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "expiration": 1000,
      "frontView": "/Views/Partials/Grid/editors/NovicellEditors/NewsList.cshtml",
      "renderInGrid": "1",
      "editors": [
        {
          "name": "Category",
          "alias": "category",
          "propretyType": {},
          "dataType": "477d1fd7-58aa-460c-b01d-e348d83a0f6b",
          "description": "Pick the category to display news from, if none is selected, it will just display from all categories."
        },
        {
          "name": "Item Count",
          "alias": "itemCount",
          "propretyType": {},
          "dataType": "53d2ae6d-6cd7-415c-b5ec-53e0f9ed8798",
          "description": "Select how many items to display."
        }
      ],
      "min": 1,
      "max": 1
    }
  },
  {
    "name": "Page List",
    "alias": "pageList",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-documents",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/editors/NovicellEditors/PageList.cshtml",
      "renderInGrid": "1",
      "expiration": 1000,
      "editors": [
        {
          "name": "Pages",
          "alias": "pages",
          "propretyType": {},
          "dataType": "9cb311f8-5c5b-423c-9aae-8faab4eb5f19",
          "description": "Select pages to list"
        }
      ],
      "min": 1,
      "max": 1
    }
  },
  {
    "name": "Social Buttons",
    "alias": "SocialButtons",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-share",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "renderInGrid": "1",
      "min": 1,
      "max": 1,
      "expiration": 1000,
      "frontView": "/Views/Partials/Grid/editors/NovicellEditors/SocialButtons.cshtml",
      "editors": [
        {
          "name": "Facebook Url",
          "alias": "facebookUrl",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "LinkedIn Url",
          "alias": "linkedInUrl",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Twitter Url",
          "alias": "twitterUrl",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Instagram Url",
          "alias": "instagramUrl",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        }
      ]
    }
  },
  {
    "name": "Slideshow",
    "alias": "slideshow",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-slideshow",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/editors/NovicellEditors/Slideshow.cshtml",
      "renderInGrid": "1",
      "min": null,
      "max": null,
      "expiration": 1000,
      "editors": [
        {
          "name": "Slideshow",
          "alias": "slideshow",
          "propretyType": {},
          "dataType": "9509d653-58df-4710-9bf0-826e4f35eee4",
          "description": "Select slides"
        }
      ]
    }
  },
  {
    "name": "Employee",
    "alias": "employee",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-user",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "renderInGrid": "1",
      "expiration": 1000,
      "frontView": "/Views/Partials/Grid/editors/NovicellEditors/Employee.cshtml",
      "editors": [
        {
          "name": "Employee",
          "alias": "employee",
          "propretyType": {},
          "dataType": "197f8f2a-f209-423b-bde4-ee722df795ba",
          "description": "Select one or multiple employees"
        }
      ],
      "min": 1,
      "max": 1
    }
  },
  {
    "name": "Html",
    "alias": "html",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-code",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "renderInGrid": "1",
      "expiration": 1000,
      "frontView": "/Views/Partials/Grid/editors/NovicellEditors/Html.cshtml",
      "editors": [
        {
          "name": "Html Snippet",
          "alias": "htmlSnippet",
          "propretyType": {},
          "dataType": "c6bac0dd-4ab9-45b1-8e30-e4b619ee5da3",
          "description": "Used for html snippet like iframes and/or script tags"
        }
      ]
    }
  },
  {
    "name": "Sliding Gallery",
    "alias": "slidingGallery",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-umb-media",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "editors": [
        {
          "name": "Slides",
          "alias": "slides",
          "propretyType": {},
          "dataType": "7e3962cc-ce20-4ffc-b661-5897a894ba7e"
        }
      ],
      "renderInGrid": "0",
      "frontView": "/Views/Partials/Grid/editors/CPTEditors/SlidingGallery.cshtml",
      "min": 1,
      "max": 1
    }
  },
  {
    "name": "Destination List",
    "alias": "destinationList",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/DestinationList.cshtml",
      "editors": [
        {
          "name": "Header",
          "alias": "header",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Subheader",
          "alias": "subheader",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Destination Picker",
          "alias": "destinationPicker",
          "propretyType": {},
          "dataType": "02feee67-e649-4c55-bac9-83f45a4d5fed",
          "description": "Picks which destinations are to be presented in the grid element. By default, if nothing is picked, it will display all child nodes of type Destination."
        }
      ]
    }
  },
  {
    "name": "Day program",
    "alias": "dayProgram",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/DayProgram.cshtml"
    }
  },
  {
    "name": "Specialist",
    "alias": "specialist",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/Specialist.cshtml",
      "editors": [
        {
          "name": "Specialist Picker",
          "alias": "specialistPicker",
          "propretyType": {},
          "dataType": "7400c367-eee3-4cab-bfa5-a04e76bc0b76"
        },
        {
          "name": "Remove Top Padding",
          "alias": "removeTopPadding",
          "propretyType": {},
          "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49"
        }
      ]
    }
  },
  {
    "name": "Country List",
    "alias": "countryList",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "editors": [
        {
          "name": "Quote",
          "alias": "quote",
          "propretyType": {},
          "dataType": "a42e7807-7334-48f1-ad3b-ec826c7eb12a",
          "description": "The quote in the country list teaser."
        },
        {
          "name": "Quote Icon",
          "alias": "quoteIcon",
          "propretyType": {},
          "dataType": "fdf2e31b-1e93-404d-9111-35739dbeb90b",
          "description": "The icon displayed together with the quote."
        },
        {
          "name": "Disable full-width",
          "alias": "disableFullWidth",
          "propretyType": {},
          "dataType": "92897bc6-a5f3-4ffe-ae27-f2e7e33dda49",
          "description": "Disables the full width of the country list elements which makes them no longer take the entire screen."
        }
      ],
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/CountryList.cshtml",
      "max": 1
    }
  },
  {
    "name": "Popular Destination List",
    "alias": "popularDestinationList",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/PopularDestinationsList.cshtml",
      "editors": [
        {
          "name": "Popular Destination Picker",
          "alias": "popularDestinationPicker",
          "propretyType": {},
          "dataType": "02feee67-e649-4c55-bac9-83f45a4d5fed",
          "description": "Picks which destinations are to be presented as popular in the current grid element."
        }
      ]
    }
  },
  {
    "name": "Small Gallery",
    "alias": "smallGallery",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Components/MiniGallery.cshtml",
      "editors": [
        {
          "name": "Small Gallery Picker",
          "alias": "smallGalleryPicker",
          "propretyType": {},
          "dataType": "7e3962cc-ce20-4ffc-b661-5897a894ba7e",
          "description": "The first image picked will be shown as the \"main\" one. Meaning it would be bigger and positioned to the left."
        }
      ],
      "min": 0,
      "max": 1
    }
  },
  {
    "name": "Newsletter",
    "alias": "newsletter",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/Newsletter.cshtml"
    }
  },
  {
    "name": "Request Travel Form",
    "alias": "requestTravelForm",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/RequestTravelForm.cshtml",
      "editors": [
        {
          "name": "Headline",
          "alias": "headline",
          "PropertyEditorAlias": "",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Portal id",
          "alias": "portalId",
          "PropertyEditorAlias": "",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Form id",
          "alias": "formId",
          "PropertyEditorAlias": "",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        }
      ]
    }
  },
  {
    "name": "Specific Destination List",
    "alias": "specificDestinationList",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "editors": [
        {
          "name": "Destination Picker",
          "alias": "destinationPicker",
          "propretyType": {},
          "dataType": "02feee67-e649-4c55-bac9-83f45a4d5fed",
          "description": "Picks which destinations are to be presented in the grid element."
        }
      ],
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/SpecificDestinationList.cshtml"
    }
  },
  {
    "name": "Online Payment Form",
    "alias": "onlinePaymentForm",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-tv",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/OnlinePaymentForm.cshtml"
    }
  },
  {
    "name": "Travel booking",
    "alias": "travelBooking",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-thumb-up color-orange",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/TravelBooking.cshtml",
      "editors": [
        {
          "name": "Header",
          "alias": "bookingLinesHeader",
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
          "propretyType": {},
          "description": "If this is set it will overwrite the default dictionary item"
        },
        {
          "name": "Teaser",
          "alias": "bookingLinesTeaser",
          "propretyType": {},
          "dataType": "c6bac0dd-4ab9-45b1-8e30-e4b619ee5da3",
          "description": "If this is set it will overwrite  the default dictionary item"
        },
        {
          "name": "Subheader 1",
          "alias": "subheader1",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Subtext 1",
          "alias": "subtext1",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Subheader 2",
          "alias": "subheader2",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Subtext 2",
          "alias": "subtext2",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        }
      ]
    }
  },
  {
    "name": "Travel finder",
    "alias": "travelFinder",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-plane",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/TravelFinder.cshtml"
    }
  },
  {
    "name": "Destination with query",
    "alias": "destinationWithQuery",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-thumbnail-list",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "editors": [
        {
          "name": "Destinations",
          "alias": "destinations",
          "propretyType": {},
          "dataType": "7811d030-ee35-4212-b311-0b059c138800"
        }
      ],
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/DestinationWithQuery.cshtml"
    }
  },
  {
    "name": "Spotbox",
    "alias": "spotbox",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "editors": [
        {
          "name": "Text",
          "alias": "text",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Link",
          "alias": "link",
          "propretyType": {},
          "dataType": "0f091b4a-77e0-4b90-8589-b282c9840725"
        },
        {
          "name": "Image",
          "alias": "image",
          "propretyType": {},
          "dataType": "898c300f-cae0-4a5a-b5d2-c32a5b1bddc4"
        },
        {
          "name": "Color",
          "alias": "color",
          "propretyType": {},
          "dataType": "b0cdb9d3-e558-4d9e-976d-3cb38b83e3db"
        }
      ],
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/Spotbox.cshtml"
    }
  },
  {
    "name": "Spotbox article",
    "alias": "spotboxArticle",
    "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
    "icon": "icon-settings-alt",
    "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
    "config": {
      "editors": [
        {
          "name": "Text",
          "alias": "text",
          "propretyType": {},
          "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
        },
        {
          "name": "Link",
          "alias": "link",
          "propretyType": {},
          "dataType": "0f091b4a-77e0-4b90-8589-b282c9840725"
        },
        {
          "name": "Image",
          "alias": "image",
          "propretyType": {},
          "dataType": "898c300f-cae0-4a5a-b5d2-c32a5b1bddc4"
        },
        {
          "name": "Color",
          "alias": "color",
          "propretyType": {},
          "dataType": "b0cdb9d3-e558-4d9e-976d-3cb38b83e3db"
        }
      ],
      "frontView": "/Views/Partials/Grid/Editors/CPTEditors/SpotboxArticle.cshtml"
    }
  }
]