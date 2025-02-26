# Axis Cyber Technologies Task
## Task Title: Budget Tracker Full-Stack Application
A comprehensive budget tracking application built with the MERN stack (MongoDB, Express, React, Node.js) to help users manage their income and expenses effectively.

## 📌 Objective
Develop a full-stack web application that enables users to:
- Track financial transactions (income/expenses)
- View dynamic financial summaries
- Analyze spending through visual charts
- Manage transactions with CRUD operations

## 🛠 Technologies Used
**Frontend:**
- React.js (with Hooks)
- Axios (API integration)
- Chart.js/Recharts (Data visualization)
- React Bootstrap (UI Components)
- HTML5/CSS3 (Responsive Design)

**Backend:**
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- CORS (Cross-Origin Resource Sharing)

## ✨ Key Features
**Frontend:**
- 📝 Transaction Management (Add/Delete)
- 📊 Real-time Financial Summary
- 🎯 Category-based Expense Visualization
- 📱 Mobile-responsive Design
- 🔄 Dynamic Data Updates

**Backend:**
- 🔒 RESTful API Endpoints
- 📈 Data Validation & Error Handling
- 🗃 MongoDB Data Storage
- ⚙️ Transaction Model:
  ```json
  {
    "id": "unique-identifier",
    "title": "Grocery Shopping",
    "title": "string",
    "amount": "number",
    "category": "string",
    "type": "income/expense",
    "date": "ISO Date"
  }

## 🚀 Installation & Setup
Clone repository:
```
git clone https://github.com/naumanalin/Axis_Cyber_Technologies_Task-.git
```
### Backend Setup:
```
cd backend
npm install
npm 
```
### Frontend Setup:
```
cd frontend
npm install
npm run dev
```

## 🌐 API Endpoints
Method	Endpoint	Description
GET	/api/transactions	Get all transactions
POST	/api/transactions	Create new transaction
DELETE	/api/transactions/:id	Delete specific transaction


🔗 **Live Demo**: 

📧 **Contact**: naumanalin865@gmail.com | <a href="https://noumanali.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
