import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

import "react-toastify/dist/ReactToastify.css";
import ConfigRoute from "./ConfigRoute";
import { axiosInstance } from "./apis/axiosClient";
import "./app/style/App.scss";
import "./input.css";
import { loginSuccess, logoutSuccess } from "./slices/authSlice";

function App() {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  if (user) {
    axiosInstance(user, dispatch, loginSuccess, logoutSuccess);
  }
  const [isAdmin,setIsAdmin]=useState(false)
  const [isSeller,setIsSeller]=useState(false)
  const [isShipper,setIsShipper]=useState(false)
 
  const history=useNavigate()

  useEffect(()=>{
    setIsAdmin(window.location.pathname.includes('/admin'))
    setIsSeller(window.location.pathname.includes('/seller'))
    setIsShipper(window.location.pathname.includes('/shipper'))    
  },[history])
  
  return (
    <div className="App">
        {/* <CheckAuthentication /> */}
        <ScrollToTop>
          <ToastContainer />
          {isAdmin || isSeller || isShipper ? null : <Header />}
          
          <ConfigRoute />
          {isAdmin || isSeller || isShipper ? null : <Footer />}

        </ScrollToTop>
    </div>
  );
}

export default App;
