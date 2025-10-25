import { useState, useEffect } from "react";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    title: "",
    focus: "",
    frequency: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ Load saved plans from localStorage
  useEffect(() => {
    const savedPlans = JSON.parse(localStorage.getItem("plans")) || [];
    setPlans(savedPlans);
  }, []);

  // ✅ Save plans whenever they change
  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  }, [plans]);

  // ✅ Add new plan
  const handleAddPlan = (e) => {
    e.preventDefault();

    if (!newPlan.title || !newPlan.focus || !newPlan.frequency) return;

    if (editingIndex !== null) {
      const updated = [...plans];
      updated[editingIndex] = newPlan;
      setPlans(updated);
      setEditingIndex(null);
    } else {
      setPlans([...plans, newPlan]);
    }

    setNewPlan({ title: "", focus: "", frequency: "" });
  };

  // ✅ Edit existing plan
  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewPlan(plans[index]);
  };

  // ✅ Delete plan
  const handleDelete = (index) => {
    const updated = plans.filter((_, i) => i !== index);
    setPlans(updated);
  };

  // ✅ Clear all
  const clearPlans = () => {
    if (confirm("Are you sure you want to delete all plans?")) {
      setPlans([]);
      localStorage.removeItem("plans");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
        Workout Plans
      </h1>

      {/* 🟢 Plan Form */}
      <form
        onSubmit={handleAddPlan}
        className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4 text-slate-100">
          {editingIndex !== null ? "Edit Plan" : "Create a New Plan"}
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-slate-300 text-sm block mb-1">Title</label>
            <input
              type="text"
              value={newPlan.title}
              onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
              placeholder="e.g. Glute Builder"
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm block mb-1">Focus</label>
            <input
              type="text"
              value={newPlan.focus}
              onChange={(e) => setNewPlan({ ...newPlan, focus: e.target.value })}
              placeholder="e.g. Lower body, Cardio, Strength"
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm block mb-1">
              Frequency
            </label>
            <input
              type="text"
              value={newPlan.frequency}
              onChange={(e) =>
                setNewPlan({ ...newPlan, frequency: e.target.value })
              }
              placeholder="e.g. 3x per week"
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            {editingIndex !== null ? "Update Plan" : "Add Plan"}
          </button>
          {plans.length > 0 && (
            <button
              type="button"
              onClick={clearPlans}
              className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Clear All
            </button>
          )}
        </div>
      </form>

      {/* 🟢 Plans List */}
      {plans.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-6 shadow-md flex flex-col justify-between transition hover:shadow-xl hover:bg-slate-800/60"
            >
              <div>
                <h3 className="text-xl font-semibold text-indigo-400">
                  {plan.title}
                </h3>
                <p className="text-slate-300 mt-1">
                  <strong>Focus:</strong> {plan.focus}
                </p>
                <p className="text-slate-300">
                  <strong>Frequency:</strong> {plan.frequency}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-center mt-10">
          No workout plans yet. Create your first one above!
        </p>
      )}
    </div>
  );
}
