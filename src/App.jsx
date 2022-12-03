import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import ConfigRoute from "./ConfigRoute";
import "./app/style/App.scss";

import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./apis/axiosClient";
import { loginSuccess, logoutSuccess } from "./slices/authSlice";

function App() {

  // const isAdmin = window.location.href.includes("admin");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  if (user) {
    axiosInstance(user, dispatch, loginSuccess, logoutSuccess);
  }
  return (
    <div className="App">
      <BrowserRouter>
        {/* <CheckAuthentication /> */}
        <Header />
        <ConfigRoute />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
