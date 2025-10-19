import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProducts';
import ProductDetails from '../pages/ProductDetails';
import ViewCart from '../pages/ViewCart';
import SearchProduct from '../pages/SearchProduct';
import PaymentSuccessPage from '../pages/PaymentSuccessPage';
import PaymentCancelPage from '../pages/PaymentCancelPage';
import AllOrders from '../pages/AllOrders';
import YourOrders from '../pages/YourOrders';


const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children : [
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"sign-up",
                element:<SignUp/>
            },
            {
                path:"product-category",
                element : <CategoryProduct/>
            },
            {
                path:"product/:id",
                element : <ProductDetails/>
            },
            {
                path : "view-cart",
                element : <ViewCart/>
            },
            {
                path : "search-product",
                element : <SearchProduct/>
            },
            {
                path : "success",
                element : <PaymentSuccessPage/>
            },
            {
                path : "cancel",
                element : <PaymentCancelPage/>
            },
            {
                path : "orders",
                element : <YourOrders/>
            },
            {
                path : "admin-panel",
                element:<AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element:<AllUsers/>
                    },
                    {
                        path : "all-products",
                        element:<AllProducts/>
                    },
                    {
                        path : "all-orders",
                        element : <AllOrders/>
                    }
                ]
            },
        ]
    }
]);

export default router;