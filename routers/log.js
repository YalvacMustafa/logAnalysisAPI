const express = require('express');
const { createLog, getAllLogOfUser, getSingleLogOfUser, getUserLogs } = require('../controllers/logController')
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const router = express.Router();

router.post('/create', getAccessToRoute, createLog)
router.get('/', getAccessToRoute, getAllLogOfUser)
router.get('/:logId', getAccessToRoute, getSingleLogOfUser)
router.get('/:level?', getAccessToRoute, getUserLogs)
module.exports = router;