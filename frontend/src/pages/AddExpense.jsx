import { useState } from 'react';
import API from '../api/axios';
import "../styles/addExpense.css";

const categories = ['Food', 'Transport', 'Rent', 'Shopping', 'Entertainment', 'Bills', 'Other'];

export default function AddExpense({ onAdded }) {
  const [form, setForm] = useState({ title: '', amount: '', category: 'Food', date: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/expenses', form);
    setForm({ title: '', amount: '', category: 'Food', date: '' });
    onAdded(); // refresh parent list
  };

  return (
    <div className="add-expense-card">
    <form onSubmit={handleSubmit} className="expense-form">
      <input placeholder="Title" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <input type="number" placeholder="Amount" value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
      <select value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <input type="date" value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <button type="submit">Add Expense</button>
    </form>
    </div>    
  );
}