const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const logSchmea = new Schema({
    message: { type: String, required: true },
    level: { type: String, enum: ['info', 'warn', 'error'], required: true },
    timeStamp: { type: Date, default: Date.now },
    metadata: { type: Object },
    insights: { type: Object, default: null }
})

module.exports = mongoose.model('Log', logSchmea)