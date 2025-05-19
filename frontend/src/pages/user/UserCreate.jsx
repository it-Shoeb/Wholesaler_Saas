import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function UserCreate({ heading }) {
  const navigate = useNavigate();

  const [User, setUser] = useState({
    customerName: "",
    customerEmail: "",
    customerNumber: "",
    customerImage: "",
  });

  const handleFormData = (e) => {
    const { name, value, files } = e.target;
    console.log(' { name, value, files }:',  { name, value, files })

    let newValue;
    if (name === "customerImage") {
      newValue = files[0];
    } else {
      newValue = value;
    }

    setUser((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      for (const key in User) {
        formData.append(key, User[key]);
        console.log("key, User[key]:", key, User[key]);
      }

      const response = await api.post("/customer", formData);
      if (!response.data.success) {
        return toast.error(response.data.message);
      }
      toast.success(response.data.message);
      navigate("/customer/get");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {console.log(User)}
      <div className="wrapper min-h-[calc(100vh-90px)] bg-green-100">
        <div className="inner-wrapper">
          <p className="text-4xl font-bold">{heading}</p>
          <form
            action="/customer"
            enctype="multipart/form-data"
            method="POST"
            className="mt-4 flex flex-wrap"
            onSubmit={(e) => {
              handleForm(e);
            }}
          >
            <div className="flex gap-2 w-1/2 flex-col p-2">
              <label htmlFor="customerName">customerName</label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                className="border rounded-md p-2 focus:bg-green-200 focus:outline-green-400 w-full"
                placeholder="customerName"
                value={User.customerName}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex gap-2 w-1/2 flex-col p-2">
              <label htmlFor="customerEmail">customerEmail</label>
              <input
                type="text"
                name="customerEmail"
                id="customerEmail"
                className="border rounded-md p-2 focus:bg-green-200 focus:outline-green-400 w-full"
                placeholder="customerEmail"
                value={User.customerEmail}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex gap-2 w-1/2 flex-col p-2">
              <label htmlFor="customerNumber">customerNumber</label>
              <input
                type="text"
                name="customerNumber"
                id="customerNumber"
                className="border rounded-md p-2 focus:bg-green-200 focus:outline-green-400 w-full"
                placeholder="customerNumber"
                value={User.customerNumber}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>

            <div className="flex gap-2 w-1/2 flex-col p-2">
              <label htmlFor="customerImage">customerImage</label>
              <input
                type="file"
                name="customerImage"
                id="customerImage"
                className="border rounded-md p-2 focus:bg-green-200 focus:outline-green-400 w-full"
                // placeholder="customerImage"
                // value={User.customerImage}
                onChange={(e) => {
                  handleFormData(e)
                }}
              />
            </div>

            <div className="flex w-full gap-4 justify-end">
              <Link
                to={"/customer/get"}
                className="px-4 py-2 rounded-md bg-red-300 hover:bg-red-200 focus:bg-red-200"
              >
                Back
              </Link>
              <input
                type="submit"
                value="Create user"
                className="px-4 py-2 rounded-md bg-green-300 hover:bg-green-200 focus:bg-green-200 "
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
