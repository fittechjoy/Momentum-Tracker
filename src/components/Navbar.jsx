import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold text-blue-400">Momentum Tracker</h1>

      {/* Show nav links only when user is logged in */}
      {user && (
        <div className="space-x-6 flex items-center">
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

          {/* ✅ Working Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
