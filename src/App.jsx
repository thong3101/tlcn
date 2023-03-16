import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { BrowserRouter } from "react-router-dom";
import ConfigRoute from "./ConfigRoute";
import "./app/style/App.scss";
import "./input.css";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./apis/axiosClient";
import { loginSuccess, logoutSuccess } from "./slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const isAdmin = window.location.href.includes("admin");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  if (user) {
    axiosInstance(user, dispatch, loginSuccess, logoutSuccess);
  }
  const isAdmin = window.location.href.includes("admin");
  const isSeller = window.location.href.includes("seller");
  return (
    <div className="App">
      <BrowserRouter>
        {/* <CheckAuthentication /> */}
        <ScrollToTop>
          <ToastContainer />
          {isAdmin || isSeller ? null : <Header />}
          
          <ConfigRoute />
          {isAdmin || isSeller ? null : <Footer />}

        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
