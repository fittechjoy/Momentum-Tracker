// src/components/WorkoutForm.jsx
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
      alert("Please fill in all workout details before saving.");
      return;
    }

    onAddWorkout({
      exercise: formData.exercise,
      sets: parseInt(formData.sets),
      reps: parseInt(formData.reps),
      weight: parseFloat(formData.weight),
    });

    setFormData({ exercise: "", sets: "", reps: "", weight: "" });
  };

  return (
    <div className="bg-slate-900/50 p-4 rounded-lg shadow-lg border border-white/10">
      <h2 className="text-xl font-semibold mb-3">Log Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="exercise"
          placeholder="Exercise name"
          value={formData.exercise}
          onChange={handleChange}
          className="w-full bg-slate-800/70 border border-white/10 px-3 py-2 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-600"
          autoComplete="off"
        />
        <input
          type="number"
          name="sets"
          placeholder="Sets"
          value={formData.sets}
          onChange={handleChange}
          className="w-full bg-slate-800/70 border border-white/10 px-3 py-2 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-600"
        />
        <input
          type="number"
          name="reps"
          placeholder="Reps"
          value={formData.reps}
          onChange={handleChange}
          className="w-full bg-slate-800/70 border border-white/10 px-3 py-2 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-600"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full bg-slate-800/70 border border-white/10 px-3 py-2 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-600"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-2 transition"
        >
          Add Workout
        </button>
      </form>
    </div>
  );
}
