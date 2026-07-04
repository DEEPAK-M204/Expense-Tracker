import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const [form, setForm] =useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", form);

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
  <div className="register-container">
    <div className="register-card">

      <h1>✨ Create Account</h1>
      <p>Start tracking your expenses today</p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button type="submit">
          Create Account
        </button>

      </form>

      <div className="register-footer">
        Already have an account?
        <Link to="/login">
          Login
        </Link>
      </div>

    </div>
  </div>
);
}