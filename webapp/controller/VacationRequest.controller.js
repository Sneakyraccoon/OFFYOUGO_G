sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ui5.offyougo.controller.VacationRequest", {
        onInit: function () {
            this.getView().byId("vacationRange").attachChange(this.onDateSelect.bind(this));
        },

        onDateSelect: function () {
            const oDatePicker = this.getView().byId("vacationRange");
            const bHasDates = !!oDatePicker.getDateValue() && !!oDatePicker.getSecondDateValue();
            this.getView().byId("requestButton").setEnabled(bHasDates);
        },

        onRequestVacation: async function () {
            const oModel = this.getOwnerComponent().getModel("userModel");
            if (!oModel) {
                MessageToast.show("Ошибка: пользователь не загружен");
                return;
            }
            const user = oModel.getData();
            const oDatePicker = this.getView().byId("vacationRange");

            if (!oDatePicker.getDateValue() || !oDatePicker.getSecondDateValue()) {
                MessageToast.show("Выберите даты!");
                return;
            }

            const requestData = {
                userId: user.id,
                managerId: user.managerId,
                startDate: oDatePicker.getDateValue().toISOString(),
                endDate: oDatePicker.getSecondDateValue().toISOString(),
                status: "pending"
            };

            try {
                const response = await fetch("/api/vacation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestData)
                });

                if (!response.ok) throw new Error();

                MessageToast.show("Запрос отправлен на подтверждение");
            } catch (error) {
                MessageToast.show("Ошибка отправки запроса");
            }
        }
    });
});
