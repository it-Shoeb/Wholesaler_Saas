import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import BarChart from "../../components/charts/BarChart";
import { useEffect } from "react";

import api from "../../services/api";

export default function Dashboard() {
  const [Quantity, setQuantity] = useState({
    product: "",
    customer: "",
    order: "",
    user: "",
  });

  const [OrderStatus, setOrderStatus] = useState([]);

  const [LowQuantity, setLowQuantity] = useState([]);

  const sampleData = [
    { label: "Jan", value: 65 },
    { label: "Jan", value: 59 },
    { label: "Mar", value: 80 },
    { label: "Apr", value: 81 },
    { label: "May", value: 56 },
    { label: "Jun", value: 55 },
  ];

  useEffect(() => {
    fetchOrderStatus();
    // fetchCustomerStatus();
    // fetchProductStatus();
    // fetchUserStatus();
  }, []);

  const fetchOrderStatus = async () => {
    const order = await api.get("/order");
    const customer = await api.get("/customer");
    const product = await api.get("/product");
    const user = await api.get("/user");

    // console.log(
    //   order.data.data.length,
    //   customer.data.data.length,
    //   product.data.data.length,
    //   user.data.data.length
    // );

    const date = new Date();
    console.log("date:", date);

    setOrderStatus(order.data.data);
    console.log("order.data.data:", order.data.data);

    setLowQuantity(
      product.data.data.filter((product) => {
        return product.available_stock < 100;
      })
    );

    setQuantity({
      order: order?.data?.data?.length || 0,
      customer: customer?.data?.data?.length || 0,
      product: product?.data?.data?.length || 0,
      user: user?.data?.data?.length || 0,
    });

    // setQuantity({
    //   ...Quantity,
    //   order: data?.data?.length,
    // });
    // console.log('Quantity:', Quantity)
    // console.log("data:", data);
    // console.log(
    //   "response:",
    //   data.data.filter((statusbar) => statusbar.OrderStatus == "Order Placed"),
    //   data.data.filter((statusbar) => statusbar.OrderStatus == "Order")
    // );
  };

  // const fetchCustomerStatus = async () => {
  //   try {
  //     const { data } = await api.get("/customer");
  //     console.log("data:", data.data);
  //     setQuantity({ ...Quantity, customer: data.data.length });
  //     console.log("Quantity:", Quantity);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const fetchProductStatus = async () => {
  //   try {
  //     const { data } = await api.get("/product");
  //     console.log("data:", data.data);
  //     setQuantity({ ...Quantity, product: data.data.length });
  //     console.log("Quantity:", Quantity);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const fetchUserStatus = async () => {
  //   try {
  //     const { data } = await api.get("/user");
  //     console.log("data:", data.data);
  //     setQuantity({ ...Quantity, user: data.data.length });
  //     console.log("Quantity:", Quantity);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div className="wrapper bg-white p-2 h-[calc(100vh-84px)] overflow-auto rounded-2xl border">
        <div className="inner-wrapper p-2 grid grid-cols-2">
          <div className="overall-count grid grid-cols-2 gap-4 p-4">
            <div className="shadow flex flex-col items-center justify-center rounded-2xl">
              <p>Quantity</p>
              <p>{Quantity.order || 0}</p>
            </div>
            <div className="shadow flex flex-col items-center justify-center rounded-2xl">
              <p>Customers</p>
              <p>{Quantity.customer || 0}</p>
            </div>
            <div className="shadow flex flex-col items-center justify-center rounded-2xl">
              <p>Product</p>
              <p>{Quantity.product || 0}</p>
            </div>
            <div className="shadow flex flex-col items-center justify-center rounded-2xl">
              <p>Users</p>
              <p>{Quantity.user || 0}</p>
            </div>
          </div>

          <div className="top-orderStatus p-2">
            {/* <Bar
              data={{
                labels: ["a", "b", "c"],
                datasets: [
                  {
                    labels: "revenue",
                    data: [200, 300, 500],
                  },
                  {
                    labels: "revenue",
                    data: [200, 300, 500],
                  },
                ],
              }}
            /> */}

            {console.log("OrderStatus:", OrderStatus)}
            <BarChart data={OrderStatus} />
          </div>
          {/* <div className="top-customers"></div> */}
          {/* <div className="top-products-graph"></div> */}
          <div className="top-customer-graph">
            <p>Order Delivery Date</p>
            {/* <BarChart data={sampleData} /> */}
          </div>
          <div className="shadow rounded-2xl p-2">
            <p>Items Below Minimum Quantity</p>
            <table className="w-full my-3">
              <thead>
                <tr>
                  <th className="text-center">Sr</th>
                  <th className="text-left">Title</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Image</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {LowQuantity.map((product, index) => (
                  <tr className="">
                    <td className="text-center">{index + 1}</td>
                    <td className="text-left">{product.title}</td>
                    <td className="text-center">{product.available_stock}</td>
                    <td className="text-center">{product.price}</td>
                    <td className="w-15">
                      <img
                        src={`http://localhost:3000/${product.images[0].path}`}
                        className="w-full object-cover aspect-square"
                        alt=""
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
