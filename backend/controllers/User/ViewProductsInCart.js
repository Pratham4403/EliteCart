const AddToCartModel = require("../../models/AddToCartModel");

const ViewProductsInCartController = async(req,res)=>{
    try{
        const userId = req.userId;
        const allProducts = await AddToCartModel.find({
            userId : userId
        }).populate("productId");

        res.status(200).json({
            message : "Products in cart fetched successfully",
            data : allProducts,
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

module.exports = ViewProductsInCartController;