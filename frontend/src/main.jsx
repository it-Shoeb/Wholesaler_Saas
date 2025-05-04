import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router";

import Layout from "./components/layout/Layout.jsx";
import { ToastContainer } from "react-toastify";

import ProductCreate from "./pages/product/ProductCreate.jsx";
import ProductUpdate from "./pages/product/ProductUpdate.jsx";
import ProductGet from "./pages/product/ProductGet.jsx";
import ProductAGet from "./pages/product/ProductAGet.jsx";
import ProductDelete from "./pages/product/ProductDelete.jsx";

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
        path: "/product/delete",
        element: <ProductDelete heading={"ProductDelete"}></ProductDelete>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>
);
