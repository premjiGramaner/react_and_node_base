const { routes } = require("../helpers/constants")
const { fetchOptions, post } = require("../helpers/fetch")
const { loginPayloadOptimize, optmizeReq, bindHeaders } = require("../helpers/index")
const getLogedInUserInfo = async (req, res, next) => {
    const request = req['tokenInfo'];
    try {
        if (request?.tokenInfo) {
            res.status(200).send({ data: request.tokenInfo, message: 'user info successfully fetched!' })
        } else {
            res.status(200).send({ data: false, message: 'session timed out!' })
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
            }));

            req = optmizeReq(req, optionReq);
            const loginPost = await post(routes.login, loginPayloadOptimize({
                "usernameAtRealm": payload.username,
                "password": payload.password
            }), bindHeaders(req))

            res.status(200).send({ tokenInfo: req.tokenInfo, data: loginPost.response, message: 'Logged in succesfully!' })
        } else if (payload.token) {
            res.status(200).send({ data: null, message: 'Token login in succesfully!' })
        } else {
            res.status(400).send({ data: null, message: 'Credentails are not valid! Fialed to login' })
        }
    } catch (e) {
        res.status(e?.response?.data?.httpStatusCode || 400).send({ data: e?.response?.data || {}, status: e?.response?.data?.httpStatusCode, message: 'Failed to login user' })
    }
};

const doLogout = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) return next(err);
            res.status(200).send({ data: true, message: 'User Logged out succesfully!' })
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    doLogin,
    getLogedInUserInfo,
    doLogout
};