const UserModel = require("../models/UserModel");

const UploadProductPermission = async(userId)=>{
    const user = await UserModel.findById(userId);

    if(user.role === "ADMIN"){
        return true;
    }
    return false;
}

module.exports = UploadProductPermission;