const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    getEdgeNodeList
} = require('../controllers/edgeNodes')

router.get("/", validateToken, getEdgeNodeList);

module.exports = router;
