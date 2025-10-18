import { useState, useEffect } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";
import MomentumScore from "../components/MomentumScore";
import ProgressChart from "../components/ProgressChart";
import ExerciseList from "../components/ExerciseList";
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

  // 🧹 Clear all workouts
  const clearWorkouts = () => {
    if (confirm("Are you sure you want to delete all workouts?")) {
      setWorkouts([]);
      localStorage.removeItem("workouts");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
  {/* LEFT COLUMN */}
  <div className="space-y-6">
    <WorkoutForm onAddWorkout={addWorkout} />
    <MomentumScore workouts={workouts} />
    <button
      onClick={clearWorkouts}
      className="mt-3 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
    >
      Clear All Workouts
    </button>
    <ProgressChart data={progressData} />
  </div>

  {/* RIGHT COLUMN */}
  <div className="space-y-6">
    <WorkoutHistory workouts={workouts} />
    <SearchExercises />
  </div>
</div>

  );
}
