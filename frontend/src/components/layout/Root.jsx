import React from "react";
import { AuthContextProvider } from "../../contexts/AuthContextProvider";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}
