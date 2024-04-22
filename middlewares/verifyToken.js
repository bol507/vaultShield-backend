const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET, async(err, user) => {
            if(err){
                return res.status(403).json({status:false, message:'invalid token'});
            }
            req.user = user;
            next();

        })

    }
}

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req,res, () => {
        if(req.user.userType === 'Client' || req.user.userType === 'Admin'){
            next();
        }else{
           return res.status(403).json({status: false, message: "You are not authorized"})
        }
    })
}

module.exports = {verifyToken, verifyAndAuthorization} 