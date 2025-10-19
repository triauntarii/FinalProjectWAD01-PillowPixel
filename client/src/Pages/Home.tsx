import React from "react";
import { useAuth } from "../Context/useAuth";
import { useNavigate } from "react-router";

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log("user login", user);

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </button>
      <h1>Welcome {user?.username || "Guest"} 👋</h1>

      {/* Tombol Logout hanya muncul kalau user login */}
      {user && (
        <button
          onClick={logout}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default HomePage;
