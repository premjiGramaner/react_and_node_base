const { baseURL, routes } = require("../helpers/constants")
const { fetchOptions, post, get } = require("../helpers/fetch")
const { loginPayloadOptimize, optmizeReq, bindHeaders, formatResponse } = require("../helpers/index")
const { transform } = require("../helpers/transformer")
const { loginMock } = require("../helpers/mock/login");
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getProjectsList = async (req, res, next) => {
    try {
        get(res, routes.projects.list).then((response) => transform(baseURL(), 'projects', response?.data)).then((projectList) => {
            formatResponse(res, 200, projectList, "Project list fetched successfully!");
        }).catch((err) => {
            
            formatResponse(res, 500, err, "Failed to get project list!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to get project list!");
    }
};

const getProjectStatusList = async (req, res, next) => {
    try {
        get(res, routes.projects.status).then((response) => response).then((statusList) => {
            formatResponse(res, 200, statusList?.data, "Projects status list fetched successfully!");
        }).catch((err) => {
            formatResponse(res, 400, err, "Failed to get projects status list!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to get projects status list!");
    }
};


module.exports = {
    getProjectsList,
    getProjectStatusList
};