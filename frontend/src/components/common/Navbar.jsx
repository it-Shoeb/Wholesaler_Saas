import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

import { FaAlignRight } from "react-icons/fa6";
import { FaBorderAll } from "react-icons/fa6";
import { FaArchway } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";

import "../../App.css";

export default function Navbar() {
  const [IsActive, setIsActive] = useState(false);
  const [ActiveNavbar, setActiveNavbar] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <div className="wrapper bg-[#ffffff] rounded-full px-2">
        <div className="inner-wrapper flex flex-col p-2">
          <div className="navbar flex justify-between">
            <div className="navbar-left flex gap-2">
              <button
                onClick={(e) => {
                  setIsActive(!IsActive);
                }}
                className={`sm:hidden block cursor-pointer`}
              >
                <FaAlignRight />
              </button>
              <div className="logo-container flex items-center h-full">
                <a href="">Invy</a>
              </div>
            </div>

            <nav
              className={`sm:static mt-auto absolute top-15 h-[calc(100vh-70px)] sm:h-full sm:w-auto left-2 sm:p-0 ${
                IsActive ? "w-[60%]" : "w-[30px]"
              } transition-all duration-500 ease-in overflow-hidden`}
            >
              <ul
                className={`flex flex-col sm:flex-row gap-4 h-full bg-[#ffffff] rounded-2xl sm:p-0 z-50 ${
                  IsActive ? "px-4 py-4" : "px-0 py-4"
                } transition-all duration-500`}
              >
                <li>
                  <NavLink
                    className={`flex items-center justify-left gap-2 h-full sm:p-0 hover:bg-linear-to-l from-secondary to-white ${
                      IsActive ? "py-2 px-4" : "py-2 px-2"
                    }`}
                    onClick={(e) => {
                      console.log("e:", e);
                    }}
                    to={"/"}
                  >
                    <>
                      <div className="">
                        <FaBorderAll />
                      </div>
                      Dashboard
                    </>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`flex items-center justify-left gap-2 h-full sm:p-0 hover:bg-linear-to-l from-secondary to-white ${
                      IsActive ? "py-2 px-4" : "py-2 px-2"
                    }`}
                    onClick={(e) => {}}
                    to={"/product/get"}
                  >
                    <>
                      <div className="">
                        <FaArchway />
                      </div>
                      Inventory
                    </>
                  </NavLink>
                </li>
                {/* <li>
                  < className="flex items-center h-full gap-1 hover:bg justify-center>
                </li> */}
                <li>
                  <NavLink
                    className={`flex items-center justify-left gap-2 h-full sm:p-0 hover:bg-linear-to-l from-secondary to-white ${
                      IsActive ? "py-2 px-4" : "py-2 px-2"
                    }`}
                    onClick={(e) => {}}
                    to={"/order/get"}
                  >
                    <>
                      <div className="">
                        <FaBoxOpen />
                      </div>
                      Orders
                    </>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`flex items-center justify-left gap-2 h-full sm:p-0 hover:bg-linear-to-l from-secondary to-white ${
                      IsActive ? "py-2 px-4" : "py-2 px-2"
                    }`}
                    onClick={(e) => {}}
                    to={"/customer/get"}
                  >
                    <>
                      <div className="">
                        <FaUsers />
                      </div>
                      Customers
                    </>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`flex items-center justify-left gap-2 h-full sm:p-0 hover:bg-linear-to-l from-secondary to-white ${
                      IsActive ? "py-2 px-4" : "py-2 px-2"
                    }`}
                    onClick={(e) => {}}
                    to={""}
                  >
                    <>
                      <div className="">
                        <FaUserLarge />
                      </div>
                      Users
                    </>
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="nav-bar-right sm:gap-x-8 gap-x-2 flex items-center">
              <button
                onClick={async (e) => {
                  const response = await api.post("/authentication/logout");
                  console.log(response);
                  navigate("/login");
                  toast.success(response.data.message);
                }}
                className="text-sm bg-white p-1 rounded-md font-semibold cursor-pointer h-full"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
