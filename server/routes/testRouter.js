const express = require('express');
const router = express.Router();

const {
    update,
    create,
    getApi,
    deleteUser
} = require('../controllers/test')

router.get("/", getApi);
router.post("/", create);
router.put("/", update);
router.delete("/:id", deleteUser);

module.exports = router;
