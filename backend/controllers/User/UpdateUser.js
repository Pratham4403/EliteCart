const UserModel = require("../../models/UserModel");

async function UpdateUser(req,res){
    try{
        const sessionUser = req.userId;
        const {userId,name,email,role} = req.body;

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role})
        };

        const user = await UserModel.findById(sessionUser);

        const updateUser = await UserModel.findByIdAndUpdate(userId,payload);

        res.status(200).json({
            message : "User updated successfully!",
            data : updateUser,
            success : true,
            error : false
        });

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

module.exports = UpdateUser;