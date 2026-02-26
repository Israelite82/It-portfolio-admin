import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import AdminLayout from "./components/Adminlayout";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Books from "./pages/Books";
import Journals from "./pages/Journals";
import Teachings from "./pages/Teachings";
import Blog from "./pages/Blog";
import Analytics from "./pages/Analytics";
import Subscribers from "./pages/Subscribers";
import Menu from "./pages/Menu";
import Settings from "./pages/Settings";

export default function App() {
  // Check localStorage on load
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Update localStorage whenever login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/login"
        element={
          isLoggedIn
            ? <Navigate to="/" replace />
            : <Login onLogin={handleLogin} />
        }
      />

      {/* Protected admin routes */}
      <Route
        path="/"
        element={
          isLoggedIn
            ? <AdminLayout onLogout={handleLogout} />
            : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="books" element={<Books />} />
        <Route path="journals" element={<Journals />} />
        <Route path="teachings" element={<Teachings />} />
        <Route path="blog" element={<Blog />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="subscribers" element={<Subscribers />} />
        <Route path="menu" element={<Menu />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
