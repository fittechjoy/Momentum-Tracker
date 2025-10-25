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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: "url('/gym-bg.jpg')" }}
        aria-hidden="true"
      ></div>

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/70 to-slate-900/90"></div>

      {/* 🔹 Page Content */}
      <div className="relative z-10 w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
          Your Profile
        </h1>

        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10 space-y-6">
          {/* Avatar Circle */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-3xl font-bold text-white">
              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : currentUser?.email?.charAt(0).toUpperCase()}
            </div>
            <p className="text-slate-300 mt-3 text-center">
              {currentUser?.email}
            </p>
          </div>

          {/* Editable Fields */}
          <div className="space-y-5">
            <div>
              <label className="text-slate-300 text-sm block mb-1">
                Display Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-slate-300 text-sm block mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Your age"
              />
            </div>

            <div>
              <label className="text-slate-300 text-sm block mb-1">
                Fitness Goal
              </label>
              <input
                type="text"
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="e.g. Lose weight, Build muscle"
              />
            </div>

            <div>
              <label className="text-slate-300 text-sm block mb-1">
                Workout Days
              </label>
              <input
                type="text"
                name="days"
                value={profile.days}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="e.g. Mon, Wed, Fri"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>

          {message && (
            <p className="text-center text-sm mt-4 text-slate-300">{message}</p>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-xs text-slate-400">
          © {new Date().getFullYear()} Momentum Fitness Tracker — Crafted by{" "}
          <span className="text-indigo-400 font-medium">Joy Kiama</span>
        </footer>
      </div>
    </div>
  );
}
