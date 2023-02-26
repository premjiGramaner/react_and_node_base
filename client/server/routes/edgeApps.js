const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    getEdgeAppList,
    getEdgeAppById
} = require('../controllers/edgeApps')

router.get("/", validateToken, getEdgeAppList);
router.get("/:id", validateToken, getEdgeAppById);

module.exports = router;
