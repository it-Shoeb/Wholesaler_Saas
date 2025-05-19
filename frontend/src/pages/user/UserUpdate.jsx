import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function UserUpdate({ heading }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Customer, setCustomer] = useState({
    customerName: "",
    customerEmail: "",
    customerNumber: "",
    customerImage: "",
  });

  const setUpCustomers = async () => {
    try {
      const response = await api.get(`/customer/${id}`);
      setCustomer(response.data.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    setUpCustomers();
  }, []);

  const handleFormData = (e) => {
    const { name, value, files } = e.target;
    console.log("name, value, files:", name, value, files);

    let newValue;

    if (name === "customerImage") {
      newValue = files[0];
    } else {
      newValue = value;
    }

    setCustomer((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in Customer) {
      formData.append(key, Customer[key]);
      console.log("key, Customer[key]:", key, Customer[key]);
    }

    try {
      const response = await api.put(`/customer/${id}`, formData);
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
      {console.log(Customer)}
      <div className="wrapper min-h-[calc(100vh-90px)] bg-green-100">
        <div className="inner-wrapper">
          <p className="text-4xl font-bold">{heading}</p>
          <form
            action="/customer"
            className="mt-4 flex flex-wrap"
            method="put"
            enctype="multipart/form-data"
            onSubmit={(e) => {
              handleForm(e);
            }}
          >
            <div className="w-full flex flex-col items-center justify-center p-4 ">
              <div className="image-container w-1/2 sm:w-1/3 md:w-1/5 aspect-square rounded-full overflow-hidden flex items-center justify-center relative shadow">
                <img
                  src={`http://localhost:3000/uploads/customers/${Customer.customerImage[0]?.filename}`}
                  className="h-full w-full object-cover"
                  alt=""
                />
                <input
                  type="file"
                  name="customerImage"
                  id=""
                  className="cursor-pointer absolute h-full w-full opacity-0 outline-0"
                  alt="select image"
                  title="Click to Change Image"
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                />
              </div>
              {console.log("Customer?.customerImage[0]?.filename:", Customer)}
            </div>
            <div className="flex gap-2 w-1/2 flex-col p-2">
              <label htmlFor="customerName">customerName</label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                className="border rounded-md p-2 focus:bg-green-200 focus:outline-green-400 w-full"
                placeholder="customerName"
                value={Customer.customerName}
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
                value={Customer.customerEmail}
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
                value={Customer.customerNumber}
                onChange={(e) => {
                  handleFormData(e);
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
                value="Update Customer"
                className="px-4 py-2 rounded-md bg-green-300 hover:bg-green-200 focus:bg-green-200 "
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
