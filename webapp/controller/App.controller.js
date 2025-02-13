sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("ui5.vacation.controller.App", {
        onInit: function () {
            console.log("App Controller initialized.");
        }
    });
});
