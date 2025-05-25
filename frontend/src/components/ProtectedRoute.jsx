import { UseAuth } from "../contexts/AuthContextProvider.jsx";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { IsAuthenticate, Loading } = UseAuth();
  console.log("isAuthenticated, loading:", IsAuthenticate, Loading);

  if (Loading) return <div>Loading...</div>;
  return IsAuthenticate ? <Outlet /> : <Navigate to="/login" replace />;
}
