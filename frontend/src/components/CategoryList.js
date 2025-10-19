import React from "react";
import SummaryApi from "../common";
import {Link} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const CategoryList = ()=>{
    const [categoryProduct,setCategoryProduct] = useState([]);
    const [loading,setLoading] = useState(false);
    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async()=>{
        setLoading(true);
        const response = await fetch(SummaryApi.category_product.url,{
            method : SummaryApi.category_product.method,
            credentials : "include"
        });
        const dataResponse = await response.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    }

    useEffect(()=>{
        fetchCategoryProduct();
    },[]);

    return(
        <div className="mx-auto p-4">
            <div className="flex items-center gap-4 justify-evenly overflow-scroll scrollbar-none">
                {
                    loading ? 
                    (
                        categoryLoading.map((element,index)=>{
                            return (
                                <div className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse" key={"categoryLoading"+index}>
                                </div>
                            )
                        })
                    ) : 
                    (
                        categoryProduct.map((product,index)=>{
                            return(
                                <Link to={"product-category?category="+product?.category} className="cursor-pointer" key={product?.category}>
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                        <img src={product?.productImage[0]} alt={product?.category} className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"/>
                                    </div>
                                    <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default CategoryList;