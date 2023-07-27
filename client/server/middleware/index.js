const jwt = require('jsonwebtoken');
const { formatResponse } = require('../helpers/index');


const updateTokenToSession = (req, res, next) => {
    const session = req.session;
    const xrf_token = req.headers['x-access-token'] || null;

    if (xrf_token && session.xrf !== xrf_token) {
        session.xrf = xrf_token;
    }

    next();
};

const validateToken = (req, res, next) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        if (req.body.token && req.body.accessWithToken) {
            const client_token = req.body.token || null;
            if (client_token) {
                res.locals.client_token = client_token;

                return next();
            }
        } else {
            let token = (req.headers['authorization'] || req.headers['Authorization']).toString().replace(/^Bearer\s+/, "");
            const verified = jwt.verify(token, jwtSecretKey);
            if (verified) {
                var decoded = jwt.decode(token);
                res.locals.tokenInfo = decoded;
                res.locals.cluster = decoded.cluster;

                const client_token = req.headers['client-access-token'] || null;
                if (client_token) {
                    res.locals.client_token = client_token;
                }

                return next();
            }
        }

        return formatResponse(res, 401, error, 'Un Authorised accees, Token not valid!');
    } catch (error) {
        return res.status(401).send(error);
    }
};


module.exports = {
    updateTokenToSession,
    validateToken
}