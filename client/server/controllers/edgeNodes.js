const { routes } = require("../helpers/constants")
const { fetchOptions, post, get } = require("../helpers/fetch")
const { loginPayloadOptimize, optmizeReq, bindHeaders, formatResponse } = require("../helpers/index")
const { loginMock } = require("../helpers/mock/login");
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getEdgeNodeList = async (req, res, next) => {
    try {
        const query = req.query;
        let url = routes.edgeNode.list + '?';

        if (query['next.pageSize'])
            url += `next.pageSize=${query['next.pageSize']}`;

        if (query['next.pageNum'])
            url += `&next.pageNum=${query['next.pageNum']}`;

        if (query['prev.pageSize'])
            url += `&prev.pageSize=${query['prev.pageSize']}`;

        if (query['prev.pageNum'])
            url += `&prev.pageNum=${query['prev.pageNum']}`;

        if (query['prev.projectName'])
            url += `&prev.projectNamePattern=${query['prev.projectName']}`;

        get(res, url).then((response) => response).then((projectList) => {
            formatResponse(res, 200, projectList?.data, "EdgeNode list fetched successfully!");
        }).catch((err) => {

            formatResponse(res, 400, err, "Failed to get EdgeNode list!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to get project list!");
    }
};


module.exports = {
    getEdgeNodeList
};