const UploadProductPermission = require("../../helpers/Permission");
const ProductModel = require("../../models/ProductModel");

async function UploadProductController(req,res){
    try{
        const sessionUserId = req.userId;

        if(!UploadProductPermission(sessionUserId)){
            throw new Error("Permission denied!");
        }

        const UploadProduct = new ProductModel(req.body);
        const SaveProduct = await UploadProduct.save();

        res.status(201).json({
            message : "Product uploaded successfully!",
            data : SaveProduct,
            success : true,
            error : false
        })

    }
    catch(error){
        res.json(400).json({
            message : error.message || error,
            data : [],
            success : false,
            error : true    
        })
    }
}

module.exports = UploadProductController;