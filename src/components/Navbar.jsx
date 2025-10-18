import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Navbar({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-[#121212] text-white px-6 py-3 rounded-lg shadow-md border-b-2 border-[#1e90ff]">
      {/* Main heading */}
      <h1 className="text-2xl font-extrabold text-[#1e90ff] tracking-wide">
        MOMENTUM TRACKER
      </h1>

      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm">{user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-[#1e90ff] hover:bg-[#3399ff] text-white px-3 py-1 rounded transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
