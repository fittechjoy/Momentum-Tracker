import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProgressChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Total Weight Lifted (kg)",
        data: data.map((item) => item.totalWeight),
        borderColor: "rgba(56, 189, 248, 1)", // light blue
        backgroundColor: "rgba(56, 189, 248, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#e2e8f0" } },
      title: {
        display: true,
        text: "Workout Progress Over Time",
        color: "#e2e8f0",
      },
    },
    scales: {
      x: {
        ticks: { color: "#e2e8f0" },
        grid: { color: "rgba(148, 163, 184, 0.2)" },
      },
      y: {
        ticks: { color: "#e2e8f0" },
        grid: { color: "rgba(148, 163, 184, 0.2)" },
      },
    },
  };

  return (
    <div className="p-4 bg-slate-800 rounded-xl shadow border border-slate-700">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProgressChart;
