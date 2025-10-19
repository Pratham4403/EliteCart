import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common/index';
import Context from './context/index';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/UserSlice';
import { useState } from 'react';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0);

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    }) ;
    const dataApi = await dataResponse.json();
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data));
    }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.count_products_in_cart.url,{
      method : SummaryApi.count_products_in_cart.method,
      credentials : "include"
    })
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  }

  useEffect(()=>{
    fetchUserDetails();      //Fetch user details
    fetchUserAddToCart();   //User details cart product
  },[]);

  return (
  <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >

      <Context.Provider value={{
        fetchUserDetails, //user details fetch
        cartProductCount,  //Current user add to product count
        fetchUserAddToCart
      }}>

        <ToastContainer position='top-center'/>
        <Header/>

        {/* Displays all routes in router through --> routes->index.js */}
        <main style={{ flex: 1 }} className='pt-20'>
          <ScrollToTop/>
          <Outlet/>
        </main>
        
        <Footer/>
      </Context.Provider>
  </div>
  );
}

export default App;