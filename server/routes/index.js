const express = require('express');
const router = express.Router();

const testRouter = require('./testRouter');




router.use('/test', testRouter)
module.exports = router;