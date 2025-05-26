import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContextProvider";
// import { AuthContext } from "../contexts/AuthContextProvider";

export default function PublicRoute() {
  const { IsAuthenticate, Loading } = UseAuth();
  // const { IsAuthenticate, Loading } = useContext(AuthContext);

  if (Loading) return <p>Loading...</p>;
  return IsAuthenticate ? <Navigate to={"/product/get"} replace /> : <Outlet />;
}
