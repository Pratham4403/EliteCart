const bcrypt = require('bcryptjs');
const UserModel = require('../../models/UserModel');
const jwt = require('jsonwebtoken');

async function UserLoginController(req,res){
    try{
        const {email,password} = req.body;
        if(!email){
            throw new Error("Please eneter your email : ");
        }
        if(!password){
            throw new Error("Please enter your password : ");
        }

        const user = await UserModel.findOne({email});
        if(!user){
            throw new Error("User not found!");
        }

        const checkPassword = await bcrypt.compare(password,user.password);

        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email : user.email,
            }

            const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn : 60*60*48});

            const tokenOption = {
                httpOnly : true,
                secure : true
            }

            res.cookie("token",token,tokenOption).status(200).json({
                message : "Login Successfull",
                data : token,
                success : true,
                error : false
            })
        }
        else{
            throw new Error("Invalid Credentials!")
        }
    }
    catch(error){
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = UserLoginController;