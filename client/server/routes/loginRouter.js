const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    doLogin,
    getLogedInUserInfo,
    doLoginWithToken
} = require('../controllers/login')

router.post("/", doLogin);
router.post("/with-token", validateToken, doLoginWithToken);
router.get("/self", validateToken, getLogedInUserInfo);

module.exports = router;
