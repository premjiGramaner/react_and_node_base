const express = require('express');
const router = express.Router();

const loginRouter = require('./loginRouter');
const dashboardRouter = require('./dashboardRouter');
const edgeNodes = require('./edgeNodes');
const edgeApps = require('./edgeApps');

const { validateToken } = require('../middleware')
const { doLogout } = require('../controllers/login')

/* router List */
router.post("/logout", validateToken, doLogout);
router.use('/login', loginRouter)
router.use('/dashboard', dashboardRouter)
router.use('/edgeNodes', edgeNodes)
router.use('/edgeApps', edgeApps)

module.exports = router;