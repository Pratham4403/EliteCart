const UserModel = require('../../models/UserModel');

async function userDetailsController(req,res){
    try{
        const UserId = req.userId;
        const user = await UserModel.findById(UserId);
        
        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User Details"
        })
    }
    catch(error){
        res.status(400).json({
            message : error.message || error,
            data : [],
            success : false,
            error : true
        })
    }
}

module.exports = userDetailsController;