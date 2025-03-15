const customerror = require('../../helpers/error/customerror');
const jwt = require('jsonwebtoken')
const {sendJwtToClient, isTokenInCluded, getAccessTokenFromHeader} = require('../../helpers/authorization/tokenhelpers');

const getAccessToRoute = (req, res, next) => {
    const { JWT_SECRET } = process.env;
    if (!isTokenInCluded(req)){
        return next(new customerror('Buraya erişiminiz yoktur.', 401))
    };
    const access_token = getAccessTokenFromHeader(req);
    jwt.verify(access_token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new customerror('Buraya erişim yetkiniz yoktur.', 401))
        }
        req.user = {
            id: decoded._id,
            name: decoded.name
        }
        next();
    })
}
module.exports = { getAccessToRoute }