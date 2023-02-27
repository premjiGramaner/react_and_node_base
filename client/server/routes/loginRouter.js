const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    doLogin,
    getLogedInUserInfo
} = require('../controllers/login')

router.post("/", doLogin);
router.get("/self", validateToken, getLogedInUserInfo);

module.exports = router;
