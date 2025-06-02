import "./style.css";

import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute.jsx";

import Layout from "./components/layout/Layout";

import ProductGet from "./pages/product/ProductGet";
import ProductCreate from "./pages/product/ProductCreate";
// import ProductGet from "./pages/product/Product";

import LoginPage from "./pages/authentication/LoginPage.jsx";
import RegistrationPage from "./pages/authentication/RegistrationPage.jsx";
import GetCustomers from "./pages/customer/GetCustomers.jsx";
import CreateCustomer from "./pages/customer/CreateCustomer.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Navbar from "./components/common/Navbar.jsx";
import OrderGet from "./pages/order/OrderGet.jsx";
import OrderCreate from "./pages/order/OrderCreate.jsx";
import InvoiceAGet from "./pages/invoice/InvoiceAGet.jsx";
import UsersGet from "./pages/user/UserGet.jsx";
import OrderUpdate from "./pages/order/OrderUpdate.jsx";

function App() {
  return (
    <>
      {/* <Navbar> */}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<ProductGet />} /> */}
            <Route index element={<Dashboard />} />
            <Route path="/product/get" element={<ProductGet />} />
            <Route path="/product/create" element={<ProductCreate />} />
            <Route path="/customer/get" element={<GetCustomers />} />
            <Route path="/customer/create" element={<CreateCustomer />} />
            <Route path="/order/get" element={<OrderGet />} />
            <Route path="/order/create" element={<OrderCreate />} />
            <Route path="/order/update/:id" element={<OrderUpdate />} />
            <Route path="/users/get" element={<UsersGet />} />
            {/* <Route path="product/get" element={<ProductGet />} /> */}
          </Route>
        </Route>
        <Route path="/invoice/get/:id" element={<InvoiceAGet />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
      {/* </Navbar> */}
    </>
  );
}

export default App;
