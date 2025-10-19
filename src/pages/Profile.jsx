import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    goal: "",
    days: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Load stored user data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setProfile({
          name: snap.data().name || "",
          age: snap.data().age || "",
          goal: snap.data().goal || "",
          days: snap.data().days || "",
        });
      }
    };
    fetchProfile();
  }, [currentUser]);

  // ✅ Save updates to Firestore
  const handleSave = async () => {
    if (!currentUser) return;

    try {
      setSaving(true);
      await setDoc(
        doc(db, "users", currentUser.uid),
        { ...profile },
        { merge: true }
      );
      setMessage("Profile updated ✅");
    } catch (err) {
      setMessage("Error saving profile ❌");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ✅ Input updater
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="bg-slate-900/50 border border-white/10 rounded-2xl shadow-soft p-6 space-y-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
          {profile.name
            ? profile.name.charAt(0).toUpperCase()
            : currentUser?.email?.charAt(0).toUpperCase()}
        </div>

        {/* Email */}
        <p className="text-lg text-slate-300">
          <span className="font-medium text-white">Email:</span>{" "}
          {currentUser?.email}
        </p>

        {/* Editable Fields */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="text-slate-300 text-sm block mb-1"
            >
              Display Name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              type="text"
              value={profile.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="text-slate-300 text-sm block mb-1"
            >
              Age
            </label>
            <input
              id="age"
              name="age"
              autoComplete="age"
              type="number"
              value={profile.age}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Your age"
            />
          </div>

          <div>
            <label
              htmlFor="goal"
              className="text-slate-300 text-sm block mb-1"
            >
              Fitness Goal
            </label>
            <input
              id="goal"
              name="goal"
              autoComplete="off"
              type="text"
              value={profile.goal}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="e.g. Lose weight, Build muscle"
            />
          </div>

          <div>
            <label
              htmlFor="days"
              className="text-slate-300 text-sm block mb-1"
            >
              Workout Days
            </label>
            <input
              id="days"
              name="days"
              autoComplete="off"
              type="text"
              value={profile.days}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="e.g. Mon, Wed, Fri"
            />
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-500 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {message && <p className="text-sm mt-2 text-slate-300">{message}</p>}

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
