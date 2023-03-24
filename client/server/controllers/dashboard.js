const { baseURL, routes } = require("../helpers/constants")
const { fetchOptions, post, get } = require("../helpers/fetch")
const { loginPayloadOptimize, optmizeReq, bindHeaders, formatResponse } = require("../helpers/index")
const { transform } = require("../helpers/transformer")
const { loginMock } = require("../helpers/mock/login");
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getProjectsList = async (req, res, next) => {
    try {
        get(res, routes.projects.list).then((response) => transform(baseURL(), 'projects', response.data)).then((projectList) => {
            formatResponse(res, 200, projectList, "Project list fetched successfully!");
        }).catch((err) => {
            formatResponse(res, 500, err, "Failed to get project list!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, "Failed to get project list!");
    }
};

const appendCountOnprojects = (res, projects = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (projects.data.length) {
                const finalList = [];
                projects.data.forEach(async (item) => {
                    const edgeNode = await get(res, routes.edgeNode.list + `?&projectNamePattern=${item.name}`); // edgeNodeCount
                    const edgeApp = await get(res, routes.edgeApp.list + `?&projectNamePattern=${item.name}`); // edgeAppCount
                    finalList.push({
                        ...item,
                        edgeNodeCount: edgeNode.data.totalCount || 0,
                        edgeAppCount: edgeApp.data.totalCount || 0,
                    });

                    if (finalList.length === projects.data.length) {
                        projects['data'] = finalList;
                        resolve(projects);
                    }
                })
            };
        } catch (error) {
            reject(projects);
        }
    })
}

const getProjectsWithCount = async (req, res, next) => {
    try {
        get(res, routes.projects.list)
            .then((response) => transform(baseURL(), 'projects', response.data))
            .then(async (projectList) => {
                const projects = await appendCountOnprojects(res, projectList);
                formatResponse(res, 200, projects, "Project list fetched successfully!");
            }).catch((err) => {
                formatResponse(res, 500, err, "Failed to get project list!");
            });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, "Failed to get project list!");
    }
};

const getProjectStatusList = async (req, res, next) => {
    try {
        get(res, routes.projects.status).then((response) => response).then((statusList) => {
            formatResponse(res, 200, statusList.data, "Projects status list fetched successfully!");
        }).catch((err) => {
            formatResponse(res, 400, err, "Failed to get projects status list!");
        });
    } catch (e) {
        console.log('fail *******', e);
        return formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, "Failed to get projects status list!");
    }
};


module.exports = {
    getProjectsList,
    getProjectStatusList,
    getProjectsWithCount
};