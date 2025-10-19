const UploadProductPermission = require("../../helpers/Permission");
const ProductModel = require("../../models/ProductModel");

async function UpdateProductController(req,res){
    try{
        
        if(!UploadProductPermission(req.userId)){
            throw new Error("Permission denied!");
        }

        const {_id,...restBody} = req.body;
        const updateProduct = await ProductModel.findByIdAndUpdate(_id,restBody);

        res.status(201).json({
            message : "Product updated successfully",
            data : updateProduct,
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

module.exports = UpdateProductController;