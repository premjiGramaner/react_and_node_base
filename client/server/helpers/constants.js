
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
        loginWithToken: 'user/self',
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

            deviceStatus: 'devices/id/{id}/status/info', // till now not in use -> can get the device status info by this
            localInstanceInfo: 'netinsts/id/{id}/status',
            switchInstanceInfo: 'apps/instances/id/{id}/status'
        },
    },
    networkStatus: {
        local: 'NETWORK_INSTANCE_KIND_LOCAL',
        switch: 'NETWORK_INSTANCE_KIND_SWITCH',
    }
};