module.exports = { errorHandler };

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