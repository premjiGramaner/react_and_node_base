
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

            deviceStatus: 'apps/instances/id/5e3e429a-d06c-4723-92a9-75244ee6afb1/status', // till now not in use -> can get the device status info by this
            // instances info - netStatusList -> map -> 
        },
    }
};