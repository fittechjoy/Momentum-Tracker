import { useState, useEffect } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";
import MomentumScore from "../components/MomentumScore";
import ProgressChart from "../components/ProgressChart";
import SearchExercises from "../components/SearchExercises";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [progressData, setProgressData] = useState([]);

  // Load workouts from localStorage when app starts
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts"));
    if (savedWorkouts) {
      setWorkouts(savedWorkouts);
    }
  }, []);

  // Save workouts + update chart
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
  <div className="max-w-6xl mx-auto py-8 px-4">
    <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

    <div className="grid md:grid-cols-2 gap-6">
      {/* LEFT column */}
      <div className="space-y-6">
        <div className="bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-soft">
          <WorkoutForm onAddWorkout={addWorkout} />
        </div>

        <div className="bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-soft">
          <MomentumScore workouts={workouts} />
        </div>

        <button
          onClick={clearWorkouts}
          className="block w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          Clear All Workouts
        </button>

        <div className="bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-soft">
          <ProgressChart data={progressData} />
        </div>
      </div>

      {/* RIGHT column */}
      <div className="space-y-6 md:max-h-[80vh] md:overflow-y-auto">
        <div className="bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-soft">
          <WorkoutHistory workouts={workouts} />
        </div>

        <div className="bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-soft">
          <SearchExercises />
        </div>
      </div>
    </div>
  </div>
);

}
