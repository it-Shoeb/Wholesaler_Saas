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

import { Bar, Pie } from "react-chartjs-2";

export default function BarChart({ data }) {
  const chartData = {
    labels: data.map((label) => label.label),
    datasets: [
      {
        label: "my Data",
        data: data.map((data) => data.value),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(75, 92, 192, 0.6)",
          "rgba(75, 92, 92, 0.6)",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  // const options = {

  // }
  return <Pie data={chartData} />;
}
