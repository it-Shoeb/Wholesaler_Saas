import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";

import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
} from "react-router";
import { ToastContainer } from "react-toastify";

// import Layout from "./components/layout/Layout.jsx";
// import ProductCreate from "./pages/product/ProductCreate.jsx";
// import ProductUpdate from "./pages/product/ProductUpdate.jsx";
// import ProductGet from "./pages/product/ProductGet.jsx";
// import ProductAGet from "./pages/product/ProductAGet.jsx";
// import OrderCreate from "./pages/order/OrderCreate.jsx";
// import OrderUpdate from "./pages/order/OrderUpdate.jsx";
// import OrderGet from "./pages/order/OrderGet.jsx";
// import OrderAGet from "./pages/order/OrderAGet.jsx";
// import UserCreate from "./pages/user/UserCreate.jsx";
// import UserUpdate from "./pages/user/UserUpdate.jsx";
// import UserGet from "./pages/user/UserGet.jsx";
// import UserAGet from "./pages/user/UserAGet.jsx";
// import InvoiceAGet from "./pages/invoice/InvoiceAGet.jsx";
// import LoginPage from "./pages/authentication/LoginPage.jsx";
// import RegistrationPage from "./pages/authentication/RegistrationPage.jsx";

// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { AuthContextProvider } from "./contexts/AuthContextProvider.jsx";
// import Root from "./components/layout/Root.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         element: <ProtectedRoute />,
//         children: [
//           {
//             element: <Layout />,
//             children: [
//               {
//                 path: "product/create",
//                 element: (
//                   <ProductCreate heading={"Create Product"}></ProductCreate>
//                 ),
//               },
//               {
//                 path: "product/update/:id",
//                 element: (
//                   <ProductUpdate heading={"ProductUpdate"}></ProductUpdate>
//                 ),
//               },
//               {
//                 path: "product/get/",
//                 element: <ProductGet heading={"ProductGet"}></ProductGet>,
//               },
//               {
//                 path: "product/get/:id",
//                 element: <ProductAGet heading={"ProductAGet"}></ProductAGet>,
//               },
//               {
//                 path: "order/create",
//                 element: <OrderCreate heading={"Create Order"}></OrderCreate>,
//               },
//               {
//                 path: "order/update/:id",
//                 element: <OrderUpdate heading={"Order Update"}></OrderUpdate>,
//               },
//               {
//                 path: "order/get/",
//                 element: <OrderGet heading={"Order Get"}></OrderGet>,
//               },
//               {
//                 path: "order/get/:id",
//                 element: <OrderAGet heading={"Order A Get"}></OrderAGet>,
//               },
//               {
//                 path: "customer/create",
//                 element: <UserCreate heading={"Create User"}></UserCreate>,
//               },
//               {
//                 path: "customer/update/:id",
//                 element: <UserUpdate heading={"User Update"}></UserUpdate>,
//               },
//               {
//                 path: "customer/get/",
//                 element: <UserGet heading={"User Get"}></UserGet>,
//               },
//               {
//                 path: "customer/get/:id",
//                 element: <UserAGet heading={"User A Get"}></UserAGet>,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         path: "/login",
//         element: <LoginPage></LoginPage>,
//       },
//       {
//         path: "/registration",
//         element: <RegistrationPage></RegistrationPage>,
//       },
//       {
//         path: "/invoice/get/:id",
//         element: <InvoiceAGet heading={"User A Get"}></InvoiceAGet>,
//       },
//     ],
//   },
// ]);

import { AuthContextProvider } from "./contexts/AuthContextProvider";
createRoot(document.getElementById("root")).render(
  <>
    {/* <AuthContextProvider> */}
    <ToastContainer />
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
    {/* <RouterProvider router={router} /> */}
    {/* </AuthContextProvider> */}
  </>
);
