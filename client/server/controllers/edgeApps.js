const { routes } = require("../helpers/constants")
const { fetchOptions, put, get } = require("../helpers/fetch")
const { loginPayloadOptimize, optmizeReq, bindHeaders, formatResponse } = require("../helpers/index")
const { loginMock } = require("../helpers/mock/login");
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getEdgeAppList = async (req, res, next) => {
    try {
        const query = req.query;
        let url = routes.edgeApp.list + '?';

        if (query['next.pageSize'])
            url += `next.pageSize=${query['next.pageSize']}`;

        if (query['next.pageNum'])
            url += `&next.pageNum=${query['next.pageNum']}`;

        if (query['appName'])
            url += `&appName=${query['appName']}`;

        if (query['projectName'])
            url += `&projectNamePattern=${query['projectName']}`;


        get(res, url).then((response) => response).then((appList) => {
            formatResponse(res, 200, appList?.data, "EdgeApp list fetched successfully!");
        }).catch((err) => {

            formatResponse(res, 400, err, "Failed to get EdgeApp list!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to get project list!");
    }
};

const getEdgeAppById = async (req, res, next) => {
    const id = req.params?.id;

    if (!id) {
        return formatResponse(res, 400, {}, "Failed to get EdgeApp info!, App id is missing");
    }

    try {
        let url = routes.edgeApp.byID + id;
        get(res, url).then((response) => response).then((appInfo) => {

            // brgin logic here
            // interfaces -> map
            // netinstid -> 468dabff-89b3-499a-9769-e792813ec898(defaultLocal-BG-supermicro-EL1) intfname(eth0)

            // list API - https://zedcontrol.gmwtus.zededa.net/api/v1/netinsts/status-config?next.pageSize=20&next.pageNum=1 -> id, name
            // https://zedcontrol.gmwtus.zededa.net/api/v1/netinsts/id/468dabff-89b3-499a-9769-e792813ec898

            
            formatResponse(res, 200, appInfo?.data, "EdgeApp info fetched successfully!");
        }).catch((err) => {

            formatResponse(res, 400, err, "Failed to get EdgeApp info!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to get project list!");
    }
};

const updateAppStatus = async (req, res, next) => {
    const { id, status } = req.params || {};

    if (!id) {
        return formatResponse(res, 400, {}, "Failed to Update Device status!, App id is missing");
    }

    try {
        let url = routes.edgeApp.stateUpdate.replace('{id}', id) + status;
        put(res, url).then((response) => response).then((appInfo) => {
            let resOptimized = {};
            if (appInfo?.data?.httpStatusCode === 200 && appInfo?.data?.httpStatusMsg) {
                resOptimized = { ...appInfo?.data };
                resOptimized['httpStatusMsg'] = JSON.parse(appInfo?.data?.httpStatusMsg);
            } else {
                resOptimized = appInfo?.data;
            }
            formatResponse(res, 200, resOptimized, "Device status Updated successfully!");
        }).catch((err) => {
            formatResponse(res, 400, err, "Failed to Update Device status!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to Update Device status!");
    }
};

const downloadAppScript = async (req, res, next) => {
    const id = req.params?.id;

    if (!id) {
        return formatResponse(res, 400, {}, "Failed to download!, App id is missing");
    }

    try {
        let url = routes.edgeApp.downloadScript.replace('{id}', id);
        get(res, url).then((appInfo) => {
            formatResponse(res, 200, appInfo.data, "Script downloaded successfully!");
        }).catch((err) => {
            console.log('ewewe', err.message);
            formatResponse(res, 400, err, "Failed to downloaded!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to get project list!");
    }
};

module.exports = {
    getEdgeAppList,
    getEdgeAppById,
    updateAppStatus,
    downloadAppScript
};