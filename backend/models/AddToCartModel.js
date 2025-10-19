const mongoose = require("mongoose");

const AddToCartSchema = mongoose.Schema({
    productId : {
        ref : "product",
        type : String
    },
    quantity : Number,
    userId : String
},
{
    timestamps : true
});

const AddToCartModel = mongoose.model("addToCartProduct",AddToCartSchema);
module.exports = AddToCartModel;