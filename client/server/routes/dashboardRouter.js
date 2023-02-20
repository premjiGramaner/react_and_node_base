const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const {
    getProjectsList,
    getProjectStatusList
} = require('../controllers/dashboard')

router.get("/projects", validateToken, getProjectsList);
router.get("/projects/status", validateToken, getProjectStatusList);

module.exports = router;
