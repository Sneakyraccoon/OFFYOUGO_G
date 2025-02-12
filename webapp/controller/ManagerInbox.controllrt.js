sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ui5.vacation.controller.ManagerInbox", {
        onInit: async function () {
            const managerId = this.getOwnerComponent().getModel("userModel").getData().id;
            const response = await fetch(`/api/inbox/${managerId}`);
            const requests = await response.json();
            this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel({ requests }), "inboxModel");
        },

        onApprove: async function (oEvent) {
            const request = oEvent.getSource().getBindingContext("inboxModel").getObject();
            await this._sendDecision(request.requestId, "approved");
        },

        onReject: async function (oEvent) {
            const request = oEvent.getSource().getBindingContext("inboxModel").getObject();
            await this._sendDecision(request.requestId, "rejected");
        },

        _sendDecision: async function (requestId, decision) {
            await fetch("/api/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestId, decision })
            });

            MessageToast.show(`Заявка ${decision}`);
        }
    });
});
