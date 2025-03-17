const express = require('express');
const dotenv = require('dotenv');
const connectdb = require('./database/connectdb');
const customerrorhandler = require('./middlewares/errors/customerrorhandler');
const router = require('./routers/main.js')

dotenv.config({
    path: './configs/config.env'});

connectdb();

const app = express();
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT
app.use('/', router)
app.use(customerrorhandler)
app.listen(PORT, () => {
    console.log('Server başlatıldı.');
})