import React, { useContext, useEffect, useRef, useState } from "react";
import FetchCategoryWiseProduct from "../helpers/FetchCategoryWiseProduct";
import DisplayINRCurrency from '../helpers/DisplayCurrency';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";
import Context from "../context";
import AddToCartButton from "../buttons/AddToCartButton";
import AddToCart from "../helpers/AddToCart";


const HorizontalCardProduct = ({category,heading})=>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();
    const { fetchUserAddToCart } = useContext(Context);

    const fetchData = async()=>{
        setLoading(true);
        const categoryProducts = await FetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProducts?.data);
    }

    useEffect(()=>{
        fetchData()
    },[]);

    const scrollRight = () => {
    scrollElement.current.scrollBy({ left: 150, behavior: "smooth" });
    };

    const scrollLeft = () => {
    scrollElement.current.scrollBy({ left: -150, behavior: "smooth" });
    };

    const handleAddToCart = async(event,id)=>{
        await AddToCart(event,id);
        fetchUserAddToCart();
    }

    return(
        <div className="container mx-auto px-14 my-6 relative">
            <h2 className="text-3xl font-bold py-7">{heading}</h2>
            <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all" ref={scrollElement}>
                <button className="hidden md:flex bg-white rounded-full shadow-md p-1 ml-2 h-10 w-10 hover:bg-slate-100 justify-center items-center absolute left-5 text-lg" onClick={scrollLeft}><ChevronLeftIcon style={{fontSize:"34px"}}/></button>
                <button className="hidden md:flex bg-white rounded-full shadow-md p-1 mr-2 h-10 w-10 hover:bg-slate-100 justify-center items-center absolute right-5 text-lg" onClick={scrollRight}><ChevronRightIcon style={{fontSize:"34px"}}/></button>
                {
                    loading ? 
                    (
                        loadingList.map((product,index)=>{
                            return(
                                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                                    <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                                    <div className="p-4 grid w-full gap-2">
                                        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                                        <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                                        <div className="flex gap-3 w-full">
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
                                <Link to={"product/"+product?._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-2xl shadow flex">
                                    <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                                        <img src={product?.productImage[0]} alt="ProductImage" className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"/>
                                    </div>
                                    <div className="p-3 grid">
                                        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                                        <p className="capitalize text-slate-500">{product?.category}</p>
                                        <div className="flex gap-3">
                                            <p className="font-medium">{DisplayINRCurrency(product?.sellingPrice)}</p>
                                            <p className="text-slate-500 line-through">{DisplayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className="font-semibold flex justify-start my-1"  onClick={(event)=>handleAddToCart(event,product?._id)}><AddToCartButton/></button>
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

export default HorizontalCardProduct;