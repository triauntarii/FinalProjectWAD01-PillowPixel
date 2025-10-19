import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./Context/AuthProvider";
import { useAuth } from "./Context/useAuth";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import AdminPage from "./Pages/Admin";

interface PrivateRouteProps {
  children: ReactNode;
}

interface AdminRouteProps {
  children: React.ReactNode;
}

// Private route, untuk melindungi halaman home, jika tidak login maka tidak bisa akses /home
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuth();

  // Kalau bukan admin → arahkan ke halaman unauthorized (bisa kamu ganti ke /home)
  if (user?.isAdmin !== 1) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Kalau admin → izinkan akses
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />

          {/* Default path diarahkan ke login */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
