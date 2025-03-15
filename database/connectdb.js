const mongoose = require('mongoose');

const connectdb = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then (() => {
        console.log('Veritabanına bağlantı başarılı')
    })
    .catch(err => {
        console.error(err)
    })
}

module.exports = connectdb;