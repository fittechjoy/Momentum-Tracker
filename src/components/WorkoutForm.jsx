import { useState } from "react";

export default function WorkoutForm({ onAddWorkout }) {
  const [formData, setFormData] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.exercise) return;
    onAddWorkout(formData);
    setFormData({ exercise: "", sets: "", reps: "", weight: "" }); // reset
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Log Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="exercise"
          placeholder="Exercise name"
          value={formData.exercise}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="sets"
          placeholder="Sets"
          value={formData.sets}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="reps"
          placeholder="Reps"
          value={formData.reps}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Add Workout
        </button>
      </form>
    </div>
  );
}
