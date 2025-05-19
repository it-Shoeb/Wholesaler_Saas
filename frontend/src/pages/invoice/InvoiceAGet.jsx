import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";

export default function InvoiceAGet() {
  const [Order, setOrder] = useState([]);
  const { id } = useParams();

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/order/${id}`);
      console.log(response);
      setOrder(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <div className="flex justify-center bg-gray-600">
        <div className="m-4 p-4 bg-white rounded-xl w-full">
          <div className="">
            <div className="center flex text-center gap-1 justify-between">
              <div className="flex flex-col text-left">
                <p className="text-3xl font-semibold">Diamond Wedding Card</p>
                <p>Wedding Card Wholsaler</p>
              </div>

              <div className="flex flex-col text-right">
                <p>Baijipura, Aurangabad</p>
                <p>9370304718</p>
                <p>diamond@example.com</p>
              </div>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                {Order?.customer_id?.map((customer) => (
                  <>
                    <p>{customer.customerName}</p>
                    <p>{customer.customerEmail}</p>
                    <p>{customer.customerNumber}</p>
                  </>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                <p>02-12-2025</p>
                <p>invoice #1</p>
                <p>00:00:00</p>
              </div>
            </div>

            <hr className="my-2" />
          </div>
          <div className="flex flex-col h-[calc(100vh-250px)]">
            <table className="w-full text-left h-fit">
              <thead className="bg-gray-100">
                <tr className="">
                  <th className="p-2 text-center">Sr</th>
                  <th className="p-2 w-1/3">Particular</th>
                  <th className="p-2 w-1/3">Quantity</th>
                  <th className="p-2 w-1/3">Price</th>
                  <th className="p-2 w-1/3 text-center">Amount</th>
                </tr>
              </thead>
              <tbody className="">
                {Order?.card?.map((card, index) => (
                  <tr className="" key={index}>
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2 ">{card.cardName}</td>
                    <td className="p-2 ">{card.quantity}</td>
                    <td className="p-2 ">{card.price}</td>
                    <td className="p-2 text-center">
                      {card.price * card.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="w-full mt-auto">
              <tbody>
                <tr className="mt-auto">
                  <td className="w-[30%]"></td>
                  <td className="w-[25%]"></td>
                  <td className="w-[20%]"></td>
                  <td className="w-[15%]">Total</td>
                  <td className="w-[10%] text-center">{Order.totalAmount}</td>
                </tr>

                <tr className="">
                  <td className=""></td>
                  <td className=""></td>
                  <td className=""></td>
                  <td className="">Advance</td>
                  <td className=" text-center">{Order.advanceAmount}</td>
                </tr>

                <tr className="">
                  <td className=""></td>
                  <td className=""></td>
                  <td className=""></td>
                  <td className="">Balance</td>
                  <td className=" text-center">
                    {Order.totalAmount - Order.advanceAmount}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex w-full self-end my-2 px-2">
              Authorised person
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
