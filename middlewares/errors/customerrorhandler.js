const customerror = require('../../helpers/error/customerror');
const customerrorhandler = (err, req, res, next) => {
    let customError = err;

    if (err.name === 'SyntaxError'){
        customError = new customerror(err.message, 400)
    }

    if (err.name === 'ValidationError'){
        customError = new customerror(err.message, 400)
    }
    console.error('Hata: ', {
        name: err.name,
        message: err.message,
        stack: err.stack
    } )
    res.status(customError.status || 500).json({
        success: false,
        message: customError.message || 'Internal Server Error'
    })
}

module.exports = customerrorhandler;