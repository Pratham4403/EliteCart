const ProductModel = require("../../models/ProductModel");

const FilterProductController = async(req,res)=>{
    try{
        const categoryList = req?.body?.category || [];
        const products = await ProductModel.find({
            category : {
                "$in" : categoryList
            }
        });

        res.status(200).json({
            message : "Products fetched successfully",
            data : products,
            success : true,
            error : false
        });
    }
    catch(error){
        res.status(400).json({
            mesage : error.message || error,
            data : [],
            success : false,
            error : true
        });
    }
}

module.exports = FilterProductController;