import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold text-blue-400">Momentum Tracker</h1>

      <div className="space-x-6 flex items-center">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/exercises">Exercises</NavLink>
        <NavLink to="/progress">Progress</NavLink>
        <NavLink to="/plans">Plans</NavLink>
        <NavLink to="/profile">Profile</NavLink>

        {currentUser && (
          <button onClick={handleLogout} className="ml-4 bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
