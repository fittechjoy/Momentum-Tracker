import WorkoutForm from "../components/WorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";
import MomentumScore from "../components/MomentumScore";

export default function Dashboard() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <WorkoutForm />
        <MomentumScore />
      </div>
      <WorkoutHistory />
    </div>
  );
}
