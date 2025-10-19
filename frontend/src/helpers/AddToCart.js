import SummaryApi from "../common/index";
import {toast} from "react-toastify";

const AddToCart = async(event,productId)=>{
    event?.stopPropagation();
    event?.preventDefault();

    const response = await fetch(SummaryApi.add_to_cart_product.url,{
        method : SummaryApi.add_to_cart_product.method,
        credentials : "include",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(
            {productId : productId }
        )
    });

    const responseData = await response.json();
    if(responseData.success){
        toast.success(responseData.message);
    }

    if(responseData.error){
        toast.error(responseData.message);
    }

    return responseData;
}


export default AddToCart;