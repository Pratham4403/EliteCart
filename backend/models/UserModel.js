const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profileImage : String,
    role : String,
},{
    timestamps : true,
});

const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;