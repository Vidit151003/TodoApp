# React + Express + MongoDB — Todo App

A clean, minimal MERN-stack Todo application with CRUD functionality. Frontend in **React**, backend in **Express/Node.js**, and **MongoDB** for persistence (local by default).

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Run](#setup--run)
- [Environment Variables](#environment-variables)
- [API](#api)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)

---

## Features
- Add, edit, toggle complete, and delete todos
- RESTful API with Express
- Mongoose models for data validation
- Simple, clean UI with React
- Sensible error handling on server and client

---

## Tech Stack
- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB (local)

---

## Project Structure
```bash
.
├── client/                      # React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                      # Express API
│   ├── models/                  # Mongoose schemas
│   │   └── Todo.js
│   ├── routes/                  # API routes
│   │   └── todos.js
│   ├── server.js                # App entry
│   ├── .env.example
│   └── package.json
│
└── README.md
