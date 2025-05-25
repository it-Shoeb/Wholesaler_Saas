import "./App.css";

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

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<ProductGet />} /> */}
            <Route path="product/get" element={<ProductGet />} />
            <Route path="product/create" element={<ProductCreate />} />
            <Route path="customer/get" element={<GetCustomers />} />
            <Route path="customer/create" element={<CreateCustomer />} />
            {/* <Route path="product/get" element={<ProductGet />} /> */}
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
