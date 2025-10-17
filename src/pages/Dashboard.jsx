import { useState, useEffect } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";
import MomentumScore from "../components/MomentumScore";
import ProgressChart from "../components/ProgressChart";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [progressData, setProgressData] = useState([]);

  // Load workouts from localStorage when component mounts
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts"));
    if (savedWorkouts) {
      setWorkouts(savedWorkouts);
    }
  }, []);

  // Save workouts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));

    if (workouts.length === 0) return;

    // Calculate total weight lifted per workout
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

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <WorkoutForm onAddWorkout={addWorkout} />
        <MomentumScore workouts={workouts} />
        <ProgressChart data={progressData} />
      </div>
      <WorkoutHistory workouts={workouts} />
    </div>
  );
}
