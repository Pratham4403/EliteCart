const AddToCartModel = require("../../models/AddToCartModel");

const AddToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId; 
    const isProductAvailable = await AddToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Product already exist in your cart!",
        data: [],
        success: false,
        error: true,
      });
    }

    const payload = {
      productId,
      quantity: 1,
      userId: currentUser,
    };

    const newProductAddToCart = new AddToCartModel(payload);
    const saveProduct = await newProductAddToCart.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
      data: saveProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      success: false,
      error: true,
    });
  }
};

module.exports = AddToCartController;