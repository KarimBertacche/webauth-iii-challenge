const jwt = require('jsonwebtoken');
const secret = require('../secret');

module.exports = (req, res, next) => {
    const token = req.header.authorization;

    if(token) {
        jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
            if(error) {
                res.status(401).json({
                    message: 'Error while verifying token'
                });
            } else {
                req.decodedToken = decodedToken;

                next();
            }
        })
    } else {
        res.status(401).json({
            message: 'You shall not pass!!'
        });
    }
}