const express = require('express');
const router = express.Router();

const {
    doLogin,
    getLogedInUserInfo,
    doLogout
} = require('../controllers/login')

router.get("/login", doLogin);
router.get("/logout", doLogout);
router.get("/self", getLogedInUserInfo);

module.exports = router;
