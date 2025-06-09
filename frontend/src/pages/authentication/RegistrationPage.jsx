import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const authenticateUser = async () => {
    try {
      const response = await api.post("authentication/register", { ...User });
      console.log(response);

      toast.success(response);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = (e) => {
    console.log(User);

    e.preventDefault();
    authenticateUser();
  };
  return (
    <>
      <div className="wrapper bg-secondary w-full h-dvh p-6">
        <div className="inner-wrapper bg-white w-full h-full rounded-2xl flex items-center justify-center">
          <div className="form-wrapper bg-secondary p-8 rounded-2xl md:w-1/3 w-[80%]">
            <p className="text-5xl text-center mb-12 font-bold">
              Registration Page
            </p>
            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={(e) => handelSubmit(e)}
            >
              <div>
                <label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Your Name"
                    className="border px-3 py-4 w-full rounded-2xl"
                    value={User.username}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                </label>
              </div>
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
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="submit"
                    className="p-3 w-full rounded-2xl my-6 bg-black text-white font-bold focus:outline-none"
                  />
                </label>
              </div>
              <Link to={"/login"} className="self-center">
                Already Have Account
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
