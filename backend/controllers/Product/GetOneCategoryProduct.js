const ProductModel = require("../../models/ProductModel");

const GetOneCategoryProduct = async (req,res)=>{
    try{
        //Getting all types of category in array form
        const productCategory = await ProductModel.distinct("category");
        
        const productByCategory = [];

        for(const category of productCategory){
            const product = await ProductModel.findOne({category});
            if(product){
                productByCategory.push(product);
            }
        }

        res.status(200).json({
            messge : "Category product found!",
            data : productByCategory,
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
        });
    }

}

module.exports = GetOneCategoryProduct;