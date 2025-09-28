# 📌 Project Management App

A simple **Project Management Tool** with **User Authentication, Projects, and Tasks**.  

Built using:
- **Backend**: Node.js + Express.js + MongoDB (JWT Auth, bcrypt)  
- **Frontend**: React.js + TypeScript (Vite + Tailwind CSS)  
- **Database Seeder**: Inserts test user, projects, and tasks  

---

## ✨ Features

- 🔑 User authentication (Register/Login with JWT & hashed passwords)  
- 📂 Projects: Create, view, update, delete  
- ✅ Tasks: Create, view, update, delete (linked to projects)  
- 🔍 Task filtering by status (`todo`, `in-progress`, `done`)  
- 🌱 Seeder script (default user, projects, tasks)  
- 🎨 Clean UI with Tailwind CSS  
- 🚀 State managed via React Context  

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, JWT, bcrypt  
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Axios, React Router DOM  

---

## 📂 Folder Structure

```
project-management-app/
│
├── backend/        # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/        # User, Project, Task schemas
│   │   ├── controllers/   # Auth, Projects, Tasks logic
│   │   ├── routes/        # Express routes
│   │   ├── middleware/    # JWT auth middleware
│   │   ├── config/        # DB connection
│   │   ├── index.js       # App entry
│   │   └── seed.js        # Seeder script
│
└── frontend/       # React + TS + Vite + Tailwind
    ├── src/
    │   ├── context/       # Auth context
    │   ├── api/           # Axios config
    │   ├── pages/         # Login, Register, Dashboard, ProjectDetail
    │   ├── components/    # Navbar, ProjectCard, TaskCard
    │   └── utils/         # ProtectedRoute
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Nitinsaini-7/sofrik_task.git
cd sofrik_task
```

---

### 2. Backend Setup
```bash
cd backend
npm install
cp .env   # Update values if needed
MONGO_URI=mongodb://localhost:27017/sofrikTask
JWT_SECRET=secret@123
PORT=5000
```

#### Run development server
```bash
node server.js or nodemon server.js
```
#### Run seed script
```bash
node seed.js
```
Backend will start at `http://localhost:5000`


This will insert:

- **User:** `test@example.com`  
- **Password:** `Test@123`  
- 2 demo projects with 3 tasks each  

---

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

#### Configure API base URL (optional)
Create `.env` inside `frontend/` if your backend isn’t on default port:

```
VITE_API_BASE=http://localhost:5000
```

#### Run frontend
```bash
npm run dev
```
Frontend will start at `http://localhost:5173`

---

## 🔑 Default Credentials
Use these to login after running the seed script:

```
Email: test@example.com
Password: Test@123
```

---

## 📜 License
This project is for educational/demo purposes.
