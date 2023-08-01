const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    getProjectsList,
    getProjectStatusList,
    getProjectsWithCount
} = require('../controllers/dashboard')

router.get("/projects", validateToken, getProjectsList);
router.get("/projects/counts", validateToken, getProjectsWithCount);
router.get("/projects/status", validateToken, getProjectStatusList);

module.exports = router;
