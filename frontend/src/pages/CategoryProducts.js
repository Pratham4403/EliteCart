import React, { useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import productCategory from "../helpers/ProductCategory";
import VerticalCard from "../components/VerticalCard";

const CategoryProduct = ()=>{
    const [data,setData] = useState([]);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListInArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListInArray.forEach(element => {
        urlCategoryListObject[element] = true;
    });
    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList,setFilterCategoryList] = useState([]);
    const [sortBy,setSortBy] = useState("");

    const fetchData = async()=>{
        const response = await fetch(SummaryApi.filter_product.url,{
            method : SummaryApi.filter_product.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                category : filterCategoryList
            })
        })
        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
    }

    const handleSelectCategory = (event)=>{
        const {value,checked} = event.target;
        setSelectCategory((previous)=>{
            return{
                ...previous,
                [value] : checked
            }
        })
    }

    useEffect(()=>{
        fetchData()
    },[filterCategoryList]);

    useEffect(()=>{
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
            if(selectCategory[categoryKeyName]){
                return categoryKeyName;
            }
            return null;
        }).filter(element => element);
        setFilterCategoryList(arrayOfCategory);
        //Format for URL change when change on the checkbox
        const urlFormat = arrayOfCategory.map((element,index)=>{
            if((arrayOfCategory.length-1) === index){
                return `category=${element}`;
            }
            return `category=${element}&&`
        });
        navigate("/product-category?"+urlFormat.join(""));
    },[selectCategory]);

    const handleOnChangeSortBy = (event)=>{
        const {value} = event.target;
        setSortBy(value);
        if(value === "asc"){
            setData(previous => previous.sort((a,b)=>a.sellingPrice - b.sellingPrice));
        }
        if(value === "desc"){
            setData(previous => previous.sort((a,b)=>b.sellingPrice - a.sellingPrice));
        }
    }

    useEffect(()=>{
    },[sortBy]);

    return(
        <div className="container mx-auto p-4">
            {/* Desktop version */}
            <div className="hidden lg:grid grid-cols-[200px,1fr]">
                {/* Left Side */}
                <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
                    {/* Sort by part */}
                    <div className="">
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Sort By</h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            <div className="flex items-center gap-3">
                                <input type="radio" name="sortBy" checked={sortBy === "asc"} onChange={handleOnChangeSortBy} value={"asc"}/>
                                <label>Price - Low to High</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="radio" name="sortBy" checked={sortBy === "desc"} onChange={handleOnChangeSortBy} value={"desc"}/>
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/* Filter By */}
                    <div>
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            {
                                productCategory.map((categoryName,index)=>{
                                    return(
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" name={"product"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>
                {/* Right Side (product) */}
                <div className="px-4">
                    <p className="font-medium text-slate-800 text-lg my-2">Search Results : {data.length}</p>    
                    <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
                        {
                            data.length !== 0 && !loading && (
                                <VerticalCard data={data} loading={loading}/>
                            )
                        }
                    </div>                        
                </div>           
            </div>
        </div>
    )
}

export default CategoryProduct;