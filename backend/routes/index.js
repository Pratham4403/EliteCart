const express = require("express");
const router = express.Router();
const UserSignUpController = require("../controllers/User/UserSignUp");
const UserLoginController = require("../controllers/User/UserLogin");
const userDetailsController = require("../controllers/User/UserDetails");
const AuthToken = require("../middlewares/AuthToken");
const UserLogoutController = require("../controllers/User/UserLogout");
const AllUsers = require("../controllers/User/AllUsers");
const UpdateUser = require("../controllers/User/UpdateUser");
const UploadProductController = require("../controllers/Product/UploadProduct");
const GetProductController = require("../controllers/Product/GetProduct");
const UpdateProductController = require("../controllers/Product/UpdateProduct");
const GetOneCategoryProduct = require("../controllers/Product/GetOneCategoryProduct");
const GetCategoryWiseProduct = require("../controllers/Product/GetCategoryWiseProduct");
const GetProductDetails = require("../controllers/Product/GetProductDetails");
const AddToCartController = require("../controllers/User/AddToCartController");
const CountProductsInCartController = require("../controllers/User/CountProductsInCartController");
const ViewProductsInCartController = require("../controllers/User/ViewProductsInCart");
const UpdateProductInCart = require("../controllers/User/UpdateProductInCart");
const DeleteProductInCart = require("../controllers/User/DeleteProductInCart");
const SearchProduct = require("../controllers/Product/SearchProduct");
const FilterProduct = require("../controllers/Product/FilterProduct");
const PaymentController = require("../controllers/Order/PaymentController");
const Webhooks = require("../controllers/Order/Webhook");
const OrderController = require("../controllers/Order/OrderController");
const AllOrdersController = require("../controllers/Order/AllOrdersController");

//Users Routes
router.post("/signup",UserSignUpController);
router.post("/login",UserLoginController);
router.get("/user-details",AuthToken,userDetailsController);
router.get("/userlogout",AuthToken,UserLogoutController);

//Admin panel Routes
router.get("/all-users",AuthToken,AllUsers);
router.post("/update-user",AuthToken,UpdateUser);

//Products Routes
router.post("/upload-product",AuthToken,UploadProductController);
router.get("/get-all-products",GetProductController);
router.post("/update-product",AuthToken,UpdateProductController);
router.get("/get-one-product-from-category",GetOneCategoryProduct);
router.post("/category-wise-product",GetCategoryWiseProduct);
router.post("/product-details",GetProductDetails);
router.get("/search",SearchProduct);
router.post("/filter-product",FilterProduct);

//User Add to cart
router.post("/add-to-cart",AuthToken,AddToCartController);
router.get("/count-products-in-cart",AuthToken,CountProductsInCartController);
router.get("/view-cart-products",AuthToken,ViewProductsInCartController);
router.post("/update-cart-product",AuthToken,UpdateProductInCart);
router.post("/delete-cart-product",AuthToken,DeleteProductInCart);

//Payment and order
router.post("/checkout",AuthToken,PaymentController);
router.post("/webhook",Webhooks);                                                  // /api/webhook in command prompt after stripe download
router.get("/order-list",AuthToken,OrderController);
router.get("/all-orders",AuthToken,AllOrdersController);


module.exports = router;