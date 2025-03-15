const User = require('../models/user');
const customerror = require('../helpers/error/customerror');

const getProfile = async (req, res, next) => {
    try {
        const  id  = req.user.id;
        const user = await User.findById(id);

        if (!user){
            return next(new customerror('Kullanıcı bilgileri bulunamadı.', 404))
        }

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error){
        return next(new customerror('İşlem sırasında bir hata meydana geldi', 500))
    }
}

module.exports = { getProfile }