import React, { useContext, useEffect,useState } from "react";
import FetchCategoryWiseProduct from "../helpers/FetchCategoryWiseProduct";
import DisplayINRCurrency from '../helpers/DisplayCurrency';
import { Link, useNavigate } from "react-router-dom";
import Context from "../context";
import AddToCart from "../helpers/AddToCart";
import AddToCartButton from "../buttons/AddToCartButton";


const CategoryWiseProductDisplay = ({category,heading})=>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const loadingList = new Array(13).fill(null);
    const {fetchUserAddToCart} = useContext(Context);
    const navigate = useNavigate();

    const fetchData = async()=>{
        setLoading(true);
        const categoryProducts = await FetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProducts?.data);
    }

    useEffect(()=>{
        fetchData()
    },[]);

    const handleAddToCart = async(event,id)=>{
        await AddToCart(event,id);
        fetchUserAddToCart();
    }

    return(
        <div className="container mx-auto px-14 my-6 relative">
            <h2 className="text-3xl font-bold py-7">{heading}</h2>
            <div className="flex flex-wrap justify-items-start md:gap-6 overflow-x-scroll scrollbar-none transition-all">
                {
                    loading ? 
                    (
                        loadingList.map((product,index)=>{
                            return(
                                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow">
                                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] animate-pulse flex justify-center items-center"></div>
                                    <div className="p-4 grid gap-2">
                                        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                                        <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                                        <div className="flex gap-3">
                                            <p className="font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full" style={{color:"#efa92a"}}></p>
                                            <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                                        </div>
                                        <button className="text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                                    </div>
                                </div>
                            )
                        }) 
                    ) : 
                    (
                        data.map((product,index)=>{
                            return (
                                <Link onClick={()=>navigate("/product/"+product?._id)} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow" key={"productIndex"+index}>
                                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                                        <img src={product?.productImage[0]} alt="ProductImage" className="object-scale-down h-full hover:scale-110 mix-blend-multiply transition-all"/>
                                    </div>
                                    <div className="p-3 grid gap-3">
                                        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black text-center">{product?.productName}</h2>
                                        <p className="capitalize text-slate-500 text-center">{product?.category}</p>
                                        <div className="flex gap-3 justify-center">
                                            <p className="font-medium text-center">{DisplayINRCurrency(product?.sellingPrice)}</p>
                                            <p className="text-slate-500 line-through text-center">{DisplayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className="font-semibold flex justify-center my-1" onClick={(event)=>handleAddToCart(event,product?._id)}><AddToCartButton/></button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay;