const { routes } = require("../helpers/constants")
const { fetchOptions, post } = require("../helpers/fetch")
const { loginPayloadOptimize, optmizeReq, bindHeaders, formatResponse } = require("../helpers/index")
const { loginMock } = require("../helpers/mock/login");
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getLogedInUserInfo = async (req, res, next) => {
    const request = res?.locals?.tokenInfo || null;
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
        if (!!(payload.username && payload.password)) {
            const optionReq = await fetchOptions(routes.login, 'options', loginPayloadOptimize({
                "usernameAtRealm": payload.username,
                "password": payload.password
            }), { Connection: 'keep-alive' });
            req = optmizeReq(req, optionReq);

            const loginPost = await post(res, routes.login, loginPayloadOptimize({
                "usernameAtRealm": payload.username,
                "password": payload.password
            }), bindHeaders(req));

            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let tokenReq = {
                expire: new Date(moment().add(1, "hours")).getTime(),
                canUpdateToken: new Date(moment().add(90, "minutes")).getTime(),
                user: loginPost?.data?.detailedUser || null,
            }

            const token = jwt.sign(tokenReq, jwtSecretKey);

            res.status(200).send({ loginToken: token, xrf_token: '', statusCode: 200, data: loginPost?.data, message: 'Logged in succesfully!' })
        } else if (payload.token) {
            res.status(200).send({ internalToken, statusCode: 200, data: loginMock, message: 'Token login in succesfully!' })
        } else {
            formatResponse(res, 400, null, "Credentails are not valid! Fialed to login");
        }
    } catch (e) {
        console.log('demo test', e)
        formatResponse(res, e?.response?.data?.httpStatusCode || 400, e?.response?.data || {}, "Failed to login!");
    }
};

const doLogout = async (req, res, next) => {
    try {
        const logOutPost = await post(res, routes.logout);
        return formatResponse(res, 200, logOutPost?.data, "Session Logged out successfully!");
    } catch (e) {
        next(e);
    }
};

module.exports = {
    doLogin,
    getLogedInUserInfo,
    doLogout
};