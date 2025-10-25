import { useState, useEffect } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";
import MomentumScore from "../components/MomentumScore";
import ProgressChart from "../components/ProgressChart";
import SearchExercises from "../components/SearchExercises";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [progressData, setProgressData] = useState([]);

  // ✅ Load workouts from localStorage
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts"));
    if (savedWorkouts) setWorkouts(savedWorkouts);
  }, []);

  // ✅ Save workouts + update chart
  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
    if (workouts.length === 0) {
      setProgressData([]);
      return;
    }

    const data = workouts.map((w) => ({
      date: w.date,
      totalWeight: w.sets * w.reps * w.weight,
    }));
    setProgressData(data);
  }, [workouts]);

  const addWorkout = (workout) => {
    setWorkouts([
      ...workouts,
      { ...workout, id: Date.now(), date: new Date().toLocaleDateString() },
    ]);
  };

  const clearWorkouts = () => {
    if (confirm("Are you sure you want to delete all workouts?")) {
      setWorkouts([]);
      localStorage.removeItem("workouts");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: "url('/gym-bg.jpg')" }}
        aria-hidden="true"
      ></div>

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/70 to-slate-900/90"></div>

      {/* 🔹 Page Content */}
      <div className="relative z-10 w-full max-w-7xl">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <WorkoutForm onAddWorkout={addWorkout} />
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <MomentumScore workouts={workouts} />
            </div>

            <button
              onClick={clearWorkouts}
              className="w-full sm:w-auto mt-3 mb-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              Clear All Workouts
            </button>

            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <ProgressChart data={progressData} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 md:max-h-[85vh] overflow-y-auto pb-4">
            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <WorkoutHistory workouts={workouts} />
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <SearchExercises />
            </div>
          </div>
        </div>

        {/* 🔹 Footer */}
        <footer className="text-center mt-10 text-xs text-slate-400">
          © {new Date().getFullYear()} Momentum Fitness Tracker — Crafted by{" "}
          <span className="text-indigo-400 font-medium">Joy Kiama</span>
        </footer>
      </div>
    </div>
  );
}
