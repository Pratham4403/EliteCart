import React,{useEffect, useState, useContext} from "react";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginButton from "../buttons/LoginButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/index";
import {toast} from "react-toastify";
import LogoutButton from "../buttons/LogoutButton";
import { setUserDetails } from "../store/UserSlice";
import Context from "../context/index";

const Header = ()=>{
    const [isHoveredUI, setIsHoveredUI] = useState(false);
    const [isHoveredCT, setIsHoveredCT] = useState(false);
    const [menuDisplay,setMenuDisplay] = useState(false);
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const context = useContext(Context);
    const navigate = useNavigate();
    const searchInput = useLocation();
    const URLSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLSearch.get("q") || "";
    const [search,setSearch] = useState(searchQuery);

    useEffect(()=>{
        if(searchInput.pathname === "/"){
            setSearch("");
        }
    },[searchInput.pathname]);

    const handleLogout = async()=>{
        const fetchData = await fetch(SummaryApi.user_logout.url,{
            method : SummaryApi.user_logout.method,
            credentials : "include"
        })
        const data = await fetchData.json();
        if(data.success){
            toast.success(data.message);
            dispatch(setUserDetails(null));
            setSearch("");
        }
        if(data.error){
            toast.error(data.message);
        }
    }

    const handleSearch = (event)=>{
        const {value} = event.target;
        setSearch(value);
        if(value){
            navigate(`/search-product?q=${value}`);
        }
        else{
            navigate("/search-product");
        }
    }

    return(
        <header className="h-20 shadow-md bg-white fixed w-full z-40">
            <div className="h-full container mx-auto flex items-center px-16 py-4 justify-between">
                <div>
                    <Link to={"/"}><img src="/assets/removeBgLogo.png" alt="EliteCart" style={{width:"40%"}}/></Link>
                </div>
                <div className="hidden lg:flex items-center w-full justify-between max-w-md" style={{border:"2px solid #eeeeee",borderRadius:"20px",borderEndEndRadius:"23px",borderStartEndRadius:"23px"}}>
                    <input type="text" placeholder="Search products here..." className="w-full outline-none pl-2" style={{height:"20px",textAlign:"center"}} onChange={handleSearch} value={search}/>
                    <div className="text-lg min-w-[53px] flex items-center justify-center h-10 rounded-r-full" style={{backgroundColor:"#efa92a"}}>
                        <SearchIcon style={{color:"white"}}/>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-6">
                    <div className="relative flex justify-center">
                        {
                            user?._id && 
                                (
                                    <div className="text-3xl cursor-pointer" onClick={()=>setMenuDisplay(preve => !preve)}>
                                    {
                                        user?.profileImage ? (
                                            <img src={user?.profileImage} alt={user?.name} className="w-10 h-10 rounded-full"/>
                                        ) : 
                                        <AccountCircleIcon style={{
                                                color: isHoveredUI ? '#efa92a' : '#f1b341',
                                                cursor: 'pointer',
                                                fontSize:"37px"
                                            }}
                                            onMouseEnter={() => setIsHoveredUI(true)}
                                            onMouseLeave={() => setIsHoveredUI(false)}
                                        />
                                    }
                                    </div>
                                )
                        }
                        {
                            menuDisplay && (
                                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 py-2 z-50 border border-gray-100 hidden md:block">
                                    <nav className="flex flex-col text-sm font-medium text-gray-700">
                                        {user?.role === "ADMIN" ? (
                                        <>
                                            <Link to="admin-panel" className="px-4 py-2 hover:bg-slate-100 transition-all rounded text-center" onClick={() => setMenuDisplay((prev) => !prev)}>
                                                Admin Panel
                                            </Link>
                                            <Link to="orders" className="px-4 py-2 hover:bg-slate-100 transition-all rounded text-center" onClick={() => setMenuDisplay((prev) => !prev)}>
                                                Your Orders
                                            </Link>
                                        </>
                                        ) : (
                                        <Link to="orders" className="px-4 py-2 hover:bg-slate-100 transition-all rounded" onClick={() => setMenuDisplay((prev) => !prev)}>
                                            Your Orders
                                        </Link>
                                        )}
                                    </nav>
                                </div>
                            )
                        }
                    </div>
                    {
                        user?._id && (
                            <Link to={"/view-cart"} className="text-2xl relative">
                                <span>
                                    <ShoppingCartIcon style={{
                                            color: isHoveredCT ? '#efa92a' : '#f1b341',
                                            cursor: 'pointer',
                                            fontSize:"34.5px"
                                        }}
                                        onMouseEnter={() => setIsHoveredCT(true)}
                                        onMouseLeave={() => setIsHoveredCT(false)}
                                    />
                                </span>
                                <div className="text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2" style={{backgroundColor:"red"}}>
                                    <p className="text-sm">{context?.cartProductCount}</p>
                                </div>
                            </Link>
                        )
                    }
                    <div>
                        {
                            user?._id ? (
                                            <Link onClick={handleLogout}><LogoutButton/></Link>
                                        ) :
                                        (
                                            <Link to={"/login"}><LoginButton/></Link>
                                        ) 
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;