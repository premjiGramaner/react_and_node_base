const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    doLogin,
    getLogedInUserInfo,
    doLoginWithToken,
    updateTerm
} = require('../controllers/login')

router.post("/", doLogin);
router.post("/with-token", validateToken, doLoginWithToken);
router.get("/self", validateToken, getLogedInUserInfo);
router.get("/updateTerm", validateToken, updateTerm);

module.exports = router;
