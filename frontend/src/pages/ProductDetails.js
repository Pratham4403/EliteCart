import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../context";
import SummaryApi from "../common";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import DisplayINRCurrency from "../helpers/DisplayCurrency";
import BuyProductButton from "../buttons/BuyProductButton";
import AddToCart from "../helpers/AddToCart";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import AddToCartButton1 from "../buttons/AddToCartButton1";

const ProductDetails = ()=>{
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    });
    const params = useParams();
    const [loading,setLoading] = useState(true);
    const productImageListLoading = new Array(4).fill(null);
    const [activeImage,setActiveImage] = useState("");
    const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
        x : 0,
        y : 0
    });
    const [zoomImage,setZoomImage] = useState(false);
    const {fetchUserAddToCart} = useContext(Context);

    const fetchProductDetails = async()=>{
        setLoading(true);
        const response = await fetch(SummaryApi.product_details.url,{
            method : SummaryApi.product_details.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                productId : params?.id
            })
        })
        setLoading(false);
        const dataResponse = await response.json();
        setData(dataResponse?.data);
        setActiveImage(dataResponse?.data?.productImage[0]);
    }

    useEffect(()=>{
        fetchProductDetails();
    },[params]);

    const handleMouseEnterProduct = (imageURL)=>{
        setActiveImage(imageURL);
    }

    const handleZoomImage = useCallback((event)=>{
        setZoomImage(true);
        const {left,top,width,height} = event.target.getBoundingClientRect();
        const x = (event.clientX - left)/width;
        const y = (event.clientY - top)/height;
        setZoomImageCoordinate({
            x,
            y
        })
    },[zoomImageCoordinate]);

    const handleLeaveImageZoom = ()=>{
        setZoomImage(false);
    }

    const handleAddToCart = async(event,id)=>{
        await AddToCart(event,id);
        fetchUserAddToCart();
    }

    return(
        <div className="container mx-auto p-4 mt-2">
            <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
                {/* Product Image */}
                <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
                    <div className="h-[300px] w-[300ox] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
                        <img src={activeImage} className="h-full w-full object-scale-down mix-blend-multiply" onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
                        {/* Product Zoom */}
                        {
                            zoomImage && (
                                <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 z-50">
                                    <div
                                        className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                                        style={{
                                            background : `url(${activeImage})`,
                                            backgroundRepeat : "no-repeat",
                                            backgroundPosition : `${zoomImageCoordinate.x*100}% ${zoomImageCoordinate.y*100}%`
                                        }}
                                    >
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="h-full">
                        {
                            loading ? 
                            (
                                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                                    {
                                        productImageListLoading.map((element,index)=>{
                                            return(
                                                <div className="h-20 w-20 bg-slate-200 rounded animate-pulse" key={"loadingImage"+index}>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : 
                            (
                                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                                    {
                                        data?.productImage?.map((imageURL,index)=>{
                                            return(
                                                <div className="h-20 w-20 bg-slate-200 rounded p-1" key={imageURL}>
                                                    <img src={imageURL} className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer" onMouseEnter={()=>handleMouseEnterProduct(imageURL)} onClick={()=>handleMouseEnterProduct(imageURL)}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Product details */}
                {
                    loading ? 
                    (
                        <div className="grid gap-1 w-full">
                            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
                            <h2 className="text-2xl lg:text-4xl font-medium lg:h-8 bg-slate-200 animate-pulse w-full"></h2>
                            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>
                            <div className="bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full" style={{color : "#efa92a"}}>
                            </div>
                            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
                                <p className="bg-slate-200 w-full" style={{color:"#efa92a"}}></p>
                                <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
                            </div>
                            <div className="flex items-center gap-3 my-2 w-full">
                                <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
                                <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full "></button>
                            </div>
                            <div className="w-full">
                                <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></p>
                                <p className="bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full"></p>
                            </div>
                        </div>
                    ) : 
                (
                    <div className="flex flex-col gap-1">
                        <p className="px-2 rounded-full inline-block w-fit" style={{background:"#fbecd0",color:"#efa92a"}}>{data?.brandName}</p>
                        <h2 className="text-2xl lg:text-2xl font-medium pr-5">{data?.productName}</h2>
                        <p className="capitalize text-slate-400">{data?.category}</p>
                        <div className="flex items-center gap-1" style={{color:"#efa92a"}}>
                            <StarIcon/>
                            <StarIcon/>
                            <StarIcon/>
                            <StarIcon/>
                            <StarHalfIcon/>
                        </div>
                        <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
                            <p style={{color : "#efa92a"}}>{DisplayINRCurrency(data.sellingPrice)}</p>
                            <p className="text-slate-400 line-through text-base mt-1">{DisplayINRCurrency(data.price)}</p>
                        </div>
                        <div className="flex items-center gap-3 my-5">
                            <button onClick={(event)=>handleAddToCart(event,data?._id)}><AddToCartButton1/></button>
                            <button onClick={(event)=>handleAddToCart(event,data?._id)}><BuyProductButton/></button>
                        </div>
                        <div>
                            <p className="text-black font-bold my-3 text-xl">Product Description : </p>
                            <p className="pr-5 text-slate-500">{data?.description}</p>
                        </div>
                    </div>
                )
                }
            </div>
            {
                data?.category && (
                    <CategoryWiseProductDisplay category={data?.category} heading={"Recommended for you"}/>
                )
            }
        </div>

    )
}

export default ProductDetails;