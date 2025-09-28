import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Toaster/>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
