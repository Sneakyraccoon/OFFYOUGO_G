sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
    
  ], function (UIComponent, JSONModel) {
    "use strict";
  
    return UIComponent.extend("ui5.vacation.Component", {
      metadata: {
        manifest: "json"
      },
  
      init: function () {
        // Инициализация MockServer
// Безопасный запуск MockServer (можно временно закомментировать)
// if (mockserver && typeof mockserver.init === "function") {
//   mockserver.init();
// }
  
        // Вызов init родительского компонента
        UIComponent.prototype.init.apply(this, arguments);
  
        // Установка модели пользователя
        var oUserModel = new JSONModel();
        this.setModel(oUserModel, "userModel");
  
        // Инициализация маршрутизатора
        this.getRouter().initialize();
      }
    });
  });
  