const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    doLogin,
    getLogedInUserInfo,
    doLogout
} = require('../controllers/login')

router.post("/", doLogin);
router.post("/logout", validateToken, doLogout);
router.get("/self", validateToken, getLogedInUserInfo);

module.exports = router;
