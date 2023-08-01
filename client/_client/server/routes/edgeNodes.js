const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    getEdgeNodeList,
    getEdgeNodeStatusById
} = require('../controllers/edgeNodes')

router.get("/", validateToken, getEdgeNodeList);
router.get("/info/:id", validateToken, getEdgeNodeStatusById);

module.exports = router;
