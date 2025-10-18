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
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">
          Workout Progress
        </h2>
        <p className="text-gray-500">No data to display yet.</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Total Weight Lifted (kg)",
        data: data.map((item) => item.totalWeight),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ allows better fit on mobile
    plugins: {
      legend: { position: "top", labels: { font: { size: 12 } } },
      title: {
        display: true,
        text: "Workout Progress Over Time",
        font: { size: 14 },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 10 } },
      },
      y: {
        ticks: { font: { size: 10 } },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6 w-full">
      {/* Scroll horizontally on small screens */}
      <div className="overflow-x-auto">
        <div className="min-w-[320px] h-[250px] sm:h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
