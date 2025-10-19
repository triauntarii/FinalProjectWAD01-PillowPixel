import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { AuthContext, User } from "./AuthContext";

// Auth Provider adalah untuk menjalankan function agar value yang di set di halaman ini bisa digunakan di semua component/pages jika termasuk bagian dari children
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string,
    isAdmin: number
  ): Promise<boolean> => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return false;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
        isAdmin
      });

      console.log("login", res);
      alert("Registration successful!");
      navigate("/login", { replace: true });
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Register failed"
        );
      } else if (err instanceof Error) {
        console.error("General error:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
      return false;
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      Cookies.set("username", res.data.username, { expires: 3 });
      Cookies.set("email", res.data.email, { expires: 3 });
      Cookies.set("token", res.data.token, { expires: 3 });

      console.log("loginForm", res);

      console.log("isAdmin", res.data.is_admin);

      const loggedUser: User = {
        email: res.data.email,
        username: res.data.username,
        token: res.data.token,
        isAdmin: res.data.isAdmin,
      };

      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);

      if (res?.data?.isAdmin == 1) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Login failed");
      } else if (err instanceof Error) {
        console.error("General error:", err.message);
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    Cookies.remove("username");
    Cookies.remove("email");
    Cookies.remove("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
