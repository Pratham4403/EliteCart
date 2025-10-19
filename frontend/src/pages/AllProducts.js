import React, { useEffect, useState } from "react";
import UploadProductButton from "../buttons/UploadProductButton";
import AdminProductCard from "../components/AdminProductCard";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";

const AllProducts = ()=>{
    const [openUploadProduct,setOpenUploadProduct] = useState(false);
    const [allProducts,setAllProducts] = useState([]);

    const fetchAllProduct = async()=>{
        const response = await fetch(SummaryApi.all_products.url,{
            method : SummaryApi.all_products.method,
            credentials : "include"
        })
        const dataResponse = await response.json();
        setAllProducts(dataResponse?.data || []);
    }

    useEffect(()=>{
        fetchAllProduct();
    })

    return(
        <div>
            <div className="bg-white py-2 px-4 flex justify-between items-center pt-5">
                <h2 className="text-3xl" style={{fontSize:"30px",fontWeight:"500"}}>All Products</h2>
                <button className="mr-3" onClick={()=>setOpenUploadProduct(true)}><UploadProductButton/></button>
            </div>

            {/* All products details */}
            <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
                {
                    allProducts.map((product,index)=>{
                        return (
                            <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProduct}/>
                        )
                    })
                }
            </div>
            
            {/* Upload product component */}
            {
                openUploadProduct && 
                (
                    <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
                )
            }
        </div>
    )
}


export default AllProducts;