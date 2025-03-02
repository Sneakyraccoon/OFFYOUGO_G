sap.ui.define([
    "../localService/mockserver/mockserver"
], (mockserver) => {
    "use strict";

    // initialize the mock server
    
    mockserver.init();

    // initialize the embeded component on the HTML page
    sap.ui.require(["sap/ui/core/ComponentSupport"]);
});