// Heavily inspired by nestedcontent.filter.js in the original Umbraco project

// Cache for node names so we don't make a ton of requests
var blNodeNameCache = {
  id: "",
  keys: {}
};

angular.module("umbraco.filters")
  .filter('blNodeName', function (contentResource, editorState) {
    nodeNameFilter.$stateful = true;

    function nodeNameFilter(input) {

      // Check we have a value at all
      if (typeof input === 'undefined' || input === "" || input.toString() === "0" || input === null) {
        return "";
      }

      var currentNode = editorState.getCurrent();

      // Ensure a unique cache per editor instance
      var key = "ncNodeName_" + currentNode.key;
      if (blNodeNameCache.id !== key) {
        blNodeNameCache.id = key;
        blNodeNameCache.keys = {};
      }

      // MNTP values are comma separated IDs. We'll only fetch the first one for the NC header.
      var lookupId = input;
      var serviceInvoked = false;

      // See if there is a value in the cache and use that
      if (blNodeNameCache.keys[lookupId]) {
        return blNodeNameCache.keys[lookupId];
      }

      // No value, so go fetch one
      // We'll put a temp value in the cache though so we don't
      // make a load of requests while we wait for a response
      blNodeNameCache.keys[lookupId] = "Loading...";

      // If the service has already been invoked, don't do it again
      if (serviceInvoked) {
        return blNodeNameCache.keys[lookupId];
      }

      serviceInvoked = true;

        contentResource.getById(input).then(function (data) {
          blNodeNameCache.keys[lookupId] = data.contentTypeName;
        }).catch(function () {
          blNodeNameCache.keys[lookupId] = "Error: Could not load";
        });

      // Return the current value for now
      return blNodeNameCache.keys[lookupId];
    }

    return nodeNameFilter;
  });