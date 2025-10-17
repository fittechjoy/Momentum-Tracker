import { useState } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";
import MomentumScore from "../components/MomentumScore";
import ProgressChart from "../components/ProgressChart";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = (workout) => {
    setWorkouts([...workouts, { ...workout, id: Date.now() }]);
  };

  const progressData = [
    { date: "Oct 1", totalWeight: 50 },
    { date: "Oct 5", totalWeight: 70 },
    { date: "Oct 10", totalWeight: 90 },
    { date: "Oct 15", totalWeight: 120 },
  ];

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
