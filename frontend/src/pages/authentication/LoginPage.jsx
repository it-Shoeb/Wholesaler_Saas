import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import { UseAuth } from "../../contexts/AuthContextProvider";
// import { AuthContext } from "../../contexts/AuthContextProvider";

import demoVideo from "/public/invy-demo.webm";

export default function LoginPage() {
  const { login, setIsAuthenticate } = UseAuth();
  // const { login, setIsAuthenticate } = useContext(AuthContext);
  const navigate = useNavigate();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  const [Loading, setLoading] = useState(false);

  const checkLogin = async () => {
    try {
      const data = await login(User);
      console.log("login page data:", data);
      // const { data } = await api.post("/authentication/login", { ...User });
      if (data?.success) {
        navigate("/product/get");
        setLoading(false);
      }
      setIsAuthenticate(true);
      toast.success(data?.message);
      console.log("response:", data);
    } catch (error) {
      toast.error(error.response.data?.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    checkLogin();
  };

  return (
    <>
      {console.log(User)}
      <div className="wrapper bg-secondary w-full h-dvh p-6">
        <div className="inner-wrapper bg-white w-full h-full rounded-2xl flex items-center justify-center">
          <div className="form-wrapper bg-secondary p-8 rounded-2xl md:w-1/3 w-[80%]">
            <p className="text-5xl text-center mb-12 font-bold">Login Page</p>
            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                handleForm(e);
              }}
            >
              <div>
                <label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Your Email"
                    className="border px-3 py-4 w-full rounded-2xl"
                    value={User.email}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <p>demo: admin@example.com</p>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="text"
                    name="password"
                    placeholder="Enter Your Password"
                    className="border px-3 py-4 w-full rounded-2xl"
                    value={User.password}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <p>demo: Admin@123</p>
                </label>
              </div>
              {/* <Link to={"/login"} className="self-end">
                Forget Password
              </Link> */}
              <div>
                <label>
                  <input
                    type="submit"
                    className="p-3 w-full rounded-2xl my-6 bg-black text-white font-bold border-0 cursor-pointer"
                    value={`${Loading ? "Please wait for a seconds..." : "Submit"}`}
                  />
                </label>
              </div>
              {/* <Link to={"/registration"} className="self-center">
                Create account
              </Link> */}
              <div className="">
                <p>Demo Video - Working on Locally</p>
                <video src={demoVideo} controls></video>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
