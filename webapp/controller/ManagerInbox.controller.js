sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ui5.vacation.controller.ManagerInbox", {
        onInit: async function () {
            try {

                const oModel = this.getOwnerComponent().getModel("userModel");
                if (!oModel || !oModel.getData()) {
                    MessageToast.show("Ошибка: данные менеджера не загружены");
                    return;
                }

                const managerId = oModel.getData().id;

                const response = await fetch(`/api/inbox/${managerId}`);

                if (!response.ok) throw new Error();

                const requests = await response.json();
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel({ requests }), "inboxModel");
            } catch (error) {
                MessageToast.show("Ошибка загрузки заявок");
            }
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

            // 🔥 Обновляем список заявок после одобрения/отклонения
            this.onInit();
        }
    });
});
