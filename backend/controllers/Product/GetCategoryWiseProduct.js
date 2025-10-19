const ProductModel = require("../../models/ProductModel");

const GetCategoryWiseProduct = async(req,res)=>{
    try{
        const {category} = req?.body || req?.query;
        const product = await ProductModel.find({category});

        res.status(200).json({
            message : "Product fetched successfully",
            data : product,
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

module.exports = GetCategoryWiseProduct;