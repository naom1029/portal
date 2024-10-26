import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ShortcutSection from "./feature/shortcut/components/ShortcutSection";
import Login from "./feature/auth/components/Login";
import Register from "./feature/auth/components/Register";
import PrivateRoute from "./feature/auth/components/PrivateRoute";
import { useAuthStore } from "./feature/auth/store/authStore";
export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<ShortcutSection />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
