const backendDomain = process.env.REACT_APP_BACKEND_URL;

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    login : {
        url : `${backendDomain}/api/login`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    user_logout : {
        url : `${backendDomain}/api/userlogout`,
        method : "get"
    },
    all_users : {
        url : `${backendDomain}/api/all-users`,
        method : "get"
    },
    update_user : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    upload_product : {
        url : `${backendDomain}/api/upload-product`,
        method : "post"
    },
    all_products : {
        url : `${backendDomain}/api/get-all-products`,
        method : "get"
    },
    update_product : {
        url : `${backendDomain}/api/update-product` ,
        method : "post"
    },
    category_product : {
        url : `${backendDomain}/api/get-one-product-from-category`,
        method : "get"
    },
    category_wise_product : {
        url : `${backendDomain}/api/category-wise-product`,
        method : "post"
    },
    product_details : {
        url : `${backendDomain}/api/product-details`,
        method : "post"
    },
    add_to_cart_product : {
        url : `${backendDomain}/api/add-to-cart`,
        method : "post"
    },
    count_products_in_cart : {
        url : `${backendDomain}/api/count-products-in-cart`,
        method : "get"
    },
    view_cart_products : {
        url : `${backendDomain}/api/view-cart-products`,
        method : "get"
    },
    update_cart_product : {
        url : `${backendDomain}/api/update-cart-product`,
        method : "post"
    },
    delete_cart_product : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : "post"
    },
    search_product : {
        url : `${backendDomain}/api/search`,
        method : "get"
    },
    filter_product : {
        url : `${backendDomain}/api/filter-product`,
        method : "post"
    },
    payment : {
        url : `${backendDomain}/api/checkout`,
        method : "post"
    },
    get_order : {
        url : `${backendDomain}/api/order-list`,
        method : "get"
    },
    all_orders : {
        url : `${backendDomain}/api/all-orders`,
        method : "get"
    }
}

export default SummaryApi;