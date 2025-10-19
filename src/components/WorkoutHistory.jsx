
export default function WorkoutHistory({ workouts }) {
  if (!workouts || workouts.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-white/10 p-4 rounded-lg shadow-soft text-center">
        <p className="text-slate-400">No workouts logged yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-white/10 p-4 rounded-lg shadow-soft max-h-80 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-3">Workout History</h2>
      <ul className="space-y-3">
        {workouts.map((workout) => (
          <li
            key={workout.id || workout.date}
            className="border-b border-white/10 pb-2 last:border-none"
          >
            <p className="font-medium text-white">{workout.exercise}</p>
            <p className="text-sm text-slate-400">
              {workout.sets} sets × {workout.reps} reps × {workout.weight} kg
            </p>
            {workout.date && (
              <p className="text-xs text-slate-500 mt-1">{workout.date}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
