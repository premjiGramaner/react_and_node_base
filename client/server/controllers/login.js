const { routes } = require("../helpers/constants")
const { fetchOptions, post, get } = require("../helpers/fetch")
const { loginPayloadOptimize, optmizeReq, bindHeaders, formatResponse, getClusterHost } = require("../helpers/index")
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { User } = require("../models");

const getLogedInUserInfo = async (req, res, next) => {
    const request = res.locals.tokenInfo || null;
    try {
        if (request) {
            return formatResponse(res, 200, request.user, 'user info successfully fetched!')
        } else {
            return formatResponse(res, 401, null, 'session timed out!')
        }
    } catch (e) {
        next(e);
    }
};

const doLogin = async (req, res, next) => {
    try {
        const payload = req.body || {}
        const cluster = getClusterHost(payload.cluster);
        if (!cluster) {
            return formatResponse(res, 400, null, "Provided Cluster is not exist.");
        }

        if (!!(payload.username && payload.password)) {
            const optionReq = await fetchOptions(cluster, routes.login, 'options', loginPayloadOptimize({
                "usernameAtRealm": payload.username,
                "password": payload.password
            }), { Connection: 'keep-alive' });
            req = optmizeReq(req, optionReq);

            const loginPost = await post(res, `${cluster}version${routes.login}`, loginPayloadOptimize({
                "usernameAtRealm": payload.username,
                "password": payload.password
            }), bindHeaders(req));

            let jwtSecretKey = process.env.JWT_SECRET_KEY || "zea-jwt@2020$";
            let tokenReq = {
                expire: new Date(moment().add(1, "hours")).getTime(),
                canUpdateToken: new Date(moment().add(90, "minutes")).getTime(),
                user: loginPost.data.detailedUser || null,
                cluster
            }

            const userInfo = tokenReq.user || null;
            if (userInfo) {
                const userData = await User.getUserById(tokenReq.user.id);
                if (!userData && tokenReq.user.id) {
                    await User.createUserItem({
                        userID: userInfo.id,
                        name: userInfo.fullName,
                        isTermAgreed: false,
                        enterprise: payload?.cluster || "",
                        created_on: moment().format(),
                        updated_on: moment().format()
                    });
                }
            }

            const token = jwt.sign(tokenReq, jwtSecretKey);

            res.status(200).send({ loginToken: token, xrf_token: '', statusCode: 200, data: loginPost.data, message: 'Logged in succesfully!' })
        } else {
            formatResponse(res, 400, null, "Credentails are not valid! Failed to login");
        }
    } catch (e) {
        formatResponse(res, e.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to login!");
    }
};

const doLoginWithToken = async (req, res, next) => {
    try {
        const payload = req.body || {}
        const cluster = getClusterHost(payload.cluster);
        if (!cluster) {
            return formatResponse(res, 400, null, "Provided Cluster is not exist.");
        }
        
        if (payload.token) {
            req = optmizeReq(req, res, payload.token);
            const loginGet = await get(res, `${cluster}version${routes.loginWithToken}`);
            const data = loginGet.data || null;

            if (!data) {
                formatResponse(res, 400, data, "The requested resource was not found on this server!");
            } else {
                const userResponse = {};
                let jwtSecretKey = process.env.JWT_SECRET_KEY || "test-jwt@2020$";
                let tokenReq = {
                    expire: new Date(moment().add(1, "hours")).getTime(),
                    canUpdateToken: new Date(moment().add(90, "minutes")).getTime(),
                    user: data,
                    cluster
                }

                const token = jwt.sign(tokenReq, jwtSecretKey);
                if (data) {
                    userResponse["cause"] = "OK";
                    userResponse["userId"] = data.id;
                    userResponse['token'] = { "base64": payload.token }
                    userResponse['detailedUser'] = { ...data };
                };

                res.status(200).send({ loginToken: token, statusCode: 200, data: userResponse, message: 'Token login in succesfully!' })
            }
        } else {
            formatResponse(res, 400, null, "Credentails are not valid! Failed to login");
        }
    } catch (e) {
        formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, "Failed to login!");
    }
};

const updateTerm = async (req, res, next) => {
    const { userID, agreeStatus } = req.body;
    try {
        if (userID) {
            const updateRequest = User.updateUserItem(userID, agreeStatus, moment().format());
            return formatResponse(res, 200, { status: updateRequest }, 'Terms of service updated successfully!')
        } else {
            return formatResponse(res, 400, { status: null }, 'User id not exist to update Terms of service!')
        }
    } catch (e) {
        formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, "Terms of service update failed!");
    }
};

const doLogout = async (req, res, next) => {
    try {
        const logOutPost = await post(res, routes.logout);
        return formatResponse(res, 200, logOutPost.data, "Session Logged out successfully!");
    } catch (e) {
        return formatResponse(res, e.response?.data?.httpStatusCode || 400, e.response?.data || {}, "Failed to log out!");
    }
};

module.exports = {
    doLogin,
    getLogedInUserInfo,
    doLogout,
    doLoginWithToken,
    updateTerm
};