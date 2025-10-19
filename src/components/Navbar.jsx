import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/exercises", label: "Exercises" },
    { to: "/progress", label: "Progress" },
    { to: "/plans", label: "Plans" },
    { to: "/profile", label: "Profile" },
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Sign Up" },
  ];

  return (
    <nav className="h-16 bg-slate-950/60 backdrop-blur border-b border-white/10 text-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4">
        <Link to="/" className="font-semibold tracking-tight">
          Momentum Fitness Tracker
        </Link>
        <div className="flex gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-lg text-sm transition
                ${pathname === l.to ? "bg-indigo-600 text-white" : "hover:bg-white/10"}
              `}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
