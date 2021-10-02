const dotenv = require('dotenv').config()

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
        const userId = decodedToken.userId;
        req.body.onlineUser = userId
        if(req.body.userId && req.body.userId !== userId){
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch{
        res.status(401).json({
            error: new Error ('Invalid request !')
        });
    }
};