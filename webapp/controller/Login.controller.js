sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ui5.vacation.controller.Login", {
        onLogin: async function () {
            const email = this.getView().byId("emailInput").getValue();
            const password = this.getView().byId("passwordInput").getValue();

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
        this.getOwnerComponent().getModel("userModel").setData(userData);

        // Переключение на страницу "Запроса отпуска"
        this.getOwnerComponent().getRouter().navTo("vacationRequest");
            } catch (error) {
                MessageToast.show("Ошибка входа!");
            }
        }
    });
});
