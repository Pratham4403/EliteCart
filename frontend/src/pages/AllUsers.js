import React from "react";
import { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useEffect } from "react";
import moment from "moment";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = ()=>{
    const [allUsers,setAllUsers] = useState([]);
    const [openUpdateRole,setOpenUpdateRole] = useState(false);
    const [updateUserDetails,setUpdateUserDetails] = useState({
        _id : "",
        name : "",
        email : "",
        role : ""
    });

    const fetchAllUsers = async()=>{
        const fetchData = await fetch(SummaryApi.all_users.url,{
            method : SummaryApi.all_users.method,
            credentials : "include"
        });
        const dataResponse = await fetchData.json();
        if(dataResponse.success){
            setAllUsers(dataResponse.data);
        }
        if(dataResponse.error){
            toast.error(dataResponse.message);
        }
    }

    useEffect(()=>{
        fetchAllUsers()
    },[]);

    return (
        <div className="bg-white pb-4 mt-4">
            <table className="w-full userTable">
                <thead>
                    <tr className="bg-black text-white">
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((element,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{element?.name}</td>
                                    <td>{element?.email}</td>
                                    <td>{element?.role}</td>
                                    <td>{moment(element?.createdAt).format('LL')}</td>
                                    <td>
                                        <button onClick={()=>{
                                            setUpdateUserDetails(element);
                                            setOpenUpdateRole(true);
                                        }}>
                                            <ModeEditSharpIcon/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                openUpdateRole && 
                (
                    <ChangeUserRole
                        userId={updateUserDetails._id}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        onClose={()=>setOpenUpdateRole(false)}
                        callFunction={fetchAllUsers}
                    />
                )
            }
        </div>
    )
}

export default AllUsers;