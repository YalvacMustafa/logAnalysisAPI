const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/authorization/auth')
router.post('/register', register);
router.post('/login', login);
router.get('/logout', getAccessToRoute, logout)
module.exports = router;