import React from "react";
import { useAuth } from "../Context/useAuth";
// import { useNavigate } from "react-router";

function Admin() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.username || "Admin"} 👋</h1>
    </div>
  );
}

export default Admin;
