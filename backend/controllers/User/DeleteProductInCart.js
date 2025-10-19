const AddToCartModel = require("../../models/AddToCartModel");

const DeleteProductInCart = async(req,res)=>{
    try{
        const currentUserId = req.userId;
        const cartProductId = req.body._id;

        const deletedProduct = await AddToCartModel.deleteOne({_id : cartProductId});

        res.status(200).json({
            message : "Product removed from cart successfully",
            data : deletedProduct,
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


module.exports = DeleteProductInCart;