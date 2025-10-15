export default function WorkoutHistory() {
  const dummyHistory = [
    { id: 1, exercise: "Squats", sets: 3, reps: 12, weight: 40 },
    { id: 2, exercise: "Push Ups", sets: 4, reps: 10, weight: 0 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Workout History</h2>
      <ul>
        {dummyHistory.map((item) => (
          <li key={item.id} className="border-b py-2">
            <strong>{item.exercise}</strong> — {item.sets} sets × {item.reps} reps ({item.weight}kg)
          </li>
        ))}
      </ul>
    </div>
  );
}
