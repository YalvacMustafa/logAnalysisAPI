const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');
const log = require('./log');

router.use('/auth', auth)
router.use('/user', user)
router.use('/log', log)


module.exports = router;