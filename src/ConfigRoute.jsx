import Home from "./pages/Home";
import CustomerAccount from "./pages/CustomerAccount";
import ProductDetail from "./pages/ProductDetail";
import FilterProduct from "./pages/FilterProduct";
import PrivateRoute from "./components/PrivateRoute"
import { Route, Routes } from "react-router-dom";

function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Routing customer account */}
      {/* <Route element={<PrivateRoute roles={["USER",'ADMIN']} />}>
        <Route path="my-account/*" element={<CustomerAccount />} />
      </Route> */}
      <Route element={<PrivateRoute roles={["USER", "ADMIN"]} />}>
        <Route path="my-account/*" element={<CustomerAccount />} />
      </Route>
      {/* <Route path="my-account/*" element={<CustomerAccount />} /> */}
      <Route path="product-detail/:id" element={<ProductDetail />} />
      {/* <Route path="product-category/*" element={<Product />} /> */}
      {/* <Route path="product-category/:id" element={<FilterProduct />} /> */}
      <Route path="product-category/:id" element={<FilterProduct />} />
    </Routes>
  );
}

export default ConfigRoute;
