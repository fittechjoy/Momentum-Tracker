export default function WorkoutHistory({ workouts }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Workout History</h2>
      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts logged yet.</p>
      ) : (
        <ul>
          {workouts.map((item) => (
            <li key={item.id} className="border-b py-2">
              <strong>{item.exercise}</strong> — {item.sets} sets × {item.reps} reps ({item.weight}kg)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
