const { routes } = require("../helpers/constants")
const { fetchOptions, post, get } = require("../helpers/fetch")
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

        if (query['prev.appName'])
            url += `&prev.appName=${query['prev.appName']}`;

        if (query['prev.projectName'])
            url += `&prev.projectNamePattern=${query['prev.projectName']}`;


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
            formatResponse(res, 200, appInfo?.data, "EdgeApp info fetched successfully!");
        }).catch((err) => {

            formatResponse(res, 400, err, "Failed to get EdgeApp info!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to get project list!");
    }
};

module.exports = {
    getEdgeAppList,
    getEdgeAppById
};