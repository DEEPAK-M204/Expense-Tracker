# Expense-Tracker
💰 Expense Tracker
A full-stack expense tracking app to manage and visualize your spending — built with Node.js/Express, MongoDB, and React.
✨ Features

🔐 User authentication (Register/Login with JWT)
➕ Add expenses with title, amount, category & date
📊 Dashboard with Total Expense, Categories, Transactions & Average
🥧 Spending by Category (pie chart) & 📈 Monthly Trend (bar chart)
🧾 Recent expenses list with delete option

🏗️ Tech Stack

Backend: Node.js, Express.js, MongoDB (Mongoose), JWT
Frontend: React (Vite), Axios, Chart library for visualizations

📁 Project Structure
expense-tracker/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   └── controllers/
└── frontend/
├── index.html
├── package.json
└── src/
├── main.jsx
├── App.jsx
├── api/
└── pages/

⚙️ Setup

#Backend
bashcd backend
npm install
create a .env file with PORT, MONGO_URI, JWT_SECRET
node server.js

#Frontend
bashcd frontend
npm install
npm run dev
