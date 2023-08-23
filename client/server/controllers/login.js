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
            return formatResponse(res, 200, request.user, 'User info successfully fetched!')
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

            const userInfo = loginPost?.data?.detailedUser || null;
            let userData = null;
            if (userInfo) {
                userData = await User.getUserById(userInfo.id);
                if (!userData && userInfo.id) {
                    await User.createUserItem({
                        userID: userInfo.id,
                        name: userInfo.fullName,
                        isTermAgreed: false,
                        enterprise: payload?.cluster || "",
                        created_on: moment().format(),
                        updated_on: moment().format()
                    });
                }

                let jwtSecretKey = process.env.JWT_SECRET_KEY || "zea-jwt@2020$";
                let tokenReq = {
                    expire: new Date(moment().add(1, "hours")).getTime(),
                    canUpdateToken: new Date(moment().add(90, "minutes")).getTime(),
                    user: loginPost?.data?.detailedUser || null,
                    isUserTermAgreed: !!userData?.isTermAgreed,
                    cluster
                }


                const token = jwt.sign(tokenReq, jwtSecretKey);

                res.status(200).send({ loginToken: token, isUserTermAgreed: !!userData?.isTermAgreed, xrf_token: '', statusCode: 200, data: loginPost.data, message: 'Logged in succesfully!' })
            } else {
                formatResponse(res, 400, data, "Could not contact cluster URL, please reach out to SysAdmin!");
            }
        } else {
            formatResponse(res, 400, null, "Invalid username or password");
        }
    } catch (e) {
        formatResponse(res, e.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Could not contact cluster URL, please reach out to SysAdmin");
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
                formatResponse(res, 400, data, "Could not contact cluster URL, please reach out to SysAdmin!");
            } else {
                const userResponse = {};
                let jwtSecretKey = process.env.JWT_SECRET_KEY || "test-jwt@2020$";

                let userData = null;
                if (data) {
                    userData = await User.getUserById(data.id);
                    if (!userData && data.id) {
                        await User.createUserItem({
                            userID: data.id,
                            name: data.fullName,
                            isTermAgreed: false,
                            enterprise: payload?.cluster || "",
                            created_on: moment().format(),
                            updated_on: moment().format()
                        });
                    }
                }

                let tokenReq = {
                    expire: new Date(moment().add(1, "hours")).getTime(),
                    canUpdateToken: new Date(moment().add(90, "minutes")).getTime(),
                    user: data,
                    isUserTermAgreed: !!userData?.isTermAgreed,
                    cluster
                }

                const token = jwt.sign(tokenReq, jwtSecretKey);
                if (data) {
                    userResponse["cause"] = "OK";
                    userResponse["userId"] = data.id;
                    userResponse['token'] = { "base64": payload.token };
                    userResponse['detailedUser'] = { ...data };
                };

                res.status(200).send({ loginToken: token, isUserTermAgreed: !!userData?.isTermAgreed, statusCode: 200, data: userResponse, message: 'Token login in succesfully!' })
            }
        } else {
            formatResponse(res, 400, null, "Provided token is not valid! please reach out to SysAdmin");
        }
    } catch (e) {
        formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, "Could not contact cluster URL, please reach out to SysAdmin");
    }
};

const updateTerm = async (req, res, next) => {
    const { userID, agreeStatus } = req.body;
    try {
        if (userID) {
            
            const updateRequest = await User.updateUserItem(userID, agreeStatus, moment().format());
            return formatResponse(res, 200, { status: updateRequest }, 'Terms of service updated successfully!')
        } else {
            return formatResponse(res, 400, { status: null }, 'User id not exist to update Terms of service!')
        }
    } catch (e) {
        formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, "Could not contact cluster URL, please reach out to SysAdmin");
    }
};

const doLogout = async (req, res, next) => {
    try {
        const logOutPost = await post(res, routes.logout);
        return formatResponse(res, 200, logOutPost.data, "Session Logged out successfully!");
    } catch (e) {
        return formatResponse(res, e.response?.data?.httpStatusCode || 400, e.response?.data || {}, "Could not contact cluster URL, please reach out to SysAdmin");
    }
};

module.exports = {
    doLogin,
    getLogedInUserInfo,
    doLogout,
    doLoginWithToken,
    updateTerm
};