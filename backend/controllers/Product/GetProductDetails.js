const ProductModel = require("../../models/ProductModel");

const GetProductDetails = async(req,res)=>{
    try{
        const {productId} = req.body;
        const product = await ProductModel.findById(productId);

        res.status(200).json({
            message : "Product fetched successfully",
            data : product,
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

module.exports = GetProductDetails;