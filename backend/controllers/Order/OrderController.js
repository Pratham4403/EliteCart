const OrderModel = require("../../models/OrderModel");

const OrderController = async(req,res)=>{
    try{
        const currentUserId = req.userId;
        const orderList = await OrderModel.find({userId : currentUserId}).sort({ createdAt : -1 });

        res.status(200).json({
            message : "Order fetched successfully",
            data : orderList,
            success : true,
            error : false
        })
    }
    catch(error){
        res.status(500).json({
            message :  error.message || error,
            data : [],
            success : false,
            error : true
        })
    }
}

module.exports = OrderController;   