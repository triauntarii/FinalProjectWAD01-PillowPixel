import React, { useState } from "react";
import { useAuth } from "../Context/useAuth";
import { useNavigate } from "react-router";

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await register(username, email, password, 0);
    if (success) navigate("/login");
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          gap: 10,
        }}
      >
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit">Register</button>
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

export default RegisterForm;
