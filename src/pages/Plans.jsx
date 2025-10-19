import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: "", exercises: "" });
  const [editingPlan, setEditingPlan] = useState(null);

  // ✅ Fetch plans when page loads
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "plans"));
        const fetchedPlans = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  // ✅ Handle adding new plan
  const handleAddPlan = async () => {
    if (!newPlan.name.trim() || !newPlan.exercises.trim()) return;

    try {
      const docRef = await addDoc(collection(db, "plans"), newPlan);
      setPlans([...plans, { id: docRef.id, ...newPlan }]);
      setNewPlan({ name: "", exercises: "" });
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "plans", id));
      setPlans(plans.filter((plan) => plan.id !== id));
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  // ✅ Start editing a plan
  const startEditing = (plan) => {
    setEditingPlan({ ...plan });
  };

  // ✅ Handle saving edits
  const handleSaveEdit = async () => {
    try {
      const docRef = doc(db, "plans", editingPlan.id);
      await updateDoc(docRef, {
        name: editingPlan.name,
        exercises: editingPlan.exercises,
      });

      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === editingPlan.id ? editingPlan : plan
        )
      );
      setEditingPlan(null);
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Workout Plans</h1>

      {/* ✅ Add New Plan */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-soft mb-8">
        <h2 className="text-xl font-semibold mb-4">Create a new plan</h2>
        <input
          type="text"
          placeholder="Plan name"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 mb-2 text-slate-100 placeholder:text-slate-400"
        />
        <textarea
          placeholder="List exercises..."
          value={newPlan.exercises}
          onChange={(e) =>
            setNewPlan({ ...newPlan, exercises: e.target.value })
          }
          className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 mb-4 text-slate-100 placeholder:text-slate-400"
          rows={3}
        />
        <button
          onClick={handleAddPlan}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg"
        >
          Save Plan
        </button>
      </div>

      {/* ✅ List All Plans */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-xl bg-slate-900/50 border border-white/10 p-4 flex justify-between items-start"
          >
            {editingPlan?.id === plan.id ? (
              <div className="w-full space-y-2">
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, name: e.target.value })
                  }
                  className="w-full bg-slate-800/70 text-slate-100 px-3 py-2 rounded-lg"
                />
                <textarea
                  value={editingPlan.exercises}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      exercises: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800/70 text-slate-100 px-3 py-2 rounded-lg"
                  rows={3}
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPlan(null)}
                    className="bg-gray-500 hover:bg-gray-400 text-white px-3 py-1 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-lg font-semibold text-slate-100">
                    {plan.name}
                  </p>
                  <p className="text-slate-300 text-sm">{plan.exercises}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => startEditing(plan)}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
