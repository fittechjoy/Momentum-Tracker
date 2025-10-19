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
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ ADD THIS

export default function App() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 bg-center bg-cover bg-fixed"
      style={{
        backgroundImage: `url('/src/assets/gym-bg.jpg')`,
        backgroundBlendMode: "overlay",
      }}
    >
      <Navbar />

      <Routes>
        {/* ✅ Public Routes */}
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

        {/* ✅ Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises"
          element={
            <ProtectedRoute>
              <Exercises />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <Plans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
