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
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* LEFT column */}
      <div className="space-y-6">
        <WorkoutForm onAddWorkout={addWorkout} />
        <MomentumScore workouts={workouts} />
        <button
          onClick={clearWorkouts}
          className="mt-3 mb-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          Clear All Workouts
        </button>
        <ProgressChart data={progressData} />
      </div>

      {/* RIGHT column */}
      <div className="space-y-6">
        <WorkoutHistory workouts={workouts} />
        <SearchExercises />
      </div>
    </div>
  );
}
