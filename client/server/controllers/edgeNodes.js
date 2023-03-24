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

        if (query['projectName'])
            url += `&projectNamePattern=${query['projectName']}`;

        get(res, url).then((response) => response).then((deviceList) => {
            const deviceData = deviceList?.data || null;
            const deviceInfoList = [];
            // This function used to get the addional device info
            if (deviceData?.list?.length) {
                deviceData.list.forEach(async (item, index) => {
                    const deviceInfo = await get(res, routes.edgeNode.deviceStatusById.replace('{id}', item.id)); // edgeDevice Info
                    item['status'] = deviceInfo?.data?.state || null;
                    item['shortVersion'] = ((item.swInfo || []).find((sw) => sw.activated) || null)?.shortVersion || "";
                    deviceInfoList.push(item);

                    // When the loop gets end - We are triggering the Action
                    if (deviceInfoList.length === deviceData.list.length) {
                        deviceData["list"] = deviceInfoList;
                        return formatResponse(res, 200, deviceData, "EdgeNode list with info fetched successfully!");
                    }
                })
            } else {
                formatResponse(res, 200, deviceData, "EdgeNode list fetched successfully!");
            }
        }).catch((err) => {
            formatResponse(res, 400, err, "Failed to get EdgeNode list!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to get EdgeNode list!");
    }
};

const getEdgeNodeStatusById = async (req, res, next) => {
    try {
        const { id } = req.params;
        get(res, routes.edgeNode.deviceStatusById.replace('{id}', id)).then((deviceInfo) => {
            return formatResponse(res, 200, deviceInfo?.data || null, "EdgeNode info fetched successfully!");
        }).catch((err) => {
            formatResponse(res, 400, err, "Failed to get EdgeNode info!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to get EdgeNode info!");
    }
};


module.exports = {
    getEdgeNodeList,
    getEdgeNodeStatusById
};