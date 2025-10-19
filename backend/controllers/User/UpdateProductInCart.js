const AddToCartModel = require("../../models/AddToCartModel");

const UpdateProductInCart = async(req,res)=>{
    try{
        const currentUserId = req.userId;
        const addToCartProductId = req?.body?._id;

        const quantity = req.body.quantity;

        const UpdatedProduct = await AddToCartModel.updateOne({_id : addToCartProductId},{...(quantity && {quantity : quantity})});
        
        res.status(200).json({
            message : "Product updated succesfully",
            data : UpdatedProduct,
            success : true,
            error  : false
        });
    }
    catch(error){
        res.status(400).json({
            message : error.message || error,
            data : [],
            success : false,
            error : true
        });
    }
}

module.exports = UpdateProductInCart;