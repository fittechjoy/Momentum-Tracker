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
      navigate("/"); // Redirect to Dashboard
    } catch (err) {
      setError("Invalid email or password. Try again.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
      <p className="text-slate-300 mb-6">
        Log in to continue tracking your momentum.
      </p>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full bg-slate-900/70 border border-white/10 rounded-lg px-3 py-2 text-slate-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full bg-slate-900/70 border border-white/10 rounded-lg px-3 py-2 text-slate-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-2 transition"
        >
          Log In
        </button>
      </form>

      <p className="text-sm text-slate-300 mt-4 text-center">
        No account?{" "}
        <Link to="/signup" className="text-indigo-400 underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
