import SummaryApi from "../common/index";

const FetchCategoryWiseProduct = async(category)=>{
    const response = await fetch(SummaryApi.category_wise_product.url,{
        method : SummaryApi.category_wise_product.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    });
    const dataResponse = await response.json();
    return dataResponse;
}

export default FetchCategoryWiseProduct;