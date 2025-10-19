import React, { useEffect, useState, useContext } from "react";
import Context from "../context/index";
import DisplayINRCurrency from "../helpers/DisplayCurrency";
import SummaryApi from "../common/index";
import DeleteButtonInCart from "../buttons/DeleteButtonInCart";
import PayNowButton from "../buttons/PayNowButton";
import ContinueShopping from "../buttons/ContinueShopping";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import { loadStripe } from "@stripe/stripe-js";

const ViewCart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const navigate = useNavigate();
    const loadingCart = Array(4).fill(null);

    const fetchData = async () => {
        const response = await fetch(SummaryApi.view_cart_products.url,{
        method: SummaryApi.view_cart_products.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        });
        const dataResponse = await response.json();
        if (dataResponse.success) setData(dataResponse.data);
    };

    useEffect(() => {
        const load = async () => {
        setLoading(true);
        await fetchData();
        setLoading(false);
        };
        load();
    }, []);

    const updateQuantity = async (id, qty) => {
        const response = await fetch(SummaryApi.update_cart_product.url, {
        method: SummaryApi.update_cart_product.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id, quantity: qty }),
        });
        const dataResponse = await response.json();
        if (dataResponse.success){
            await fetchData();
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.delete_cart_product.url, {
        method: SummaryApi.delete_cart_product.method,
        credentials: "include",
        headers: { "content-type" : "application/json" },
        body: JSON.stringify({ _id: id }),
        });
        const dataResponse = await response.json();
        if (dataResponse.success) {
            fetchData();
            context.fetchUserAddToCart();
            toast.success(dataResponse.message);
        }
    };

    const handlePayment = async () => {
        //const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const response = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ cartItems: data }),
        });
        const dataResponse = await response.json();
        if (dataResponse?.url){
            window.location.href = dataResponse.url;
        }
    };

    const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = data.reduce((sum, item) => sum + item.quantity * item?.productId?.sellingPrice,0);

    return (
        <div className="min-h-screen py-8 px-4 md:px-10">
            <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
                Your Cart 🛒
            </h1>

            {
                data.length === 0 && !loading && (
                    <div className="max-w-lg w-full bg-white border border-gray-200 rounded-2xl shadow-md p-10 text-center mx-auto mt-16">
                        <div className="mb-6 flex justify-center">
                            <div className="w-24 h-24 border-2 border-orange-400 rounded-full flex items-center justify-center">
                                <ShoppingCartOutlinedIcon style={{color: "#efa92a", width: "50px", height: "50px"}}/>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">
                            Your Cart is Empty
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven’t added anything yet. Start shopping now!
                        </p>
                        <Link to={"/"}>
                            <ContinueShopping/>
                        </Link>
                    </div>
                )
            }

            {
                data.length > 0 && (
                    <div className="flex flex-col lg:flex-row justify-between gap-10 max-w-7xl mx-auto">
                        <div className="w-full max-w-3xl">
                            {   
                            loading? loadingCart.map((product, i) => (
                                <div key={i} className="w-full bg-slate-200 h-32 mb-4 animate-pulse rounded-lg"/>
                                ))
                                : data.map((product, i) => (
                                    <div key={product?._id || i} className="relative bg-white border border-gray-200 rounded-2xl shadow-sm mb-6 flex gap-4 p-4 items-center">
                                        <div className="w-28 h-28 flex-shrink-0 border rounded-lg bg-gray-50 cursor-pointer" onClick={() => navigate(`/product/${product?.productId?._id}`)}>
                                            <img
                                                src={product?.productId?.productImage[0]}
                                                alt={product?.productId?.productName}
                                                className="w-full h-full object-contain mix-blend-multiply p-2"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold text-slate-800 capitalize line-clamp-1">
                                                {product?.productId?.productName}
                                            </h2>
                                            <p className="text-gray-600 capitalize mb-2">
                                                {product?.productId?.category}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <p className="text-lg font-medium" style={{color: "#efa92a"}}>
                                                    {DisplayINRCurrency(product?.productId?.sellingPrice)}
                                                </p>
                                                <p className="font-semibold text-lg" style={{color: "#efa92a"}}>
                                                    Amount:{" "}
                                                    {DisplayINRCurrency(
                                                        product?.productId?.sellingPrice *
                                                        product?.quantity
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 mt-3">
                                                <button className="border border-amber-600 text-slate-700 w-7 h-7 flex justify-center items-center rounded" onClick={()=>updateQuantity(product?._id, product?.quantity - 1)} disabled={product.quantity <= 1}>
                                                    −
                                                </button>
                                                <span className="text-slate-800 font-medium">
                                                    {product?.quantity}
                                                </span>
                                                <button className="border border-amber-600 text-slate-700 w-7 h-7 flex justify-center items-center rounded" onClick={()=>updateQuantity(product?._id, product?.quantity + 1)}>
                                                +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-3 right-3 cursor-pointer" onClick={() => deleteCartProduct(product?._id)}>
                                            <DeleteButtonInCart />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="w-full max-w-sm self-start">
                            {
                                loading ? (
                                    <div className="h-40 bg-slate-200 border animate-pulse rounded-lg" />
                                ) : 
                                (
                                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                                        <h2 className="text-white text-center font-semibold text-xl py-2" style={{ backgroundColor: "#efa92a" }}>
                                            Summary 📃
                                        </h2>
                                        <div className="p-4 space-y-3 text-slate-700 text-lg">
                                            <div className="flex justify-between">
                                                <p>Quantity</p>
                                                <p>{totalQuantity}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>Total Price</p>
                                                <p>{DisplayINRCurrency(totalPrice)}</p>
                                            </div>
                                        </div>
                                        <div className="pb-4 flex justify-center">
                                            <button onClick={handlePayment}>
                                                <PayNowButton />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ViewCart;