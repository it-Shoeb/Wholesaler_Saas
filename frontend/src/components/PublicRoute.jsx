import React from "react";
import { UseAuth } from "../contexts/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { IsAuthenticate, Loading } = UseAuth();

  if (Loading) return <p>Loading...</p>;
  return IsAuthenticate ? <Navigate to={"/product/get"} replace /> : <Outlet />;
}
