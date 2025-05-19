import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="wrapper bg-green-100">
        <div className="inner-wrapper flex flex-col">
          <div className="navbar flex justify-between py-1 border-b-1 border-gray-300 px-8 py-2">
            <div className="navbar-left ">
              <div className="logo-container">
                <a href="">Logo</a>
              </div>
            </div>
            <div className="navbar-center flex">
              <nav>
                <ul className="flex sm:gap-x-16 gap-x-4">
                  <li>
                    <a href="#">Dashboard</a>
                  </li>
                  <li>
                    <a href="#">Reports & Analytics</a>
                  </li>
                  <li>
                    <a href="#">lorem</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="nav-bar-right flex sm:gap-x-8 gap-x-2">
              <button>a</button>
              <button
                onClick={async (e) => {
                  const response = await api.post("/authentication/logout");
                  console.log(response);
                  navigate("/login");
                  toast.success(response.data.message);
                }}
                className="text-sm bg-white p-1 rounded-md font-semibold cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="navbar-module px-8 py-2">
            <div className="mini-navbar-module">
              <ul className="flex sm:gap-x-16 gap-x-4 items-center justify-center">
                <li>
                  <Link to={"/product/get"}>Inventory Page</Link>
                </li>
                {/* <li>
                  <Link to={"/inventory/get"}>Inventory</Link>
                </li> */}
                <li>
                  <Link to={"/order/get"}>Sales Orders</Link>
                </li>
                <li>
                  <Link to={"/customer/get"}>Customers</Link>
                </li>
                <li>
                  <Link to={"/invoice/get"}>Order</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
