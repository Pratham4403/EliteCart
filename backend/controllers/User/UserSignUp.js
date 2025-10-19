const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");

async function UserSignUpController(req,res){
    try{
        const {name,email,password} = req.body;

        const user = await UserModel.findOne({email});
        if(user){
            throw new Error("User already exist!");
        }

        if(!name){
            throw new Error("Please enter your name");
        }
        if(!email){
            throw new Error("Please enter your email");
        }
        if(!password){
            throw new Error("Please enter your password");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something went wrong!");
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword,
        }

        const userData = new UserModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created succesfully!"
        })
    }
    catch(error){
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

module.exports = UserSignUpController;