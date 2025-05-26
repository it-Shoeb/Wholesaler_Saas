// import { UseAuth } from "../contexts/AuthContextProvider.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContextProvider";
import { useContext } from "react";

export default function ProtectedRoute() {
  const { IsAuthenticate, Loading } = UseAuth();
  // const { IsAuthenticate, Loading } = useContext(AuthContext);
  console.log("isAuthenticated, loading:", IsAuthenticate, Loading);

  if (Loading) {
    return <div>Loading...</div>;
  }

  return IsAuthenticate ? <Outlet /> : <Navigate to="/login" replace />;
}
