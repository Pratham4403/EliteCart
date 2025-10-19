import React, { useState } from "react";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import AdminEditProduct from "./AdminEditProduct";
import DisplayINRCurrency from "../helpers/DisplayCurrency";

const AdminProductCard = ({data,fetchData})=>{
    const [editProduct,setEditProduct] = useState(false);
    return(
        <div className="bg-white p-6 rounded mr-2 cursor-pointer hover:bg-slate-50">
            <div className="w-44 flex flex-wrap justify-center items-center">
                <div className="w-44 h-36 flex justify-center items-center mb-3">
                    <img src={data?.productImage[0]} className="mx-auto object-fill h-full" alt="ProductImage"/>
                </div>
                <h1 className="text-ellipsis line-clamp-2 text-center">{data.productName}</h1>

                <div>
                    <p className="font-semibold text-center mt-1" style={{color:"#d59010",fontSize:"17px"}}>
                        {
                           DisplayINRCurrency(data.sellingPrice)
                        }
                    </p>
                    
                </div>
            </div>
            <div className="w-fit ml-auto p-2 bg-gray-300 hover:bg-gray-600 rounded-full hover:text-white cursor-pointer flex justify-center items-center" onClick={()=>{setEditProduct(true)}} style={{width:"25px",height:"25px"}}>
                <ModeEditSharpIcon style={{width:"17px",height:"17px"}}/>
            </div>

            {
                editProduct && (<AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>)
            }
        </div>
    )
}

export default AdminProductCard;