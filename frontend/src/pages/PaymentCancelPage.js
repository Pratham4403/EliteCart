import React from "react";
import PaymentCancelImage from "../assets/cancel.gif";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const PaymentCancelPage = ()=>{
    return(
        <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-5 m-2 mt-14 mb-14 rounded">
            <img src={PaymentCancelImage} width={150} height={150} alt="PaymentCancelled" className="mt-5 mix-blend-multiply"/>
            <p className="text-red-600 font-bold text-xl mt-4 mb-4">Payment Cancelled!</p>
            <Link to={"/view-cart"} className="p-2 px-3 mt-6 mb-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white">
                Go to cart <KeyboardDoubleArrowRightIcon/>
            </Link>
        </div>
    )
}

export default PaymentCancelPage;