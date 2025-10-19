import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
      <p className="text-slate-300 mb-6">Start building your momentum today.</p>

      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-slate-200">Email</label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm text-slate-200">Password</label>
          <input
            id="password"
            type="password"
            className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="At least 6 characters"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirm" className="text-sm text-slate-200">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Repeat password"
          />
        </div>

        <button
          type="button"
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg py-2 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-slate-300 mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
