const {
    CLUSTER_INFO
} = require("../default-constant");

function errorHandler(err, req, res, next) {
    console.log('********* Middleware error **********', err);
    console.log('----------------------------------------------------------');
    if (typeof (err) === 'string') {
        return res.status(200).json({ message: err, success: false });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token', success: false });
    }

    if (err.hasOwnProperty('data')) {
        return res.status(200).json({ message: err.message, data: err.data, success: false });
    } else {
        return res.status(500).json({ message: err.message, data: err.body || err, type: err.type || null, success: false });
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

const optmizeReq = (req, response, token) => {
    const tokenInfo = {
        "X-Csrf-Token": token || response.headers['X-Csrf-Token']
    }

    req['tokenInfo'] = tokenInfo;
    return req;
};

/* Right now x-csrf token concept got removed so binding hard coded! */
const bindHeaders = (req) => {
    return ({
        "content-type": "application/json",
        "x-csrf-token": "bgXqsfrdH6G2iDmxF7tBPie6LVtKdXR5tWamrE1Bz+eUxG4Vs+xl3md9QSxxNb35ecUKv3E37NC3uqfYcXynqw=="
    })
}

const formatResponse = (res, code, data, message) => {
    return res.status(code).send({ statusCode: code, data, message: message });
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

const getClusterHost = (host) => {
    const cluster = host ? String(host).toLowerCase() : undefined;
    if (cluster && CLUSTER_INFO[cluster]) {
        return (`https://${CLUSTER_INFO[cluster]}/api/`);
    } else if (!cluster) {
        return (`https://${CLUSTER_INFO["prod"]}/api/`);
    }

    return undefined;
}

module.exports = { errorHandler, formatResponse, loginPayloadOptimize, convertCircular, optmizeReq, bindHeaders, getClusterHost };