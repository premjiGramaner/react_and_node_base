const express = require('express');
const router = express.Router();

const loginRouter = require('./loginRouter');

/* router List */
router.use('/login', loginRouter)

module.exports = router;