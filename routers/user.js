const express = require('express');
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const { getProfile } = require('../controllers/user')
const router = express.Router();

router.get('/profile', getAccessToRoute, getProfile);
module.exports = router;