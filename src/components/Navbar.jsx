import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-700 px-4 py-3 flex flex-wrap justify-between items-center shadow-md rounded-b-2xl">
      <h1 className="text-lg sm:text-2xl font-extrabold text-blue-400 tracking-wide">
        Momentum Tracker
      </h1>

      {/* Hamburger */}
      {currentUser && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-slate-200 text-2xl"
        >
          ☰
        </button>
      )}

      {currentUser && (
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full sm:flex sm:items-center sm:w-auto mt-3 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-6`}
        >
          {["Dashboard", "Exercises", "Progress", "Plans", "Profile"].map(
            (page) => (
              <NavLink
                key={page}
                to={`/${page === "Dashboard" ? "" : page.toLowerCase()}`}
                className={({ isActive }) =>
                  `block sm:inline text-slate-300 hover:text-white ${
                    isActive ? "text-blue-400 font-semibold" : ""
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {page}
              </NavLink>
            )
          )}

          <button
            onClick={handleLogout}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
