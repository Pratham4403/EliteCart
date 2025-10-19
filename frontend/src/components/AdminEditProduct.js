import React,{useState} from "react";
import CloseButton from "../buttons/CloseButton";
import ProductCategory from "../helpers/ProductCategory";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UpdateProductButton from "../buttons/UpdateProductButton";
import UploadImage from "../helpers/UploadImage";
import DeleteIcon from '@mui/icons-material/Delete';
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import {toast} from "react-toastify";

const AdminEditProduct = ({productData,onClose,fetchData})=>{
    const [data,setData] = useState({
        ...productData,
        productName : productData?.productName,
        brandName : productData?.brandName,
        category : productData?.category,
        productImage : productData?.productImage || [],
        description : productData?.description,
        price : productData?.price,
        sellingPrice : productData?.sellingPrice,                                                   //Selling refer to discounted price
    });
    const [openFullScreenImage,setOpenFullScreenImage] = useState(false);
    const [fullScreenImage,setFullScreenImage] = useState("");

    const handleOnChange = (event)=>{
        const {name,value} = event.target;
        setData((previous)=>{
            return{
                ...previous,
                [name] : value
            }
        })
    }

    const handleUploadProduct = async(event)=>{
        const file = event.target.files[0];
        const uploadImageCloudinary = await UploadImage(file);
        setData((previous)=>{
            return{
                ...previous,
                productImage : [...previous.productImage,uploadImageCloudinary.url]
            }
        })
    }

    const handleDeleteProductImage = async(index)=>{
        const newProductImage = [...data.productImage];
        newProductImage.splice(index,1);
        setData((previous)=>{
            return{
                ...previous,
                productImage : [...newProductImage]
            }
        })
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const response = await fetch(SummaryApi.update_product.url,{
            method : SummaryApi.update_product.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        const dataResponse = await response.json();
        if(dataResponse.success){
            toast.success(dataResponse?.message);
            onClose();
            fetchData();
        }
        if(dataResponse.error){
            toast.error(dataResponse?.message);
        }
    }

    return (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 right-0 bottom-0 left-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
                <div className="flex justify-center items-center pb-3 mt-3">
                    <h2 className="font-bold text-2xl">Edit Product</h2>
                    <div className="w-fit ml-auto cursor-pointer" onClick={onClose}>
                        <CloseButton/>
                    </div>
                </div>

                <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5">

                    <label htmlFor="productName" className="font-semibold">Product Name : </label>
                    <input
                        type="text"
                        id="productName"
                        placeholder="Enter the product name"
                        name="productName"
                        value={data.productName}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        required
                    />

                    <label htmlFor="brandName" className="mt-3 font-semibold">Brand Name : </label>
                    <input
                        type="text"
                        id="brandName"
                        placeholder="Enter the brand name"
                        name="brandName"
                        value={data.brandName}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        required
                    />

                    <label htmlFor="category" className="mt-3 font-semibold">Category : </label>
                        <select 
                            className="bg-slate-100 border text-gray-900 text-sm rounded border-s-gray-100 focus:ring-blue-500 focus:border-blue-500 block p-2  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="category"
                            value={data.category}
                            onChange={handleOnChange}
                            required
                        >
                            <option value="">Select category</option>
                            {
                                ProductCategory.map((element,index)=>{
                                    return(
                                        <option value={element.value} key={element.value+index}>{element.label}</option>
                                    )
                                })
                            }
                        </select>
                        
                        <label htmlFor="productImage" className="mt-3 font-semibold">Product Image : </label>
                        <label htmlFor="uploadImageInput">
                            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                                    <span><CloudUploadIcon/></span>
                                    <p className="text-sm">Upload Product Image</p>
                                    <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct} required/>
                                </div>
                            </div>
                        </label>

                        <div>
                            {
                                data.productImage[0] ? 
                                (
                                    <div className="flex items-center gap-2">
                                        {
                                            data.productImage.map((element,index)=>{
                                                return(
                                                    <div className="relative group">
                                                        <img 
                                                            src={element} 
                                                            alt={element} 
                                                            width={80} 
                                                            height={80}
                                                            className="bg-slate-100 border cursor-pointer"
                                                            onClick={()=>{
                                                                setOpenFullScreenImage(true);
                                                                setFullScreenImage(element);
                                                            }}
                                                        />

                                                        <div className="absolute w-7 h-7 bottom-0 mr-1 mb-1 right-0 p-1 text-white bg-gray-400 rounded-full hidden group-hover:block cursor-pointer" onClick={()=>{handleDeleteProductImage(index)}}> 
                                                            <DeleteIcon style={{width:"20px",height:"20px",marginBottom:"10px"}}/>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )  : 
                                (
                                    <p className="text-red-600 text-xs">*Please upload product image</p>
                                )
                            }
                        </div>

                        <label htmlFor="price" className="mt-3 font-semibold">Price : </label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Enter Price"
                            value={data.price}
                            name="price"
                            onChange={handleOnChange}
                            className="p-2 bg-slate-100 border rounded"
                            min={1}
                            required
                        />

                        <label htmlFor="sellingPrice" className="mt-3 font-semibold">Selling Price : </label>
                        <input
                            type="number"
                            id="sellingPrice"
                            placeholder="Enter Selling Price"
                            value={data.sellingPrice}
                            name="sellingPrice"
                            onChange={handleOnChange}
                            className="p-2 bg-slate-100 border rounded"
                            min={1}
                            required
                        />

                        <label htmlFor="description" className="font-semibold">Description : </label>
                        <textarea 
                            className="h-28 bg-slate-100 border resize-none p-1"
                            placeholder="Enter the product description"
                            rows={3}
                            onChange={handleOnChange}
                            name="description"
                            value={data.description}
                            required
                        >
                        </textarea>

                        <button className="mb-14 mt-7 ml-48" onClick={handleSubmit}><UpdateProductButton/></button>
                </form>
            </div>
            
            {
                openFullScreenImage && (
                    <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imageUrl={fullScreenImage}/>
                )
            }

        </div>
    )
}

export default AdminEditProduct;