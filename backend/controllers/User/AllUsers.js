const UserModel = require("../../models/UserModel");

async function AllUsers(req,res){
    try{
        const allUsers = await UserModel.find({});
        res.status(200).json({
            message : "All users Found",
            data : allUsers,
            success : true,
            error : false
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

module.exports = AllUsers;