const OrderModel = require("../../models/OrderModel");
const UserModel = require("../../models/UserModel");

const AllOrdersController = async(req,res)=>{
    try{
        const userId = req.userId;

        const user = await UserModel.findById(userId);

        if(user.role !== "ADMIN"){
            return res.status(500).json({
                message : "Access Denied!"
            })
        }

        const allOrders = await OrderModel.find().sort({createdAt : -1});
        return res.status(200).json({
            message : "All orders fetched successfully",
            data : allOrders,
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

module.exports = AllOrdersController;