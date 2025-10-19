import React from "react";
import PaymentSuccessfulImage from "../assets/success.gif";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const PaymentSuccessPage = ()=>{
    return(
        <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-5 m-2 mt-14 mb-14 rounded">
            <img src={PaymentSuccessfulImage} width={150} height={150} alt="PaymentSuccessfull" className="mt-5"/>
            <p className="text-green-600 font-bold text-xl mt-4 mb-4">Payment Successfull!</p>
            <Link to={"/orders"} className="p-2 px-3 mt-6 mb-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white">
                See orders <KeyboardDoubleArrowRightIcon/>
            </Link>
        </div>
    )
}

export default PaymentSuccessPage;