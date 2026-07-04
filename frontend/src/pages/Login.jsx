import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">

      <h1>💰 Expense Tracker</h1>
      <p>Manage your expenses smarter</p>

      <form onSubmit={handleSubmit}>

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
          Login
        </button>

      </form>

      <div className="login-footer">
        Don't have an account?
        <Link to="/register">
          Register
        </Link>
      </div>

    </div>
  </div>
);
}