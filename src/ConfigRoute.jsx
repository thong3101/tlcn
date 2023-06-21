import ChangePassword from "./components/ChangePassword";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import ChatArea from "./pages/ChatArea";
import CustomerAccount from "./pages/CustomerAccount";
import FilterProduct from "./pages/FilterProduct";
import FilterProductSearch from "./pages/FilterProductSearch";
import Home from "./pages/Home";
import LoginShipper from "./pages/LoginShipper";
import Payment from "./pages/Payment";
import ProductDetail from "./pages/ProductDetail";
import RegisterShipper from "./pages/RegisterShipper";
import Seller from "./pages/Seller";
import Shipper from "./pages/Shipper";

import LoadingPage from "./components/LoadingPage";

import PrivateRoute from "./components/PrivateRoute";
import RegisterSeller from "./pages/RegisterSeller";

import { Route, Routes } from "react-router-dom";

function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cart" element={<Cart />} />

      {/* Routing customer account */}
      <Route element={<PrivateRoute roles={["USER", "ADMIN", "SELLER"]} />}>
        <Route path="payment" element={<Payment />} />
        <Route path="my-account/*" element={<CustomerAccount />} />
        <Route path="chat" element={<ChatArea />} />
        <Route path="license" element={<RegisterSeller />} />
      </Route>

      <Route element={<PrivateRoute roles={["ADMIN"]} />}>
        <Route path="admin/*" element={<Admin />} />
      </Route>

      <Route element={<PrivateRoute roles={["SELLER"]} />}>
        <Route path="seller/*" element={<Seller />} />
      </Route>

      <Route element={<PrivateRoute roles={["SHIPPER"]} />}>
        <Route path="/shipper/*" element={<Shipper />} />
      </Route>

      <Route path="shipper/login" element={<LoginShipper />} />
      <Route path="shipper/register" element={<RegisterShipper />} />

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
