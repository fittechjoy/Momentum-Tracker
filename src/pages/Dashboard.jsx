import { useState } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";
import MomentumScore from "../components/MomentumScore";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = (workout) => {
    setWorkouts([...workouts, { ...workout, id: Date.now() }]);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <WorkoutForm onAddWorkout={addWorkout} />
        <MomentumScore workouts={workouts} />
      </div>
      <WorkoutHistory workouts={workouts} />
    </div>
  );
}
