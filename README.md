# 🚀 Job Tracker Backend API

A secure and scalable Job Application Tracker Backend built using **Node.js, Express, and MySQL**.

This project demonstrates production-level backend architecture including authentication, authorization, validation, pagination, filtering, and search.

---

## 🔐 Features

- User Registration & Login
- JWT Authentication
- Protected Routes
- Role-based Data Isolation (Users can only access their own jobs)
- Centralized Error Handling
- Environment Variable Configuration
- Request Validation using express-validator
- Pagination (LIMIT & OFFSET)
- Filtering by Job Status
- Search by Company Name
- Clean MVC-style Architecture

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- dotenv
- Git & GitHub

---

## 📁 Project Structure

job-tracker-backend/
│
├── controllers/
│   ├── authController.js
│   └── jobController.js
│
├── routes/
│   ├── authRoutes.js
│   └── jobRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── db.js
├── server.js
├── .gitignore
├── package.json
└── README.md

---

## 🔑 Authentication Flow

1. User registers  
2. User logs in  
3. Server generates JWT token  
4. Token is required in Authorization header:  

Authorization: Bearer <token>

5. Middleware verifies token  
6. User can access protected routes  

---

## 📌 API Endpoints

### 🔐 Auth Routes

POST   /api/auth/register   → Register new user  
POST   /api/auth/login      → Login user  

---

### 📊 Job Routes (Protected)

POST    /api/jobs        → Add new job  
GET     /api/jobs        → Get user jobs (supports pagination, filtering, search)  
PUT     /api/jobs/:id    → Update job status  
DELETE  /api/jobs/:id    → Delete job  

---

## 📄 Pagination Example

GET /api/jobs?page=1&limit=5

Uses SQL:

LIMIT ? OFFSET ?

---

## 🔍 Filtering Example

GET /api/jobs?status=Applied

---

## 🔎 Search Example

GET /api/jobs?search=Google

Uses SQL:

LIKE '%Google%'

---

## ⚙️ Environment Variables

Create a .env file in the root directory:

JWT_SECRET=your_secret_key  
PORT=5000  

---

## ▶️ How to Run Locally

1. Clone the repository  

git clone https://github.com/YOUR_USERNAME/job-tracker-backend.git

2. Install dependencies  

npm install

3. Create .env file  

4. Start server  

node server.js

Server runs on:

http://localhost:5000

---

## 🎯 Learning Highlights

This project demonstrates:

- Secure authentication implementation
- Middleware-based architecture
- SQL query parameter binding
- Production-ready API design
- Scalable pagination and filtering logic
- Clean separation of concerns

---

## 👨‍💻 Author

Lovepreet Singh  
Computer Science Graduate  
Backend Developer (Node.js / Express / MySQL)

