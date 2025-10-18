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
    <nav className="flex items-center justify-between bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">Momentum Tracker</h1>

      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm">{user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
