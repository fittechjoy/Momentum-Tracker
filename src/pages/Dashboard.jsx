import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

import WorkoutForm from "../components/WorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";
import MomentumScore from "../components/MomentumScore";
import ProgressChart from "../components/ProgressChart";
import SearchExercises from "../components/SearchExercises";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch workouts from Firestore
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, "workouts"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [currentUser]);

  // ✅ Update progress chart whenever workouts change
  useEffect(() => {
    if (!workouts.length) {
      setProgressData([]);
      return;
    }

    const data = workouts.map((w) => ({
      date: w.date,
      totalWeight: w.sets * w.reps * w.weight,
    }));

    setProgressData(data);
  }, [workouts]);

  // ✅ Add workout to Firestore
  const addWorkout = async (workout) => {
    if (!currentUser) return;

    const newWorkout = {
      ...workout,
      userId: currentUser.uid,
      date: new Date().toLocaleDateString(),
    };

    try {
      const docRef = await addDoc(collection(db, "workouts"), newWorkout);
      setWorkouts([...workouts, { id: docRef.id, ...newWorkout }]);
    } catch (err) {
      console.error("Error adding workout:", err);
    }
  };

  // ✅ Clear all workouts (for this user)
  const clearWorkouts = async () => {
    if (!confirm("Are you sure you want to delete all workouts?")) return;
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, "workouts"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      const deletes = querySnapshot.docs.map((d) => deleteDoc(doc(db, "workouts", d.id)));
      await Promise.all(deletes);

      setWorkouts([]);
    } catch (err) {
      console.error("Error clearing workouts:", err);
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading your workouts...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* LEFT column */}
      <div className="space-y-6">
        <WorkoutForm onAddWorkout={addWorkout} />
        <MomentumScore workouts={workouts} />
        <button
          onClick={clearWorkouts}
          className="mt-3 mb-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          Clear All Workouts
        </button>
        <ProgressChart data={progressData} />
      </div>

      {/* RIGHT column */}
      <div className="space-y-6">
        <WorkoutHistory workouts={workouts} />
        <SearchExercises />
      </div>
    </div>
  );
}
