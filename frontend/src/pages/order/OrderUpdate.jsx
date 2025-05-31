import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

import { Link, useNavigate, useParams } from "react-router-dom";

export default function OrderUpdate({ heading }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [Customer, setCustomer] = useState({
    customerName: "",
    customerEmail: "",
    customerNumber: "",
    card: [
      {
        cardName: "",
        quantity: Number(0),
        language: "",
        color: "",
        designImage: "",
        price: Number(0),
      },
    ],
    specialCard: "",
    ProfingDate: "",
    DeliveryDate: "",
    OrderStatus: "Order Placed",
    totalAmount: Number(0),
    advanceAmount: "",
  });

  const [CustomerList, setCustomerList] = useState([]);
  const [List, setList] = useState([]);
  const setDate = new Date();

  // useEffect(() => {
  //   setItem();
  // }, [id]);

  const setItem = async () => {
    const response = await api.get(`/order/${id}`);
    console.log("response:", response);
    const res = response.data.data;

    // console.log(res);

    setCustomer((prev) => ({
      ...res,
      card: [{ ...res.card[0] }],
      ProfingDate: res.ProfingDate.slice(0, 10),
      DeliveryDate: res.DeliveryDate.slice(0, 10),
    }));
  };

  const fetchList = async () => {
    const product = await api.get("/product");
    const customerList = await api.get("/customer");

    // console.log(product.data.data);

    setCustomerList(customerList.data.data);
    setList(product.data.data);
    // return product.data.data;
  };

  useEffect(() => {
    setItem();
    fetchList();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/order/${id}`, { ...Customer });
      toast.success(response.data.message);
      // navigate("/order/get");
    } catch (error) {}
  };

  const handleFormData = async (e) => {
    const { name, type, value } = e.target;

    const isCard = [
      // "cardName",
      "quantity",
      "language",
      "color",
      "designImage",
      // "price",
    ];

    setCustomer((prev) => {
      const prevCard = prev.card;

      if (name === "cardName") {
        const res = List.find((item) => item.title == value);

        prevCard[0] = {
          ...prev.card[0],
          cardName: res.title,
          price: res.price,
        };

        return { ...prev, card: prevCard };
      }

      if (name === "quantity") {
        const res = List.find(
          (item) => item.title == Customer.card[0].cardName
        );

        // console.log(res);
        const quantity = Number(value);

        prevCard[0] = {
          ...prev.card[0],
          quantity,
        };

        return {
          ...prev,
          card: prevCard,
          totalAmount: quantity * res.price,
        };
      }

      if (isCard.includes(name)) {
        prevCard[0] = {
          ...prev.card[0],
          [name]: value,
        };

        return { ...prev, card: prevCard };
      }

      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <div className="wrapper bg-white rounded-2xl min-h-[calc(100vh-90px)] p-6 max-[480px]:p-1">
        <div className="inner-wrapper">
          <h1 className="text-4xl font-bold ">{heading}</h1>

          <form
            action=""
            className="flex flex-wrap mt-6"
            onSubmit={(e) => {
              handleForm(e);
            }}
          >
            <div className="customer-detail text-xl font-bold flex w-full my-2">
              Customer Detail
            </div>

            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">customerName: </label>
              <select
                name="customerName"
                id=""
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.customerName}
                onChange={(e) => {
                  handleFormData(e);
                }}
              >
                <option value="">Select Customer</option>
                {CustomerList.map((customer) => (
                  <option key={customer._id} value={customer.customerName}>
                    {/* {console.log(customer.customerName, Customer.customerName)} */}
                    {customer.customerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">customerEmail: </label>
              <input
                type="email"
                name="customerEmail"
                id=""
                placeholder="customerEmail"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.customerEmail}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">
                customerNumber<span className="text-red-500">*</span>:{""}
              </label>
              <input
                type="number"
                name="customerNumber"
                id=""
                placeholder="customerNumber"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.customerNumber}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>

            <div className="item-detail text-xl font-bold flex w-full my-2">
              Item Detail
            </div>

            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">cardName: </label>

              <select
                name="cardName"
                id=""
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer?.card[0]?.cardName}
                onChange={(e) => {
                  handleFormData(e);
                }}
              >
                <option value="">Please Select Customer</option>
                {List.map((card) => (
                  <option key={card._id} value={card.title}>
                    {card.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full relative text-sm">
              <label htmlFor="">quantity: </label>
              <input
                type="number"
                name="quantity"
                id=""
                placeholder="quantity"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.card[0].quantity}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
              <p className="absolute -bottom-1 text-[12px]">
                available quantity{" "}
                {
                  List.find((item) => item.title == Customer.card[0].cardName)
                    ?.available_stock
                }
                {/* {List.find((item) => item.itemName == Customer.card[0].cardName)
                  ?.currentStock || 0}
                // {console.log(List)} */}
              </p>
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">Price: </label>
              <input
                type="number"
                name="price"
                id=""
                placeholder="Price"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer?.card[0]?.price}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">language: </label>
              <input
                type="text"
                name="language"
                id=""
                placeholder="language"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.card[0].language}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">color: </label>
              <input
                type="text"
                name="color"
                id=""
                placeholder="color"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.card[0].color}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">designImage: </label>
              <input
                type="text"
                name="designImage"
                id=""
                placeholder="designImage"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.card[0].designImage}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">specialCard: </label>
              <input
                type="text"
                name="specialCard"
                id=""
                placeholder="specialCard"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.specialCard}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>

            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">ProfingDate: </label>
              <input
                type="date"
                name="ProfingDate"
                id=""
                placeholder="ProfingDate"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.ProfingDate}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            {/* <input type="date" name="" id="" value={} /> */}
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">DeliveryDate: </label>
              <input
                type="date"
                name="DeliveryDate"
                id=""
                placeholder="DeliveryDate"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.DeliveryDate}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">OrderStatus: </label>
              <input
                type="text"
                name="OrderStatus"
                id=""
                placeholder="OrderStatus"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.OrderStatus}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">totalAmount: </label>
              <input
                type="number"
                name="totalAmount"
                id=""
                placeholder="totalAmount"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.totalAmount}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">advanceAmount: </label>
              <input
                type="number"
                name="advanceAmount"
                id=""
                placeholder="advanceAmount"
                className="border rounded-md p-2 focus:bg-green-100 outline-green-300 my-1"
                value={Customer.advanceAmount}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>

            <div className="submit-wrapper flex w-full items-right justify-end gap-4">
              <Link
                to={"/order/get"}
                className="bg-red-300 py-2 px-4 rounded-md focus:bg-red-200 hover:bg-red-200 text-sm font-bold"
              >
                Back
              </Link>

              <input
                type="submit"
                value="Place Order"
                className="bg-gray-900 text-white py-2 px-4 rounded-md focus:bg-gray-700 hover:bg-gray-700 text-sm font-bold"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
