import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../api/axios';
import AddExpense from './AddExpense';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import "../styles/dashboard.css";


const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7', '#64748b'];

export default function Dashboard() {

    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [categorySummary, setCategorySummary] = useState([]);
    const [monthlySummary, setMonthlySummary] = useState([]);

    const fetchAll = async () => {
        const [expRes, catRes, monthRes] = await Promise.all([
            API.get('/expenses'),
            API.get('/expenses/summary/category'),
            API.get('/expenses/summary/monthly')
        ]);
        setExpenses(expRes.data);
        setCategorySummary(catRes.data);
        setMonthlySummary(
            monthRes.data.map(m => ({ name: `${m._id.month}/${m._id.year}`, total: m.total }))
        );
    };

    useEffect(() => { fetchAll(); }, []);

    const deleteExpense = async (id) => {
        await API.delete(`/expenses/${id}`);
        fetchAll();
    };
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };
    const totalExpense = expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const totalCategories = new Set(
        expenses.map((item) => item.category)
    ).size;

    const totalTransactions = expenses.length;

    const averageExpense =
        totalTransactions > 0
            ? (totalExpense / totalTransactions).toFixed(2)
            : 0;


    return (
        <div className="dashboard">

            <div className="topbar">

                <div>

                    <h1>💰 Expense Tracker</h1>

                    <p>Track your spending smartly.</p>

                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    Logout

                </button>

            </div>

            <AddExpense onAdded={fetchAll} />
            <div className="summary-grid">

                <div className="summary-card purple">
                    <h3>Total Expense</h3>
                    <h2>₹ {totalExpense}</h2>
                </div>

                <div className="summary-card blue">
                    <h3>Categories</h3>
                    <h2>{totalCategories}</h2>
                </div>

                <div className="summary-card green">
                    <h3>Transactions</h3>
                    <h2>{totalTransactions}</h2>
                </div>

                <div className="summary-card orange">
                    <h3>Average</h3>
                    <h2>₹ {averageExpense}</h2>
                </div>

            </div>

            <div className="chart-grid">

                <div className="chart-card">

                    <h2>📊 Spending by Category</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>

                            <Pie
                                data={categorySummary}
                                dataKey="total"
                                nameKey="_id"
                                outerRadius={100}
                                label
                            >

                                {categorySummary.map((_, i) =>

                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                    />

                                )}

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>
                    </ResponsiveContainer>

                </div>

                <div className="chart-card">

                    <h2>📈 Monthly Trend</h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <BarChart data={monthlySummary}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="total"
                                fill="#06b6d4"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <h2 className="expense-title">
                💳 Recent Expenses
            </h2>

            <div className="expense-grid">

                {expenses.map((e) => (

                    <div
                        className="expense-card"
                        key={e._id}
                    >

                        <div>

                            <h3>{e.title}</h3>

                            <p>

                                {e.category}

                            </p>

                            <p>

                                {new Date(e.date).toLocaleDateString()}

                            </p>

                        </div>

                        <div>

                            <h2>

                                ₹ {e.amount}

                            </h2>

                            <button
                                onClick={() => deleteExpense(e._id)}
                            >

                                Delete

                            </button>

                        </div>

                    </div>

                ))}

            </div>
        </div>

    );
}