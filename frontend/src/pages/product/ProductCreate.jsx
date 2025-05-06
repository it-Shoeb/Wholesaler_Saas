// add units while creating product (pack, sheet, piece)
import React, { useState } from "react";
import axios from "axios";
import api from "../../services/api.js";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function ProductCreate({ heading }) {
  const navigate = useNavigate();

  const [Product, setProduct] = useState({
    user_id: "",
    title: "",
    description: "",
    status: false,
    size: "",
    category: "",
    price: Number,
    available_stock: Number,
    images: "",
    video_demo_url: "",
  });

  const handleForm = (e) => {
    e.preventDefault();
    addProduct();
  };

  const handleFormData = (e) => {
    const { name, type, value, checked, files } = e.target;

    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "file") {
      newValue = files[0];
    } else {
      newValue = value;
    }

    setProduct((prev) => ({ ...prev, [name]: newValue }));
  };

  const addProduct = async () => {
    try {
      const response = await api.post("/product", Product);
      toast.success(response.data.message);
      navigate("/product/get");
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <>
      <div className="wrapper bg-green-50 border-amber-300 h-[calc(100vh-90px)] px-8 py-2">
        <div className="inner-wrapper h-full overflow-y-scroll">
          <h1 className="text-4xl font-bold my-4">{heading}</h1>
          <form
            action=""
            method="post"
            className="flex flex-wrap"
            onSubmit={(e) => {
              handleForm(e);
            }}
          >
            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              user_id:
              <input
                autoFocus
                type="text"
                name="user_id"
                id=""
                placeholder="user_id"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                value={Product.user_id}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              title:
              <input
                autoFocus
                type="text"
                name="title"
                id=""
                placeholder="title"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                value={Product.title}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            {/* <div className="sm:w-1/2 p-2 w-full">
              <label htmlFor="" className="">
                Unit
              </label>
              <select
                name=""
                id=""
                className="rounded-md px-2 py-2 outline focus:bg-green-100 w-full mt-2"
              >
                <option value="pack">pack</option>
                <option value="sheet">sheet</option>
                <option value="piece">piece</option>
              </select>
            </div> */}

            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              Item Code
              <input
                type="text"
                name="itemCode"
                id=""
                placeholder="Item code"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                maxLength={4}
              />
            </label>

            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              description:
              <input
                autoFocus
                type="text"
                name="description"
                id=""
                placeholder="description"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                value={Product.description}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              size:
              <input
                autoFocus
                type="text"
                name="size"
                id=""
                placeholder="size"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                value={Product.size}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              category:
              <input
                autoFocus
                type="text"
                name="category"
                id=""
                placeholder="category"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                value={Product.category}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              price:
              <input
                autoFocus
                type="number"
                name="price"
                id=""
                placeholder="price"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                value={Product.price}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              available_stock:
              <input
                autoFocus
                type="number"
                name="available_stock"
                id=""
                placeholder="available_stock"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                value={Product.available_stock}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label
              htmlFor=""
              className="flex flex-col items-left sm:w-1/2 p-2 w-full"
            >
              status:
              <input
                autoFocus
                type="checkbox"
                name="status"
                id=""
                placeholder="status"
                className="p-2 rounded-md outline flex self-start mt-2"
                checked={Product.status}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              images:
              <input
                autoFocus
                type="file"
                name="images"
                accept="image/*,video/*"
                id=""
                placeholder="images"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="" className="block sm:w-1/2 p-2 w-full">
              video_demo_url:
              <input
                autoFocus
                accept="image/*,video/*"
                type="file"
                name="video_demo_url"
                id=""
                placeholder="video_demo_url"
                className="px-2 py-2 mt-2 rounded-sm border-0 outline w-full focus:bg-green-100"
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <div className="flex w-full justify-end gap-6">
              <Link
                to={"/product/get"}
                type="submit"
                className="p-2 bg-red-100 hover:bg-red-200 rounded-md mt-4"
              >
                Back
              </Link>

              <input
                autoFocus
                type="submit"
                value="Add Product"
                className="p-2 bg-green-300 hover:bg-green-400 rounded-md mt-4"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
