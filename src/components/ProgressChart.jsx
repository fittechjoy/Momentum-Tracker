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
  Filler, // ✅ import Filler
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler // ✅ register Filler
);

const ProgressChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Total Weight Lifted (kg)",
        data: data.map((item) => item.totalWeight),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true, // ✅ now this will work
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Workout Progress Over Time" },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProgressChart;
