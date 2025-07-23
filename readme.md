# Full Stack App Setup Guide

This guide helps you set up the backend and frontend for the project with ease.

---

## 📦 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend db using Docker:
   ```bash
   docker compose up --build -d
   ```
4. Run the Fast api server:
    ```bash
   uvicorn main:app --reload
   ```
---

## 🌐 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## ⚙️ Environment Variables

Make sure you define a `.env.dev` file with all required variables for pgsql database.

---

## ✅ Summary

- Backend runs in Docker.
- Frontend runs with Next/React 
- Don't forget to configure `.env.dev`.

Now you're good to go 🚀