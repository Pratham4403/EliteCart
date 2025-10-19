const ProductModel = require("../../models/ProductModel");

const SearchProduct = async(req,res)=>{
    try{
        const query = req.query.q;
        const regex = new RegExp(query,"i","g");

        const products = await ProductModel.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category : regex
                }
            ]
        });

        res.status(200).json({
            message : "Product search result",
            data : products,
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

module.exports = SearchProduct;