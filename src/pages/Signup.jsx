import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Signup failed. Try a different email or stronger password.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 blur-sm"
        style={{ backgroundImage: "url('/gym-bg.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/70 to-slate-900/90"></div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/5 border border-white/10">
        {/* LEFT - Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 p-10 flex flex-col justify-center text-center md:text-left bg-slate-900/40"
        >
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
            Join Momentum <br /> Fitness Tracker
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Create your free account and start tracking your fitness journey
            today. Small steps build great strength.
          </p>
        </motion.div>

        {/* RIGHT - Form Section */}
        <div className="w-full md:w-1/2 p-10 bg-slate-800/60 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-100">
              Create Account
            </h2>

            {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="text-sm text-slate-300 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 block mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Repeat password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg py-2 transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm text-slate-300 mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center text-slate-400 text-xs">
            © 2025 Momentum Fitness Tracker — Developed by{" "}
            <span className="text-indigo-400 font-semibold">Joy Kiama</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
