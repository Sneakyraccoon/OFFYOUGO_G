sap.ui.define(["sap/ui/core/util/MockServer"], (MockServer) => {
    "use strict";

    return {
        init: () => {
            const oMockServer = new MockServer({ rootUri: "/api/" });

            const aUsers = [
                { id: 1, email: "user1@example.com", password: "pass1", name: "Иван", department: "IT", vacationDays: 15, role: "user", managerId: 3 },
                { id: 3, email: "manager@example.com", password: "admin", name: "Анна", role: "manager" }
            ];

            oMockServer.setRequests([
                {
                    method: "POST",
                    path: "login",
                    response: (oXhr) => {
                        const oData = JSON.parse(oXhr.requestBody);
                        const oUser = aUsers.find(user => user.email === oData.email && user.password === oData.password);
                        oXhr.respondJSON(oUser ? 200 : 401, {}, JSON.stringify(oUser || { error: "Неверные данные" }));
                    }
                }
            ]);

            oMockServer.start();
        }
    };
});


oMockServer.setRequests([
    {
        method: "POST",
        path: "vacation",
        response: (oXhr) => {
            const oData = JSON.parse(oXhr.requestBody);
            aRequests.push({ ...oData, id: aRequests.length + 1 });

            // Найти менеджера
            const manager = aUsers.find(u => u.id === oData.managerId);
            if (manager) {
                aInboxes.push({ 
                    recipientId: manager.id, 
                    requestId: oData.id, 
                    userName: "User " + oData.userId, 
                    startDate: oData.startDate, 
                    endDate: oData.endDate, 
                    status: "pending"
                });
            }

            oXhr.respondJSON(201, {}, JSON.stringify({ message: "Запрос отправлен" }));
        }
    },
    {
        method: "GET",
        path: "inbox/(\\d+)",
        response: (oXhr, requestId) => {
            const managerId = Number(requestId);
            const managerInbox = aInboxes.filter(i => i.recipientId === managerId);
            oXhr.respondJSON(200, {}, JSON.stringify(managerInbox));
        }
    },
    {
        method: "POST",
        path: "approve",
        response: (oXhr) => {
            const { requestId, decision } = JSON.parse(oXhr.requestBody);
            const request = aRequests.find(r => r.id === requestId);
            if (request) request.status = decision;

            const userInbox = aInboxes.find(i => i.requestId === requestId);
            if (userInbox) {
                userInbox.status = decision;
            }

            oXhr.respondJSON(200, {}, JSON.stringify({ message: `Заявка ${decision}` }));
        }
    }
]);
