import React, { useState } from "react";
import CloseButton from "../buttons/CloseButton";
import ROLE from "../common/role";
import ChangeRoleButton from "../buttons/ChangeRoleButton";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({name,email,role,userId,onClose,callFunction})=>{
    const [userRole,setUserRole] = useState(role);

    const handleOnChangeSelect = (event)=>{
        setUserRole(event.target.value);
    }

    const updateUserRole = async()=>{
        const fetchResponse = await fetch(SummaryApi.update_user.url,{
            method : SummaryApi.update_user.method,
            credentials:"include",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({userId : userId,role : userRole})
        });
        const dataResponse = await fetchResponse.json();
        if(dataResponse.success){
            toast.success(dataResponse.message);
            onClose();
            callFunction();
        }
        if(dataResponse.error){
            toast.error(dataResponse.error);
        }
    }

    return(
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
            <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
                <button className="block ml-auto" onClick={onClose}><CloseButton/></button>
                <h1 className="pb-4 text-2xl font-medium text-center" style={{fontWeight:"600"}}>
                    Change user role
                </h1>
                <hr className="p-3"/>
                <p className="mb-2" style={{fontWeight:"600"}}>Name : {name}</p>
                <p className="mb-2" style={{fontWeight:"600"}}>Email : {email}</p>
                <div className="flex items-center my-4">
                    <p className="mr-8" style={{fontWeight:"600"}}>Role :</p>
                    <select 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block p-1  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleOnChangeSelect}
                        value={userRole}
                    >
                        {
                            Object.values(ROLE).map(element =>{
                                return(
                                    <option value={element} key={element}>{element}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="mx-24 my-5 mt-8" onClick={updateUserRole}>
                    <ChangeRoleButton/>
                </div>
            </div>
        </div>
    )
}

export default ChangeUserRole;