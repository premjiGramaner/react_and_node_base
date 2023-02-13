
function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        return res.status(200).json({ message: err, success: false });
    }

    if (err?.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token', success: false });
    }

    if (err?.hasOwnProperty('data')) {
        return res.status(200).json({ message: err.message, data: err.data, success: false });
    } else {
        return res.status(500).json({ message: err.message, success: false });
    }
}

const loginPayloadOptimize = (loginInfo = {}) => {
    return ({
        ...loginInfo,
        "verboseDetailedUser": true,
        "verboseEnterprise": true,
        "verboseRealm": true
    })
}

const optmizeReq = (req, response) => {
    const tokenInfo = {
        "x-csrf-token": response.headers['x-csrf-token'],
        "x-content-type-options": response.headers['x-content-type-options'],
        "x-frame-options": response.headers['x-frame-options'],
        "cf-cache-status": response.headers['cf-cache-status'],
    }

    req['tokenInfo'] = tokenInfo;
    return req;
};

const bindHeaders = (req) => {
    return ({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        ...(req?.tokenInfo || {})
    })
}

const convertCircular = () => {
    const visited = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (visited.has(value)) {
                return;
            }
            visited.add(value);
        }
        return value;
    };
};


module.exports = { errorHandler, loginPayloadOptimize, convertCircular, optmizeReq, bindHeaders };