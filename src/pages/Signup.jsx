import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      setError("Signup failed. Try a different email or stronger password.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
      <form className="space-y-4" onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full bg-slate-900/70 border border-white/10 rounded-lg px-3 py-2 text-slate-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password (min 6 chars)"
          className="w-full bg-slate-900/70 border border-white/10 rounded-lg px-3 py-2 text-slate-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full bg-slate-900/70 border border-white/10 rounded-lg px-3 py-2 text-slate-100"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg py-2 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-slate-300 mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
