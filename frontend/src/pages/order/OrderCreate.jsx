import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import FormBase from "../../components/common/FormBase";

export default function OrderCreate({ heading }) {
  const navigate = useNavigate();

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
        cardImage: "",
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

  const [List, setList] = useState([]);
  const [CustomerList, setCustomerList] = useState([]);

  const fetchList = async () => {
    const productResponse = await api.get("/product");
    const customerResponse = await api.get("/customer");
    setList(productResponse.data.data);
    setCustomerList(customerResponse.data.data);

    return productResponse.data.data;
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleFormData = (e) => {
    let { type, name, value } = e.target;

    setCustomer((prev) => {
      const isCardField = [
        "cardName",
        "quantity",
        "language",
        "color",
        // "cardImage",
        "price",
      ].includes(name);

      let updatedCard = [...prev.card];

      // if (name === "customerName") {
      //   const selectedUser = CustomerList.find(
      //     (customer) => customer.customerName == value
      //   );

      //   setCustomer((prev) => ({
      //     ...prev,
      //     [name]: value,
      //     // customerEmail: selectedUser.customerEmail,
      //     // customerNumber: selectedUser.customerNumber,
      //   }));
      // }

      if (isCardField) {
        if (name === "cardName") {
          const [item] = List.filter((item) => item.title == value);
          console.log("item:", item);

          updatedCard[0] = {
            ...prev.card[0],
            cardName: value,
            cardImage: item.images[0].filename,
            // quantity: item.available_stock || 0,
            price: item.price || 0,
          };
        } else if (name === "quantity") {
          const quantity = Number(value) || 0;

          updatedCard[0] = {
            ...prev.card[0],
            quantity,
          };

          return {
            ...prev,
            card: updatedCard,
            totalAmount: quantity * prev.card[0].price,
          };
        } else if (name === "price") {
          const price = Number(value) || 0;

          updatedCard[0] = {
            ...prev.card[0],
            price,
          };

          return {
            ...prev,
            card: updatedCard,
            totalAmount: price * prev.card[0].quantity,
          };
        } else {
          updatedCard[0] = {
            ...prev.card[0],
            [name]: value,
          };
        }
        return { ...prev, card: updatedCard };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/order`, {
        ...Customer,
        customer_id: CustomerList.find(
          (item) => Customer.customerName == item.customerName
        )._id,
      });

      toast.success(response.data.message);
      navigate("/order/get");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {console.log("Customer:", Customer)}
      {console.log("List:", List)}
      {console.log("CustomerList:", CustomerList)}
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
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm relative">
              <label htmlFor="">customerName: </label>
              <select
                name="customerName"
                id=""
                className="mb-1 border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
                onChange={(e) => {
                  handleFormData(e);
                }}
              >
                <option value="">Please Select Customer</option>
                {CustomerList.map((customer) => (
                  <option key={customer._id} value={customer.customerName}>
                    {customer.customerName}
                  </option>
                ))}
              </select>
              <Link
                to={"/customer/create"}
                className="absolute -bottom-1 right-3 text-blue-600 font-bold"
              >
                create customer
              </Link>
            </div>

            {/* <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">customerEmail: </label>
              <input
                type="email"
                name="customerEmail"
                id=""
                placeholder="customerEmail"
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
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
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
                value={Customer.customerNumber}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div> */}

            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm relative">
              <label htmlFor="">cardName: </label>

              <select
                name="cardName"
                id=""
                className="mb-1 border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
                value={Customer?.card[0]?.cardName}
                onChange={(e) => {
                  handleFormData(e);
                }}
              >
                <option value="">Select Card</option>
                {List.map((item) => (
                  <option key={item._id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              <Link
                to={"/product/create"}
                className="absolute -bottom-1 right-3 text-blue-600 font-bold"
              >
                create product
              </Link>
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full relative text-sm">
              <label htmlFor="">quantity: </label>
              <input
                type="number"
                name="quantity"
                id=""
                min={1}
                max={
                  List.find((item) => item.title == Customer.card[0].cardName)
                    ?.available_stock
                }
                placeholder="quantity"
                className="mb-1 border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
                value={Customer.card[0].quantity}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
              <p className="absolute -bottom-1 text-[12px]">
                available quantity{" "}
                {List.find((item) => item.title == Customer.card[0].cardName)
                  ?.available_stock || 0}
              </p>
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">Price: </label>
              <input
                type="number"
                name="price"
                id=""
                placeholder="Price"
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
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
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
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
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
                value={Customer.card[0].color}
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
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
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
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
                value={Customer.ProfingDate}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">DeliveryDate: </label>
              <input
                type="date"
                name="DeliveryDate"
                id=""
                placeholder="DeliveryDate"
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
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
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
              />
              <select
                name="OrderStatus"
                id=""
                value={Customer.OrderStatus}
                onChange={(e) => {
                  handleFormData(e);
                }}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="On Process">On Process</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">totalAmount: </label>
              <input
                type="number"
                name="totalAmount"
                id=""
                placeholder="totalAmount"
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
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
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
                value={Customer.advanceAmount}
                onChange={(e) => {
                  handleFormData(e);
                }}
              />
            </div>

            <div className="flex flex-col sm:w-1/3 p-2 w-full text-sm">
              <label htmlFor="">Card Image </label>
              {/* <input
                type="text"
                name="designImage"
                id=""
                placeholder="designImage"
                className="border border-gray-300 text-gray-500 rounded-md p-2 focus:border-blue-300 outline-0"
                value={Customer.card[0].designImage}
                onChange={(e) => {
                  handleFormData(e);
                }}
                /> */}
              <div className="flex items-center flex-col">
                <img
                  src={`http://localhost:3000/uploads/products/${Customer.card[0].cardImage}`}
                  alt="Card Image"
                  className="w-1/3 object-cover aspect-square"
                />
              </div>
            </div>

            <div className="submit-wrapper flex w-full items-right justify-end gap-4">
              <Link
                to={"/order/get"}
                className="py-2 px-4 rounded-md focus:underline focus:bg-gray-100 hover:bg-gray-100 outline-0 hover:underline text-sm font-bold bg-secondary w-full text-center"
              >
                Back
              </Link>

              <input
                type="submit"
                value="Place Order"
                className="py-2 px-4 rounded-md focus:underline focus:bg-gray-100 hover:bg-gray-100 outline-0 hover:underline text-sm font-bold bg-secondary w-full text-center"
              />
            </div>
            {/* </FormBase> */}
          </form>
        </div>
      </div>
    </>
  );
}
