
const baseURL = (type) => {
    if (!type) {
        return "https://zedcontrol.gmwtus.zededa.net/api/";
    }
}

module.exports = {
    baseURL,
    version: "v1/",
    routes: {
        login: 'login',
        logout: 'logout',
        projects: {
            list: 'projects',
            status: 'projects/status'
        },
        edgeNode: {
            list: 'devices/status-config',
            getByFilter: 'devices/status-config',
            deviceStatusById: 'devices/id/{id}/status/edgeview',
        },
        edgeApp: {
            list: 'apps/instances/status-config',
            getByFilter: 'apps/instances/status-config',
            byID: 'apps/instances/id/',
            stateUpdate: 'devices/id/{id}/edgeview/',
            downloadScript: 'devices/id/{id}/edgeview/clientscript',
        },
    }
};