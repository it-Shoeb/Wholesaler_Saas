import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router";

import Layout from "./components/layout/Layout.jsx";
import { ToastContainer } from "react-toastify";

import ProductCreate from "./pages/product/ProductCreate.jsx";
import ProductUpdate from "./pages/product/ProductUpdate.jsx";
import ProductGet from "./pages/product/ProductGet.jsx";
import ProductAGet from "./pages/product/ProductAGet.jsx";
import AddInventory from "./pages/inventory/AddInventory.jsx";
import InventoryItems from "./pages/inventory/InventoryItems.jsx";
import InventoryUpdate from "./pages/inventory/InventoryUpdate.jsx";
import OrderCreate from "./pages/order/OrderCreate.jsx";
import OrderUpdate from "./pages/order/OrderUpdate.jsx";
import OrderGet from "./pages/order/OrderGet.jsx";
import OrderAGet from "./pages/order/OrderAGet.jsx";
import UserCreate from "./pages/user/UserCreate.jsx";
import UserUpdate from "./pages/user/UserUpdate.jsx";
import UserGet from "./pages/user/UserGet.jsx";
import UserAGet from "./pages/user/UserAGet.jsx";
import InvoiceAGet from "./pages/invoice/InvoiceAGet.jsx";
import LoginPage from "./pages/authentication/LoginPage.jsx";
import RegistrationPage from "./pages/authentication/RegistrationPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/product/create",
        element: <ProductCreate heading={"Create Product"}></ProductCreate>,
      },
      {
        path: "/product/update/:id",
        element: <ProductUpdate heading={"ProductUpdate"}></ProductUpdate>,
      },
      {
        path: "/product/get/",
        element: <ProductGet heading={"ProductGet"}></ProductGet>,
      },
      {
        path: "/product/get/:id",
        element: <ProductAGet heading={"ProductAGet"}></ProductAGet>,
      },
      {
        path: "/inventory/create",
        element: <AddInventory heading={"Add Item"}></AddInventory>,
      },
      {
        path: "/inventory/get",
        element: <InventoryItems heading={"Inventory Item"}></InventoryItems>,
      },
      {
        path: "/inventory/update/:id",
        element: (
          <InventoryUpdate heading={"Update Inventory"}></InventoryUpdate>
        ),
      },
      {
        path: "/order/create",
        element: <OrderCreate heading={"Create Order"}></OrderCreate>,
      },
      {
        path: "/order/update/:id",
        element: <OrderUpdate heading={"Order Update"}></OrderUpdate>,
      },
      {
        path: "/order/get/",
        element: <OrderGet heading={"Order Get"}></OrderGet>,
      },
      {
        path: "/order/get/:id",
        element: <OrderAGet heading={"Order A Get"}></OrderAGet>,
      },
      {
        path: "/customer/create",
        element: <UserCreate heading={"Create User"}></UserCreate>,
      },
      {
        path: "/customer/update/:id",
        element: <UserUpdate heading={"User Update"}></UserUpdate>,
      },
      {
        path: "/customer/get/",
        element: <UserGet heading={"User Get"}></UserGet>,
      },
      {
        path: "/customer/get/:id",
        element: <UserAGet heading={"User A Get"}></UserAGet>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/registration",
    element: <RegistrationPage></RegistrationPage>,
  },
  {
    path: "/invoice/get/:id",
    element: <InvoiceAGet heading={"User A Get"}></InvoiceAGet>,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>
);
