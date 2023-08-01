const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    getEdgeAppList,
    getEdgeAppById,
    updateAppStatus,
    downloadAppScript
} = require('../controllers/edgeApps')

router.get("/", validateToken, getEdgeAppList);
router.get("/:id", validateToken, getEdgeAppById);
router.put("/status/:id/:status", validateToken, updateAppStatus);
router.get("/download-script/:id", validateToken, downloadAppScript);

module.exports = router;
