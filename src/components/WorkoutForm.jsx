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
    if (!formData.exercise || !formData.sets || !formData.reps || !formData.weight) {
      alert("Please fill in all fields.");
      return;
    }
    onAddWorkout(formData);
    setFormData({ exercise: "", sets: "", reps: "", weight: "" });
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-slate-100">Log Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="exercise"
          placeholder="Exercise name"
          value={formData.exercise}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-200"
        />
        <input
          type="number"
          name="sets"
          placeholder="Sets"
          value={formData.sets}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-200"
        />
        <input
          type="number"
          name="reps"
          placeholder="Reps"
          value={formData.reps}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-200"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-200"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Add Workout
        </button>
      </form>
    </div>
  );
}
