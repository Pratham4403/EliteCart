const AddToCartModel = require("../../models/AddToCartModel");

const CountProductsInCartController = async(req,res)=>{
    try{
        const userId = req.userId;
        const count = await AddToCartModel.countDocuments({
            userId : userId
        });

        res.status(200).json({
            message : "Count fetched succesfully",
            data : { count : count},
            success : true,
            error : false
        })
    }
    catch(error){
        res.status(400).json({
            message : error.message || error,
            data : [],
            succes : false,
            error : true
        })
    }
}

module.exports = CountProductsInCartController;