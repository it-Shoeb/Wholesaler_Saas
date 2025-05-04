import React, { useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../services/api";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ProductUpdate({ heading }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Product, setProduct] = useState({
    available_stock: Number,
    category: "",
    description: "",
    images: "",
    price: Number,
    size: "",
    status: false,
    updatedAt: "",
    title: "",
    user_id: "",
    video_demo_url: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/product/${id}`).then((res) => {
      const {
        available_stock,
        category,
        createdAt,
        description,
        price,
        size,
        status,
        updatedAt,
        title,
        user_id,
      } = res.data.data;

      setProduct({
        available_stock,
        category,
        createdAt,
        description,
        price,
        size,
        status,
        updatedAt,
        title,
        user_id,
      });
    });
  }, [id]);

  const handleForm = (e) => {
    e.preventDefault();
    updateProduct();
  };

  const handleFormData = (e) => {
    const { name, type, value, checked, files } = e.target;
    console.log({ name, type, value, checked, files });

    let newValue;
    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "file") {
      newValue = files[0];
    } else {
      newValue = value;
    }

    setProduct((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const updateProduct = async () => {
    console.log({ ...Product });
    try {
      const response = await api.put(`/product/${id}`, {
        ...Product,
      });

      toast.success(response.data.message);
      navigate("/product/get");
    } catch (error) {
      console.error(error);
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
            <label htmlFor="user_id" className="block sm:w-1/2 p-2 w-full">
              user_id:
              <input
                type="text"
                name="user_id"
                id=""
                placeholder="user_id"
                className="border-0 px-2 py-2 mt-2 rounded-md outline w-full"
                value={Product.user_id}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="title" className="block sm:w-1/2 p-2 w-full">
              title<span className="text-red-500">*</span>:
              <input
                type="text"
                name="title"
                id=""
                placeholder="title"
                className="border-0 px-2 py-2 mt-2 rounded-md outline w-full"
                value={Product.title}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="description" className="block sm:w-1/2 p-2 w-full">
              description:
              <input
                type="text"
                name="description"
                id=""
                placeholder="description"
                className="border-0 px-2 py-2 mt-2 rounded-md outline w-full"
                value={Product.description}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="size" className="block sm:w-1/2 p-2 w-full">
              size:
              <input
                type="text"
                name="size"
                id=""
                placeholder="size"
                className="border-0 px-2 py-2 mt-2 rounded-md outline w-full"
                value={Product.size}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="category" className="block sm:w-1/2 p-2 w-full">
              category:
              <input
                type="text"
                name="category"
                id=""
                placeholder="category"
                className="border-0 px-2 py-2 mt-2 rounded-md outline w-full"
                value={Product.category}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label htmlFor="price" className="block sm:w-1/2 p-2 w-full">
              price:
              <input
                type="number"
                name="price"
                id=""
                placeholder="price"
                className="border-0 px-2 py-2 mt-2 rounded-md outline w-full"
                value={Product.price}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label
              htmlFor="available_stock"
              className="block sm:w-1/2 p-2 w-full"
            >
              available_stock:
              <input
                type="number"
                name="available_stock"
                id=""
                placeholder="available_stock"
                className="border-0 px-2 py-2 mt-2 rounded-md outline w-full"
                value={Product.available_stock}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label
              htmlFor="status"
              className="flex flex-col items-left sm:w-1/2 p-2 w-full"
            >
              status:
              <input
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

            <label htmlFor="images" className="block sm:w-1/2 p-2 w-full">
              images:
              <input
                type="file"
                name="images"
                accept="image/*,video/*"
                id=""
                placeholder="images"
                className="border-0 px-2 py-2 mt-2 rounded-md outline w-full"
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <label
              htmlFor="video_demo_url"
              className="block sm:w-1/2 p-2 w-full"
            >
              video_demo_url:
              <input
                accept="image/*,video/*"
                type="file"
                name="video_demo_url"
                id=""
                placeholder="video_demo_url"
                className="border-0 px-2 py-2 mt-2 rounded-md outline w-full"
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </label>

            <div className="flex w-full justify-end gap-6">
              <Link
                to={"/product/get"}
                type="button"
                className="p-2 bg-red-100 hover:bg-red-200 rounded-md mt-4"
              >
                Back
              </Link>

              <input
                type="submit"
                value="Update Product"
                className="p-2 bg-green-300 hover:bg-green-400 rounded-md mt-4"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
