const express = require('express');
const router = express.Router();

const {
    doLogin,
    getLogedInUserInfo,
    doLogout
} = require('../controllers/login')

router.post("/", doLogin);
router.post("/logout", doLogout);
router.get("/self", getLogedInUserInfo);

module.exports = router;
