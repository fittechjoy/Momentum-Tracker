import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid email or password. Try again.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
      <p className="text-slate-300 mb-6">
        Log in to continue tracking your momentum.
      </p>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-slate-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm text-slate-200">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-2 transition"
        >
          Log In
        </button>
      </form>

      <p className="text-sm text-slate-300 mt-4 text-center">
        No account?{" "}
        <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
