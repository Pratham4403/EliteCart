const jwt = require('jsonwebtoken');
async function AuthToken(req,res,next){
    try{
        const token = req.cookies?.token;

        if(!token){
            return res.status(400).json({
                message : "Please Login to continue!",
                success : false,
                error : true
            });
        }

        jwt.verify(token,process.env.TOKEN_SECRET_KEY,function(error,decoded){
            if(error){
                console.log("Error auth",error);
            }
            req.userId = decoded?._id;
            next();
        });
    }
    catch(error){
        res.status(404).json({
            message : error.message || error,
            data : [],
            success : false,
            error : true
        })
    }
}

module.exports = AuthToken;