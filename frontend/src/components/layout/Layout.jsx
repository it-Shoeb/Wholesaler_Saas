import React from "react";

import { Outlet } from "react-router";

import Navbar from "../common/Navbar.jsx";

export default function Layout() {
  return (
    <>
      <div className="wrapper p-1">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
