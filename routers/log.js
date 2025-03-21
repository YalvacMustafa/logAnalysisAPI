const express = require('express');
const { createLog, getAllLogOfUser, getSingleLogOfUser, getUserLogs, deleteLog } = require('../controllers/logController')
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const router = express.Router();

router.post('/create', getAccessToRoute, createLog)
router.get('/', getAccessToRoute, getAllLogOfUser)
router.get('/single/:logId', getAccessToRoute, getSingleLogOfUser)
router.get('/level/:level?', getAccessToRoute, getUserLogs)
router.delete('/delete/:logId', getAccessToRoute, deleteLog)
module.exports = router;