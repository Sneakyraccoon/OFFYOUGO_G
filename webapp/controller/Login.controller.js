sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ui5.offyougo.controller.Login", {
        onLogin: async function () {
            const email = this.getView().byId("emailInput").getValue();
            const password = this.getView().byId("passwordInput").getValue();

            console.log(email);
            console.log(password);

            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    MessageToast.show("Ошибка входа!");

                    return;
                }

                const userData = await response.json();

                // Сохранение данных пользователя в глобальную модель
                const oModel = this.getOwnerComponent().getModel("userModel");
                if (!oModel) {
                    MessageToast.show("Ошибка: модель userModel не найдена");
                    return;
                }
                oModel.setData(userData);

                // Переключение на страницу "Запроса отпуска"
                this.getOwnerComponent().getRouter().navTo("vacationRequest");
            } catch (error) {
                MessageToast.show("Ошибка входа!");
            }
        }
    });
});
