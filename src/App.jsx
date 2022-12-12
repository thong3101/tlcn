import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

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
  const isAdmin = window.location.href.includes("admin");
  return (
    <div className="App">
      <BrowserRouter>
        {/* <CheckAuthentication /> */}
        <ScrollToTop>
          {isAdmin ? null : <Header />}
          <ConfigRoute />
          {isAdmin ? null : <Footer />}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
