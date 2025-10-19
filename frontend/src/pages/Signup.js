import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SignUpPageButton from '../buttons/SignUpPageButton';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ImageToBase64 from '../helpers/ImageToBase64';
import SummaryApi from "../common/index";
import { toast } from "react-toastify";

const SignUp = ()=>{
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [isHoveredSU, setIsHoveredSU] = useState(false);
    const [data,setData] = useState({
        profileImage : "",
        name : "",
        email : "",
        password : "",
        confirmPassword : "",
    });
    const navigate = useNavigate();
    
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
        if(data.password === data.confirmPassword){
            const response = await fetch(SummaryApi.signUp.url,{
            method : SummaryApi.signUp.method,
            headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(data)
            });
            const dataResponse = await response.json();
            if(dataResponse.success){
                toast.success(dataResponse.message);
                navigate("/login");
            }
            if(dataResponse.error){
                toast.error(dataResponse.message);
            }
        }
        else{
            toast.error("Password doesn't match with confirm password");
        }
    }

    const handleUploadPic = async(event)=>{
        const file = event.target.files[0];
        const imagePic = await ImageToBase64(file);
        setData((previous)=>{
            return{
                ...previous,
                profileImage : imagePic
            }
        })
    }

    return(
        <section id="signup">
            <div className="mx-auto container p-4">
                <div className="bg-white p-2 py-4 w-full max-w-md mx-auto">
                    <div className="w-28 h-28 mx-auto relative overflow-hidden rounded-full">
                            {
                                data.profileImage ? <img src={data.profileImage} alt="ProfileImage"/> : <AccountCircleSharpIcon style={{fontSize : "110px",color:"#f3bd59"}}/>
                            }
                        <form>
                            <label>
                                <div className="text-xs bg-transparent py-1 ml-1 sbg-opacity-80 text-center absolute bottom-0 w-24 cursor-pointer mb-2" style={{fontSize:"11px",backgroundColor:"#ffffff",opacity:"0.8",fontWeight:"600"}}>
                                    Upload Photo<br/><AddPhotoAlternateIcon style={{fontSize:"12px"}}/>
                                </div>
                                <input type="file" className="hidden" onChange={handleUploadPic}/>
                            </label>
                        </form>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid p-3">
                            <label>Name :</label>
                            <div className="p-2 bg-slate-100">
                                <input 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    value={data.name}
                                    name="name"
                                    required
                                    onChange={handleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="grid p-3">
                            <label>Email :</label>
                            <div className="p-2 bg-slate-100">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={data.email}
                                    name="email"
                                    required
                                    onChange={handleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="p-3">
                            <label>Password :</label>
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
                        <div className="p-3">
                            <label>Confirm Password :</label>
                            <div className="p-2 bg-slate-100 flex">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Enter confirm password" 
                                    value={data.confirmPassword}
                                    name="confirmPassword"
                                    required
                                    onChange={handleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div className="cursor-pointer" onClick={()=>setShowConfirmPassword((previous)=>!previous)}>
                                    <span>
                                        {
                                            showConfirmPassword ?
                                            (<VisibilityOffIcon/>) : (<VisibilityIcon/>)
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto text-center flex justify-center p-5">
                            <SignUpPageButton/>
                        </div>
                        <p className="my-2 text-center">Already have a account?  
                            <Link to={"/login"} className="hover:underline ml-2" 
                                style={{
                                        color: isHoveredSU ? 'black' : '#efa92a',
                                        cursor: 'pointer',
                                        fontSize:"16px"
                                    }}
                                        onMouseEnter={() => setIsHoveredSU(true)}
                                        onMouseLeave={() => setIsHoveredSU(false)}>
                                        Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUp;