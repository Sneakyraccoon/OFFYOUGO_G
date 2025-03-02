sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], (Controller) => {
    "use strict";
 
    return Controller.extend("ui5.offyougo.controller.App", {
      onInit() {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
    });
 });