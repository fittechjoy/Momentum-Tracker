export default function WorkoutHistory({ workouts }) {
  if (!workouts || workouts.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">
          Workout History
        </h2>
        <p className="text-gray-500">No workouts logged yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-3 text-blue-700">
        Workout History
      </h2>

      {/* Scroll horizontally on mobile */}
      <div className="overflow-x-auto">
        <div className="min-w-[300px] space-y-2">
          {workouts.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <div>
                <p className="font-medium text-gray-800">{item.exercise}</p>
                <p className="text-sm text-gray-600">
                  {item.sets} sets × {item.reps} reps × {item.weight} kg
                </p>
              </div>
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
