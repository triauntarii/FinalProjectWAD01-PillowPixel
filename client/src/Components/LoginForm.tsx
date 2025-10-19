import React, { useState } from "react";
import { useAuth } from "../Context/useAuth";
import { useNavigate } from "react-router";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          gap: 10,
        }}
      >
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <button
        style={{
          marginTop: "15px",
          backgroundColor: "#ccc",
          border: "none",
          padding: "8px 16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Back to Homepage
      </button>
    </>
  );
};

export default LoginForm;
