export default function WorkoutForm() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Log Workout</h2>
      <form className="space-y-2">
        <input type="text" placeholder="Exercise name" className="w-full border p-2 rounded" />
        <input type="number" placeholder="Sets" className="w-full border p-2 rounded" />
        <input type="number" placeholder="Reps" className="w-full border p-2 rounded" />
        <input type="number" placeholder="Weight (kg)" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Workout
        </button>
      </form>
    </div>
  );
}
