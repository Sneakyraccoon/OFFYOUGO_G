sap.ui.define([
	"sap/ui/core/util/MockServer"
], (MockServer) => {
	"use strict";

	return {

		init() {
			// create
			const oMockServer = new MockServer({
				//rootUri: sap.ui.require.toUrl("ui5/offyougo") + "/V2/Northwind/Northwind.svc/"
				
				//rootUri: "/V2/Northwind/Northwind.svc/"

				// This works:
				rootUri: "V2/Northwind/Northwind.svc/"
			});
			
			const oUriParameters = new URLSearchParams(window.location.search);

			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});
			 
			// simulate
			const sPath = sap.ui.require.toUrl("ui5/offyougo/localService/mockserver");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

			// start
			oMockServer.start();
			
			
			console.log('MOCKSERVER_STARTED:', oMockServer);

		}
	};
});
