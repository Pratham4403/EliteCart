import React,{useEffect, useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = ()=>{
    const [isHoveredUI, setIsHoveredUI] = useState(false);
    const [activeLink, setActiveLink] = useState("all-users"); 
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/");
        }
    },[user]);

    useEffect(()=>{
        if(location.pathname === "/admin-panel"){
            navigate("/admin-panel/all-users", { replace: true });
        }
        if(location.pathname.includes("all-users")){
            setActiveLink("all-users");
        } else if(location.pathname.includes("all-products")){
            setActiveLink("all-products");
        }else if(location.pathname.includes("all-orders")){
            setActiveLink("all-orders");
        }
    },[location,navigate]);

    return (
        <div className="min-h-[calc(100vh-120px)] md:flex hidden">
            <aside className="bg-white min-h-full w-full max-w-60 customShadow">
                <div className="h-32 flex justify-center items-center flex-col mt-6">
                    <div className="text-4xl cursor-pointer">
                        {
                            user?.profileImage ? (
                                <img src={user?.profileImage} alt={user?.name} className="w-20 h-20 rounded-full"/>
                            ) : 
                            <AccountCircleIcon style={{
                                                    color: isHoveredUI ? '#efa92a' : '#f1b341',
                                                    cursor: 'pointer',
                                                    fontSize:"55px"
                                                }}
                                onMouseEnter={() => setIsHoveredUI(true)}
                                onMouseLeave={() => setIsHoveredUI(false)}
                            />
                        }
                    </div>
                    <p className="capitalize text-lg font-semibold">{user?.name}</p>
                    <p className="text-xs">{user?.role}</p>
                </div>

                <div>
                    <nav className="grid p-4">
                        <Link 
                            to="all-users" 
                            onClick={() => setActiveLink("all-users")}
                            className={`px-2 py-1 rounded ${
                                activeLink === "all-users" ? "bg-slate-200 font-semibold" : "hover:bg-slate-100"
                            }`}
                        >
                            All Users
                        </Link>

                        <Link 
                            to="all-products" 
                            onClick={() => setActiveLink("all-products")}
                            className={`px-2 py-1 rounded ${
                                activeLink === "all-products" ? "bg-slate-200 font-semibold" : "hover:bg-slate-100"
                            }`}
                        >
                            All Products
                        </Link>

                        <Link 
                            to="all-orders" 
                            onClick={() => setActiveLink("all-orders")}
                            className={`px-2 py-1 rounded ${
                                activeLink === "all-orders" ? "bg-slate-200 font-semibold" : "hover:bg-slate-100"
                            }`}
                        >
                            All Orders
                        </Link>
                    </nav>
                </div>
            </aside>
            <main className="w-full h-full p-2">
                <Outlet/>
            </main>
        </div>
    )
}

export default AdminPanel;