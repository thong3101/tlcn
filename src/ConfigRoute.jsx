import Home from "./pages/Home";
import CustomerAccount from "./pages/CustomerAccount";
import ProductDetail from "./pages/ProductDetail";
import FilterProduct from "./pages/FilterProduct";
import Cart from "./pages/Cart";

import PrivateRoute from "./components/PrivateRoute"

import { Route, Routes } from "react-router-dom";

function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cart" element={<Cart />} />

      {/* Routing customer account */}
      <Route element={<PrivateRoute roles={["USER", "ADMIN"]} />}>
        <Route path="my-account/*" element={<CustomerAccount />} />
      </Route>


      <Route path="product-detail/:id" element={<ProductDetail />} />
      <Route path="product-category/:id" element={<FilterProduct />} />
    </Routes>
  );
}

export default ConfigRoute;
