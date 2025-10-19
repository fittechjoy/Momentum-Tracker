import { useEffect, useState } from "react";
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

export default function Progress() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    const data = savedWorkouts.map((w) => ({
      date: w.date,
      totalWeight: w.sets * w.reps * w.weight,
    }));
    setProgressData(data);
  }, []);

  const chartData = {
    labels: progressData.map((item) => item.date),
    datasets: [
      {
        label: "Total Weight Lifted (kg)",
        data: progressData.map((item) => item.totalWeight),
        borderColor: "#6366f1", // Indigo
        backgroundColor: "rgba(99,102,241,0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Workout Progress Over Time",
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-white mb-6">Progress</h1>

      {progressData.length > 0 ? (
        <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl shadow-soft">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-slate-300">
          No workout data yet. Log workouts to see your progress chart.
        </p>
      )}
    </div>
  );
}
