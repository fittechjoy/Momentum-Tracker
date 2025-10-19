export default function MomentumScore({ workouts }) {
  // Basic example: total sessions = momentum
  const score = workouts.length;

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700">
      <h2 className="text-xl font-semibold text-slate-100 mb-2">
        Momentum Score
      </h2>
      <p className="text-3xl font-bold text-blue-400">{score}</p>
      <p className="text-sm text-slate-400 mt-1">
        Keep going! Every workout counts.
      </p>
    </div>
  );
}
