import React, { useEffect, useState } from "react";

import { Outlet } from "react-router";
import Navbar from "../common/Navbar.jsx";
import { useNavigate } from "react-router";
import api from "../../services/api.js";
import { redirect } from "react-router";

export default function Layout() {
  const [User, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const response = await api.get("/authentication/check");
    console.log(response);

    if (response.data.user) {
      setUser(response.data.user);
      console.log(response.data.user);
    } else {
      navigate("/login");
      // redirect('/login')
      setUser(null);
      // setTimeout(() => {
      // }, 1000);
    }
  };

  return (
    <>
      <div className="wrapper sm:p-4 p-2 min-h-screen bg-secondary font-Josefin">
        <Navbar />
        <div className="sm:ml-0 ml-9 mt-2">
          <Outlet />
        </div>
      </div>
    </>
    /* {User ? ( */
    // ) : (
    //   <div className="border-8 flex flex-col h-screen items-center justify-center">
    //     <p className="text-center font-bold text-2xl">
    //       Loading or Redirecting...
    //     </p>
    //     <button
    //       onClick={(e) => {
    //         navigate("/login");
    //       }}
    //       className="p-2 bg-gray-200 rounded-md my-3"
    //     >
    //       Go Back Login
    //     </button>
    //   </div>
    // )}
  );
}
