const getLogedInUserInfo = async (req, res, next) => {
    const session = req.session;
    try {
        if (session?.userInfo) {
            res.status(200).send({ data: session.userInfo, message: 'user info successfully fetched!' })
        } else {
            res.status(200).send({ data: false, message: 'session timed out!' })
        }
    } catch (e) {
        next(e);
    }
};

const doLogin = async (req, res, next) => {
    try {
        const session = req.session;
        session.userInfo = req.body;

        res.status(200).send({ data: session.userInfo, message: 'Logged in succesfully!' })
    } catch (e) {
        next(e);
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