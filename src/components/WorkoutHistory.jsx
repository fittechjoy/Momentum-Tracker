export default function WorkoutHistory({ workouts }) {
  if (workouts.length === 0)
    return (
      <div className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700">
        <h2 className="text-xl font-semibold mb-3 text-slate-100">
          Workout History
        </h2>
        <p className="text-slate-400">No workouts logged yet.</p>
      </div>
    );

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700">
      <h2 className="text-xl font-semibold mb-3 text-slate-100">
        Workout History
      </h2>

      {/* Scrollable list on small screens */}
      <div className="overflow-x-auto">
        <div className="min-w-[300px] space-y-3">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex justify-between items-center border-b border-slate-700 pb-2 last:border-none"
            >
              <div>
                <p className="font-medium text-slate-200">
                  {workout.exercise}
                </p>
                <p className="text-sm text-slate-400">
                  {workout.sets} sets × {workout.reps} reps × {workout.weight} kg
                </p>
              </div>
              <span className="text-xs text-slate-500">{workout.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
