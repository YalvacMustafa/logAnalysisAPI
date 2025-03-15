const User = require('../models/user');
const customerror = require('../helpers/error/customerror');
const { sendJwtToClient } = require('../helpers/authorization/tokenhelpers');

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password
    });
    sendJwtToClient(user, res);
};

module.exports = { register }