import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function InventoryUpdate({ heading }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [Item, setItem] = useState({
    itemCode: "0",
    itemName: "",
    createdBy: "680e39bb5f003c0dda5b1169",
    itemPrice: Number(0),
    itemImage: "",
    currentStock: Number(0),
    minimumStock: Number(0),
  });

  const [List, setList] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await api.get("/product");
      setList(response.data.data);
      setItems();
    } catch (error) {
      console.error(error);
    }
  };

  const setItems = async () => {
    try {
      const resp = await api.get(`/inventory/${id}`);

      const {
        itemCode,
        itemName,
        createdBy,
        itemPrice,
        itemImage,
        currentStock,
        minimumStock,
      } = resp.data.data;

      setItem({
        itemCode,
        itemName,
        createdBy,
        itemPrice,
        itemImage,
        currentStock,
        minimumStock,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    console.log({ name, value, type });

    if (type === "select-one") {
      const [listItem] = List.filter((item) => item.title == value);
      setItem({ ...Item, itemPrice: listItem.price, itemName: value });
    } else {
      setItem({ ...Item, [name]: value });
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    putItem();
  };

  const putItem = async () => {
    try {
      const response = await api.put(`/inventory/${id}`, {
        itemCode: Item.itemCode,
        itemName: Item.itemName,
        createdBy: Item.createdBy,
        itemPrice: Item.itemPrice,
        itemImage: Item.itemImage,
        currentStock: Number(Item.currentStock),
        minimumStock: Number(Item.minimumStock),
      });

      toast.success(response.data.message);
      navigate("/inventory/get");
    } catch (error) {}
  };

  return (
    <>
      <div className="wrapper bg-green-50 min-h-[calc(100vh-90px)] p-6">
        <div className="inner-wrapper">
          <div className="wrapper-top">
            <h1 className="text-4xl font-bold ">{heading}</h1>
          </div>
          <div className="wrapper-bottom">
            <form
              action=""
              method="post"
              className="flex flex-wrap mt-6"
              onSubmit={(e) => {
                handleForm(e);
              }}
            >
              <div className="sm:w-1/2 p-2 w-full">
                <label htmlFor="" className="">
                  Item Code
                </label>
                <input
                  type="text"
                  name="itemCode"
                  value={Item.itemCode}
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                  id=""
                  placeholder="Item Code"
                  className="rounded-md px-2 py-2 outline focus:bg-green-100 w-full mt-2"
                />
              </div>

              <div className="sm:w-1/2 p-2 w-full">
                <label htmlFor="" className="">
                  Create By
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id=""
                  value={Item.createdBy}
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                  disabled
                  placeholder="Create By"
                  className="rounded-md px-2 py-2 outline focus:bg-green-100 w-full mt-2 bg-gray-100"
                />
              </div>

              <div className="sm:w-1/2 p-2 w-full">
                <label htmlFor="" className="">
                  Product Name
                </label>
                <select
                  name=""
                  id=""
                  className="rounded-md px-2 py-2 outline focus:bg-green-100 w-full mt-2"
                  value={Item.itemName}
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                >
                  <option value="">Select Product</option>
                  {List.map((res) => (
                    <option key={res._id} value={res.title}>
                      {res.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:w-1/2 p-2 w-full">
                <label htmlFor="" className="">
                  Current Stock
                </label>
                <input
                  type="number"
                  name="currentStock"
                  id=""
                  value={Item.currentStock}
                  placeholder="Available Stock"
                  className="rounded-md px-2 py-2 outline focus:bg-green-100 w-full mt-2"
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                />
              </div>

              <div className="sm:w-1/2 p-2 w-full">
                <label htmlFor="" className="">
                  Minimum Stock
                </label>
                <input
                  type="number"
                  name="minimumStock"
                  id=""
                  value={Item.minimumStock}
                  placeholder="Alert Before Stock End"
                  className="rounded-md px-2 py-2 outline focus:bg-green-100 w-full mt-2"
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                />
              </div>

              <div className="sm:w-1/2 p-2 w-full">
                <label htmlFor="" className="">
                  Item Price
                </label>
                <input
                  type="number"
                  name="itemPrice"
                  id=""
                  value={Item.itemPrice}
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                  placeholder="Item Price"
                  className="rounded-md px-2 py-2 outline focus:bg-green-100 w-full mt-2"
                />
              </div>

              <div className="w-full flex justify-end gap-4 mt-6">
                <Link
                  to={"/inventory/get"}
                  className="px-4 py-1 items-end rounded-md bg-red-300 hover:bg-red-200 focus:bg-red-200 outline-none"
                >
                  Back
                </Link>

                <input
                  type="submit"
                  value="Update Item"
                  className="px-4 py-1 items-end rounded-md bg-green-300 hover:bg-green-200 focus:bg-green-200 outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
