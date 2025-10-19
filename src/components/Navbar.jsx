import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold text-blue-400">Momentum Tracker</h1>

      <div className="space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-slate-300 hover:text-white ${
              isActive ? "text-blue-400 font-semibold" : ""
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/exercises"
          className={({ isActive }) =>
            `text-slate-300 hover:text-white ${
              isActive ? "text-blue-400 font-semibold" : ""
            }`
          }
        >
          Exercises
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `text-slate-300 hover:text-white ${
              isActive ? "text-blue-400 font-semibold" : ""
            }`
          }
        >
          Progress
        </NavLink>

        <NavLink
          to="/plans"
          className={({ isActive }) =>
            `text-slate-300 hover:text-white ${
              isActive ? "text-blue-400 font-semibold" : ""
            }`
          }
        >
          Plans
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-slate-300 hover:text-white ${
              isActive ? "text-blue-400 font-semibold" : ""
            }`
          }
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
}
