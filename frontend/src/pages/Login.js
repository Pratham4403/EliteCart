import React, { useContext, useState } from "react";
import LoginPageButton from "../buttons/LoginPageButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/index";
import {toast} from 'react-toastify';
import Context from '../context/index';

const Login = ()=>{
    const [showPassword,setShowPassword] = useState(false);
    const [isHoveredSU, setIsHoveredSU] = useState(false);
    const [data,setData] = useState({
        email : "",
        password : ""
    });
    const navigate = useNavigate();
    const {fetchUserDetails} = useContext(Context);
    const {fetchUserAddToCart} = useContext(Context);

    const handleOnChange = (event)=>{
        const {name,value} = event.target;
        setData((previous)=>{
            return{
                ...previous,
                [name] : value
            }
        });
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const response = await fetch(SummaryApi.login.url,{
            method : SummaryApi.login.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        const dataResponse = await response.json();
        if(dataResponse.success){
            toast.success(dataResponse.message);
            navigate("/");
            fetchUserDetails()
        }
        if(dataResponse.error){
            toast.error(dataResponse.message);
        }
        fetchUserAddToCart();
    }

    return(
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white p-2 py-4 w-full max-w-md mx-auto">
                    <div className="w-60 h-45 mx-auto">
                        <img src="/assets/signin.png" alt="Login icon" style={{width:"600px"}}/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid p-3">
                            <label className="mb-1">Email :</label>
                            <div className="p-2 bg-slate-100">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={data.email}
                                    name="email"
                                    onChange={handleOnChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="p-3">
                            <label className="mb-1">Password :</label>
                            <div className="p-2 bg-slate-100 flex">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter your password" 
                                    value={data.password}
                                    name="password"
                                    required
                                    onChange={handleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div className="cursor-pointer" onClick={()=>setShowPassword((previous)=>!previous)}>
                                    <span>
                                        {
                                            showPassword ?
                                            (<VisibilityOffIcon/>) : (<VisibilityIcon/>)
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto text-center flex justify-center p-3">
                            <LoginPageButton/>
                        </div>
                        <p className="my-2 text-center">Don't have a account? 
                            <Link to={"/sign-up"} className="hover:underline ml-1" 
                                style={{
                                    color: isHoveredSU ? 'black' : '#efa92a',
                                    cursor: 'pointer',
                                    fontSize:"15px"
                                }}
                                onMouseEnter={() => setIsHoveredSU(true)}
                                onMouseLeave={() => setIsHoveredSU(false)}>
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login;