const express = require('express');
const router = express.Router();

const loginRouter = require('./loginRouter');
const dashboardRouter = require('./dashboardRouter');
const edgeNodes = require('./edgeNodes');

/* router List */
router.use('/login', loginRouter)
router.use('/dashboard', dashboardRouter)
router.use('/edgeNodes', edgeNodes)

module.exports = router;