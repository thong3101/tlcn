import Home from "./pages/Home";
import CustomerAccount from "./pages/CustomerAccount";
import ProductDetail from "./pages/ProductDetail";
import FilterProduct from "./pages/FilterProduct";
import FilterProductSearch from "./pages/FilterProductSearch";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";
import ChangePassword from "./components/ChangePassword";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin";
import Seller from "./pages/Seller";


import LoadingPage from "./components/LoadingPage"


import PrivateRoute from "./components/PrivateRoute";


import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function ConfigRoute() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="cart" element={<Cart />} />

      {/* Routing customer account */}
      <Route element={<PrivateRoute roles={["USER", "ADMIN"]} />}>
        <Route path="payment" element={<Payment />} />
        <Route path="my-account/*" element={<CustomerAccount />} />
      </Route>

      <Route element={<PrivateRoute roles={["ADMIN"]} />}>
        <Route path="admin/*" element={<Admin />} />
      </Route>

      <Route element={<PrivateRoute roles={["ADMIN"]} />}>
        <Route path="seller/*" element={<Seller />} />
      </Route>


      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="product-detail/:id" element={<ProductDetail />} />
      <Route path="product-category/:id" element={<FilterProduct />} />
      <Route path="search/:key" element={<FilterProductSearch />} />
      <Route path="/paypal/success" element={<LoadingPage />} />
      <Route path="reset" element={<ChangePassword />} />

      <Route path="loading" element={<LoadingPage />} />
    </Routes>
  );
}

export default ConfigRoute;
