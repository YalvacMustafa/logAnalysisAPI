const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const UserSchema = new Schema({
    name : { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [emailRegex, 'Lütfen geçerli email giriniz.'] },
    password: { type: String, minlength: [6, 'Lütfen en az 6 karakter kullanınız.'], required: true, select: false },
    role: { type: String, default: 'user', enum: ['user', 'admin'], select: false },

},
    { timestamps: true },
)

UserSchema.methods.generateJwtFromUser = function() {
    const { JWT_EXPIRES, JWT_SECRET } = process.env;
    const payload = {
        id: this._id,
        name: this.name
    };

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES,
    });
    return token;
};

UserSchema.pre('save', function(next){
    if (!this.isModified('password')){
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        })
    })
})

module.exports = mongoose.model('User', UserSchema);