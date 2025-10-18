import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";
import MomentumScore from "../components/MomentumScore";
import ProgressChart from "../components/ProgressChart";
import SearchExercises from "../components/SearchExercises";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  // ✅ Load workouts from Firestore when logged in
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;
      setLoading(true);

      try {
        const q = query(collection(db, "workouts"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userWorkouts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkouts(userWorkouts);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [user]);

  // ✅ Automatically calculate progress chart
  useEffect(() => {
    if (workouts.length === 0) {
      setProgressData([]);
      return;
    }

    const data = workouts.map((w) => ({
      date: w.date,
      totalWeight: w.sets * w.reps * w.weight,
    }));

    setProgressData(data);
  }, [workouts]);

  // ✅ Add workout and save to Firestore
  const addWorkout = async (workout) => {
    if (!user) return alert("Please log in to save workouts.");

    const newWorkout = {
      ...workout,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      userId: user.uid,
    };

    try {
      const docRef = await addDoc(collection(db, "workouts"), newWorkout);
      setWorkouts((prev) => [...prev, { ...newWorkout, id: docRef.id }]);
    } catch (err) {
      console.error("Error saving workout:", err);
    }
  };

  // ✅ Clear workouts (both Firestore + local)
  const clearWorkouts = async () => {
    if (!user) return alert("Please log in first.");
    if (!confirm("Are you sure you want to delete all workouts?")) return;

    try {
      const q = query(collection(db, "workouts"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map((d) => deleteDoc(doc(db, "workouts", d.id)));
      await Promise.all(deletePromises);
      setWorkouts([]);
    } catch (err) {
      console.error("Error clearing workouts:", err);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <WorkoutForm onAddWorkout={addWorkout} />
        <MomentumScore workouts={workouts} />

        <button
          onClick={clearWorkouts}
          className="mt-3 mb-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          Clear All Workouts
        </button>

        {loading ? (
          <p className="text-gray-500">Loading workouts...</p>
        ) : (
          <ProgressChart data={progressData} />
        )}
      </div>

      <div className="md:max-h-[80vh] md:overflow-y-auto space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading your workout history...</p>
        ) : (
          <WorkoutHistory workouts={workouts} />
        )}
        <SearchExercises />
      </div>
    </div>
  );
}
