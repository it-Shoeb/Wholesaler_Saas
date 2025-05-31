import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import FormBase from "../../components/common/FormBase";
import FormInput from "../../components/common/FormInput";
import useForm from "../../services/hook/useForm";
import { postCustomer } from "../../services/customer/CustomerApi";

export default function CreateCustomer() {
  const navigate = useNavigate();

  const initialValues = {
    customerName: "",
    customerEmail: "",
    customerNumber: "",
    customerImage: "",
  };

  const { Values, handleChange, resetForm } = useForm(initialValues);

  // const handleFormData = (e) => {
  //   const { name, value, files } = e.target;
  //   console.log(" { name, value, files }:", { name, value, files });

  //   let newValue;
  //   if (name === "customerImage") {
  //     newValue = files[0];
  //   } else {
  //     newValue = value;
  //   }

  //   setUser((prev) => ({ ...prev, [name]: newValue }));
  // };

  const handleForm = async (e) => {
    e.preventDefault();
    // try {
    const formData = new FormData();

    Object.keys(Values).forEach((key) => {
      formData.append(key, Values[key]);
      console.log("key, Values[key]:", key, Values[key]);
    });

    // for (const key in User) {
    //   formData.append(key, User[key]);
    //   console.log("key, User[key]:", key, User[key]);
    // }

    const { error, data } = await postCustomer(formData);
    if (error) {
      toast.error(error);
    }
    toast.success(data.message);
    navigate('/customer/get')

    // const response = await api.post("/customer", formData);
    // if (!response.data.success) {
    //   return toast.error(response.data.message);
    // }
    // toast.success(response.data.message);
    // navigate("/customer/get");
    // } catch (error) {
    //   toast.error(error);
    // }
  };
  return (
    <>
      {/* {console.log(User)} */}
      <div className="wrapper min-h-[calc(100vh-90px)] bg-white sm:p-4 p-2 rounded-2xlr">
        <div className="inner-wrapper">
          {/* <p className="text-4xl font-bold">{heading}</p> */}

          {/* <form
            action="/customer"
            enctype="multipart/form-data"
            method="POST"
            className="mt-4 flex flex-wrap"
            onSubmit={(e) => {
              handleForm(e);
              }}
              > */}
          <FormBase
            onSubmit={handleForm}
            title={"Create Customer"}
            enctype={"multipart/form-data"}
          >
            <FormInput
              type="file"
              name={"customerImage"}
              value={null}
              onChange={handleChange}
            />

            <FormInput
              label={"Customer Name"}
              name={"customerName"}
              placeholder={"Enter Customer Name"}
              value={Values.customerName}
              onChange={handleChange}
            />

            <FormInput
              label={"Customer Email"}
              name={"customerEmail"}
              placeholder={"Enter Customer Email"}
              value={Values.customerEmail}
              onChange={handleChange}
            />

            <FormInput
              label={"Customer Number"}
              name={"customerNumber"}
              placeholder={"Enter Customer Number"}
              value={Values.customerNumber}
              onChange={handleChange}
            />

            <div className="flex items-center gap-4">
              <Link
              to={'/customer/get'}
                className="p-2 bg-secondary hover:bg-gray-100 focus:outline-0 focus:bg-gray-100 rounded-md w-full text-center"
              >
                Back
              </Link>
              <input
                className="p-2 bg-secondary hover:bg-gray-100 focus:outline-0 focus:bg-gray-100 rounded-md w-full"
                type="submit"
                value="Create Customer"
              />
            </div>

            {/* <div className="flex gap-2 w-1/2 flex-col p-2">
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
                  handleFormData(e);
                }}
              />
            </div> */}

            {/* <div className="flex w-full gap-4 justify-end">
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
            </div> */}
            {/* </form> */}
          </FormBase>
        </div>
      </div>
    </>
  );
}
