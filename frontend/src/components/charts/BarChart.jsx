import React from "react";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const labels = ["Order Places", "On Process", "Completed"];

import { Bar, Pie } from "react-chartjs-2";

export default function BarChart({ data }) {
  const orderPlaces = data.filter((status) => {
    return status.OrderStatus === "Order Placed";
  }).length;
  const completed = data.filter((status) => {
    return status.OrderStatus === "Completed";
  }).length;
  const onProcess = data.filter((status) => {
    return status.OrderStatus === "On Process";
  }).length;

  console.log(orderPlaces, completed, onProcess);

  const chartData = {
    labels: labels.map((label) => label),
    datasets: [
      {
        // label: "my Data",
        // label: labels.map((label) => label),
        data: [orderPlaces, completed, onProcess],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(75, 92, 192, 0.6)",
          "rgba(75, 92, 92, 0.6)",
        ],
        // borderColor: "rgba(75, 192, 192, 1)",
        // borderWidth: 1,
      },
    ],
  };
  // const options = {

  // }
  return <Pie data={chartData} />;
}
