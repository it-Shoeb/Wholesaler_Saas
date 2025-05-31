import React, { useEffect, useState } from "react";
import {
  getCustomer,
  putCustomer,
} from "../../../services/customer/CustomerApi";
import { toast } from "react-toastify";

import FormInput from "../../common/FormInput.jsx";
import FormBase from "../../common/FormBase.jsx";
import useForm from "../../../services/hook/useForm.js";
import { Link } from "react-router-dom";

export default function CustomerUpdate({ CustomerId, setSidebar }) {
  const initialValues = {
    customerName: "",
    customerNumber: "",
    customerEmail: "",
    customerImage: "",
  };

  const [CurrentImage, setCurrentImage] = useState("");
  const { Values, handleChange, setValues, resetForm } = useForm(initialValues);

  useEffect(() => {
    fetchCustomer();
  }, [CustomerId]);

  const fetchCustomer = async () => {
    // const { data, error } = await getCustomer(CustomerId);
    // setCurrentImage(data.data.customerImage[0]?.filename || "");
    // if (error) {
    //   toast.error(error);
    // }
    // setValues(data.data);
    setValues(CustomerId);
    // toast.success(data.data.message);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(Values).forEach((key) => {
      formData.append(key, Values[key]);
    });

    console.log("Values:", Values);

    // for (const key in Values) {
    //   formData.append(key, Values[key]);
    // }

    const { data, error } = await putCustomer(CustomerId, formData);
    if (error) {
      toast.error(error);
    }

    toast.success(data.message);
    setSidebar(false);
    resetForm(initialValues);
    fetchCustomer();
  };

  return (
    <>
      <div className="">
        <FormBase
          onSubmit={handleForm}
          title="Update Customer"
          enctype="multipart/form-data"
        >
          <div className="img-super-container flex items-center justify-center">
            <div className="img-container w-1/3 relative">
              <img
                src={`http://localhost:3000/uploads/customers/${CurrentImage}`}
                alt=""
                className="aspect-square object-cover"
              />
              <FormInput
                type="file"
                name={"customerImage"}
                className="absolute top-0 left-0 w-full h-full opacity-0"
                onChange={handleChange}
              />
            </div>
          </div>

          <FormInput
            label="Customer Name"
            name="customerName"
            value={Values.customerName}
            onChange={handleChange}
            placeholder="Enter Customer Name"
          />

          <FormInput
            label="Customer Email"
            name="customerEmail"
            value={Values.customerEmail}
            onChange={handleChange}
            placeholder="Enter Customer Email"
          />

          <FormInput
            label="Customer Number"
            name="customerNumber"
            value={Values.customerNumber}
            onChange={handleChange}
            placeholder="Enter Customer Number"
          />

          <div className="flex items-center gap-4 mt-auto">
            <Link
              className="p-2 bg-secondary hover:bg-gray-100 focus:outline-0 focus:bg-gray-100 rounded-md w-full text-center"
              onClick={(e) => {
                setSidebar(false);
              }}
            >
              Discard
            </Link>
            <input
              className="p-2 bg-secondary hover:bg-gray-100 focus:outline-0 focus:bg-gray-100 rounded-md w-full"
              type="submit"
              value="Update Customer"
            />
          </div>
        </FormBase>

        {/* <form
          action=""
          onSubmit={(e) => {
            handleForm(e);
          }}
        >
          <div className="">
            <label htmlFor="customerName">customerName</label>
            <input
              type="text"
              name="customerName"
              id="customerName"
              value={Customer.customerName || " "}
              onChange={(e) => {
                handleFormData(e);
              }}
            />
          </div>
          <div className="">
            <label htmlFor="customerEmail">customerEmail</label>
            <input
              type="text"
              name="customerEmail"
              id="customerEmail"
              value={Customer.customerEmail || " "}
              onChange={(e) => {
                handleFormData(e);
              }}
            />
          </div>

          <div className="">
            <label htmlFor="customerNumber">customerNumber</label>
            <input
              type="text"
              name="customerNumber"
              id="customerNumber"
              value={Customer.customerNumber || " "}
              onChange={(e) => {
                handleFormData(e);
              }}
            />
          </div>

          <div className="submit-form">
            <input type="submit" value="Update Form" />
          </div>
        </form> */}
      </div>
    </>
  );
}
