const updateTokenToSession = (req, res, next) => {
    const session = req.session;
    const xrf_token = req.headers['x-access-token'] || null;

    if (xrf_token && session?.xrf !== xrf_token) {
        session.xrf = xrf_token;
    }

    next();
};


module.exports = {
    updateTokenToSession
}