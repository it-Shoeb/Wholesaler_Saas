import React, { useEffect, useState } from "react";
import {
  getCustomer,
  putCustomer,
} from "../../../services/customer/CustomerApi";
import { toast } from "react-toastify";

import FormInput from "../../common/FormInput.jsx";
import FormBase from "../../common/FormBase.jsx";
import useForm from "../../../services/hook/useForm.js";

export default function CustomerUpdate({ CustomerId }) {
  const initialValues = {
    customerName: "",
    customerNumber: "",
    customerEmail: "",
    customerImage: "",
  };

  const { Values, handleChange, setValues, resetForm } = useForm(initialValues);

  useEffect(() => {
    fetchCustomer();
  }, [CustomerId]);

  const fetchCustomer = async () => {
    const { data, error } = await getCustomer(CustomerId);
    if (error) {
      toast.error(error);
    }
    setValues(data.data);
    toast.success(data.data.message);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(Values).forEach((key) => {
      formData.append(key, Values[key]);
    });

    // for (const key in Values) {
    //   formData.append(key, Values[key]);
    // }

    const { data, error } = await putCustomer(CustomerId, formData);
    if (error) {
      toast.error(error);
    }
    resetForm(initialValues);
    toast.success(data.message);
  };

  return (
    <>
      <div className="">
        <FormBase
          onSubmit={handleForm}
          title="Update Customer"
          enctype="multipart/form-data"
        >
          <FormInput type="file" name="customerImage" onChange={handleChange} />

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
