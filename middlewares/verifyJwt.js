const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.status(401).json({
            message: 'no token available!'
        })
    }
    
    try {
        jwt.verify(req.headers['authorization'], process.env.PRIVATEKEY);
        next();                
        
    } catch(err){
        console.log(err);
        res.status(401).json({
            message: 'token is not available!'
        })
    }
}

module.exports = {
    verifyJwt
}