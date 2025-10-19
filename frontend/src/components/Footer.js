import React,{useState} from "react";
import { Link } from "react-router-dom";
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import GooglePlayButton from "../buttons/GooglePlay";
import AppStoreButton from "../buttons/AppStore";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = ()=>{
    const [isHoveredFB, setIsHoveredFB] = useState(false);
    const [isHoveredTW, setIsHoveredTW] = useState(false);
    const [isHoveredIN, setIsHoveredIN] = useState(false);
    const [isHoveredLN, setIsHoveredLN] = useState(false);
    const [isHoveredEM, setIsHoveredEM] = useState(false);

    return(
        <footer style={{backgroundColor:"white"}}>
            <div className="flex w-full px-20 items-center justify-between">
                <div className="items-center justify-center mt-4" style={{color:"#b3b3b3",fontSize:"13px",fontWeight:"300"}}>
                    <Link to={"/"}><img src="/assets/removeBgLogo.png" alt="EliteCart" style={{width:"40%",marginBottom:"15px",marginLeft:"50px"}}/></Link>
                    <CopyrightOutlinedIcon style={{fontSize:"18px",marginRight:"5px"}}/> 
                    EliteCart Commerce Private Limited
                </div>
                <div className="flex justify-center items-center">
                    <h1 style={{marginRight:"30px",color:"#4d4d4d",fontWeight:"600"}}>Download App</h1>
                    <GooglePlayButton/>
                    <AppStoreButton/>
                </div>
                <div className="flex items-center">
                    <Link to={"#"}  style={{
                                    color: isHoveredFB ? '#efa92a' : '#f1b341',
                                    cursor: 'pointer',
                                    fontSize:"15px"
                                }}
                                onMouseEnter={() => setIsHoveredFB(true)}
                                onMouseLeave={() => setIsHoveredFB(false)}>
                                    <FacebookRoundedIcon style={{marginRight:"10px",fontSize:"32px"}}/>
                    </Link>
                    <Link to={"#"} style={{
                                    color: isHoveredTW ? '#efa92a' : '#f1b341',
                                    cursor: 'pointer',
                                    fontSize:"15px"
                                }}
                                onMouseEnter={() => setIsHoveredTW(true)}
                                onMouseLeave={() => setIsHoveredTW(false)}>
                                    <XIcon style={{marginRight:"10px",fontSize:"30px"}}/>
                    </Link>
                    <Link to={"#"} style={{
                                    color: isHoveredIN ? '#efa92a' : '#f1b341',
                                    cursor: 'pointer',
                                    fontSize:"15px"
                                }}
                                onMouseEnter={() => setIsHoveredIN(true)}
                                onMouseLeave={() => setIsHoveredIN(false)}>
                                    <InstagramIcon style={{marginRight:"10px",fontSize:"30px"}}/>
                    </Link>
                    <Link to={"#"} style={{
                                    color: isHoveredLN ? '#efa92a' : '#f1b341',
                                    cursor: 'pointer',
                                    fontSize:"15px"
                                }}
                                onMouseEnter={() => setIsHoveredLN(true)}
                                onMouseLeave={() => setIsHoveredLN(false)}>
                                    <LinkedInIcon style={{marginRight:"10px",fontSize:"30px"}}/>
                    </Link>
                    <Link to={"#"} style={{
                                    color: isHoveredEM ? '#efa92a' : '#f1b341',
                                    cursor: 'pointer',
                                    fontSize:"15px"
                                }}
                                onMouseEnter={() => setIsHoveredEM(true)}
                                onMouseLeave={() => setIsHoveredEM(false)}>
                                    <EmailIcon style={{fontSize:"30px"}}/>
                    </Link>
                </div>
            </div>
            <p className="px-20 py-3 text-center" style={{color:"#999999",fontWeight:"300",fontSize:"12px"}}>“EliteCart” is owned & managed by "EliteCart Commerce Private Limited" and is not related, linked or interconnected in whatsoever manner or nature, to “ShopNest.in” which is a retail services business operated by “BlueRock Retail Solutions Private Limited”.</p>
        </footer>
    )
}

export default Footer;