# Smartphone Analytics Backend

This is the **backend** for the Smartphone Analytics Project. It provides API endpoints to fetch phone data from a **MySQL database** and serves it to the frontend (React). It also includes endpoints for analytics like the highest-rated phone, most-reviewed phone, and recommendations.

---

## 🔧 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)

---

## 🗄 Database Setup

1. **Start MySQL server** on **port 3306**.
2. **Create the database and table**:

```sql







🖥 Backend Setup

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Configure database connection in db.js:

import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_mysql_password",
  database: "smartphone_db",
  port: 3306
});


Start the backend server:

npm start


The backend will run on port 5000.

📦 API Endpoints
Phones
Method	Endpoint	Description
GET	/phones	Fetch all phones
GET	/phones/:id	Fetch a phone by ID
GET	/phones/search?q=query	Search phones by brand




⚡ Notes

Ensure ports do not conflict: backend 5000, MySQL 3306.

All numeric fields (rating, price, battery, etc.) are stored as strings in the database. Convert them in frontend if needed.

You can create additional endpoints for analytics like most-reviewed, best-camera, or custom recommendations.

If integrating a Python recommendation engine, use a separate API for recommendations and call it from this backend.

🚀 Running the Backend

Start MySQL on port 3306.

Install dependencies:

npm install


Start server:

npm start


The backend is now running at:

http://localhost:5000


You can now connect your React frontend to fetch phone data and analytics.

💡 Project Structure
backend/
│
├─ controllers/
│  ├─ phonesController.js   # Contains logic for all phone-related endpoints
│
├─ routes/
│  ├─ phonesRoutes.js       # Defines API routes
│
├─ db.js                    # MySQL database connection
├─ server.js                # Express server setup
├─ package.json
└─ README.md
