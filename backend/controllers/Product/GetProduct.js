const ProductModel = require("../../models/ProductModel");

const GetProductController = async(req,res)=>{
    try{
        const allProducts = await ProductModel.find({}).sort({createdAt : -1});

        res.status(201).json({
            message : "All products",
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

module.exports = GetProductController;