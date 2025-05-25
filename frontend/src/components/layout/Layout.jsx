import { Outlet } from "react-router";
import Navbar from "../common/Navbar.jsx";

export default function Layout() {
  return (
    <>
        <div className="wrapper sm:p-4 p-2 min-h-screen bg-secondary font-Josefin">
          <Navbar />
          <div className="sm:ml-0 ml-9 mt-2">
            <Outlet />
          </div>
        </div>
    </>
  );
}
