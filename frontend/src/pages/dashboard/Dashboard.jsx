import React from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import BarChart from "../../components/charts/BarChart";
import { useEffect } from "react";

import api from "../../services/api";

export default function Dashboard() {
  const sampleData = [
    { label: "Jan", value: 65 },
    { label: "Jan", value: 59 },
    { label: "Mar", value: 80 },
    { label: "Apr", value: 81 },
    { label: "May", value: 56 },
    { label: "Jun", value: 55 },
  ];

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const { data } = await api.get("/order");
      console.log(
        "response:",
        data.data.filter(
          (statusbar) => statusbar.OrderStatus == "Order Placed"
        ),
        data.data.filter((statusbar) => statusbar.OrderStatus == "Order")
      );
    };
    fetchOrderStatus();
  }, []);

  return (
    <>
      <div className="wrapper bg-white p-2 h-[calc(100vh-84px)] overflow-auto rounded-2xl">
        <div className="inner-wrapper p-2 h-full grid sm:grid-cols-3 grid-cols-1">
          <div className="overall-count grid grid-cols-2">
            <div className="shadow flex flex-col items-center justify-center">
              <p>Title</p>
              <p>01</p>
            </div>
            <div className="shadow flex flex-col items-center justify-center">
              <p>Title</p>
              <p>01</p>
            </div>
            <div className="shadow flex flex-col items-center justify-center">
              <p>Title</p>
              <p>01</p>
            </div>
            <div className="shadow flex flex-col items-center justify-center">
              <p>Title</p>
              <p>01</p>
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

            <BarChart data={sampleData} />
          </div>
          {/* <div className="top-customers"></div> */}
          <div className="top-products-graph"></div>
          <div className="top-customer-graph">
            <p>Order Delivery Date</p>
          </div>
          <div className="">
            <p>Items Below Minimum Quantity</p>
          </div>
        </div>
      </div>
    </>
  );
}
