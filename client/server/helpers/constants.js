
const baseURL = (type) => {
    if (!type) {
        return process.env.API_END_POINT + "/api/";
    }
}

module.exports = {
    baseURL,
    version: process.env.API_END_POINT_VERSION + "/",
    routes: {
        login: 'login',
        loginWithToken: 'users/self',
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
            endgeInstanceInfo: 'apps/instances/id/{id}/status'
        },
    },
    networkStatus: {
        local: 'NETWORK_INSTANCE_KIND_LOCAL',
        switch: 'NETWORK_INSTANCE_KIND_SWITCH',
    }
};