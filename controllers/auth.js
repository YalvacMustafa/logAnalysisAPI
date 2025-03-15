const User = require('../models/user');
const customerror = require('../helpers/error/customerror');
const { sendJwtToClient } = require('../helpers/authorization/tokenhelpers');
const { validateUserInput, comparePassword } = require('../helpers/input/inputhelpers');

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password
    });
    sendJwtToClient(user, res);
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!validateUserInput(email, password)){
        return next(new customerror('Lütfen girdilerinizi kontrol ediniz.', 400))
    }
    const user = await User.findOne({ email }).select('+password');
    if (!comparePassword(password, user.password)){
        return next(new customerror('Parola yanlış', 400))
    }
    sendJwtToClient(user, res)
};
module.exports = { register, login }