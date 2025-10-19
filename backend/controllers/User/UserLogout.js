const AddToCartModel = require("../../models/AddToCartModel");

async function UserLogout(req,res){
    try{

        const userId = req.userId;
        res.clearCookie("token");

        res.status(200).json({
            message : "Logged out successfully",
            success : true,
            error : false,
            data : []
        });
    }
    catch(error){
        res.json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = UserLogout;