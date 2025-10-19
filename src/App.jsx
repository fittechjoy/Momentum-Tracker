import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthLayout from "./components/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import Progress from "./pages/Progress";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      {/* Navbar shows on authenticated sections later; for now show everywhere */}
      <Navbar />

      <Routes>
        {/* Public (UI only for now) */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />

        {/* App pages (UI only for now) */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
