const express = require('express');
const { createLog } = require('../controllers/logController')
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const router = express.Router();

router.post('/create', getAccessToRoute, createLog)
module.exports = router;