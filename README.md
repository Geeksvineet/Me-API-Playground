# 🚀 Me-API Playground

A full-stack **MERN** playground to manage and showcase your developer profile via a clean API and minimal, interactive frontend.

---

## 🌟 Features

- **Profile Management:**  
  Create, view, edit, and delete your profile (name, email, education, plus GitHub, LinkedIn, and Portfolio links).

- **Projects:**  
  Add, search, edit, and delete projects with title, description, skills, and demo/source links.

- **Skills:**  
  Add, edit, and delete skills. Includes proficiency level & progress bar UI.

- **Search & Query Support:**  
  - `GET /projects?q=react` (search projects by keyword)  
  - `GET /skills/top` (get top skills)  
  - `GET /health` (liveness/health check endpoint)

- **Interactive UI:**  
  React + Vite + TailwindCSS + Framer Motion for snappy, animated UX.

- **Full CRUD:**  
  All entities (profile, skills, projects) are editable.

---

## 🏗️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Framer Motion  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas (via Mongoose)
- **Hosting:**  
  - Frontend: [Vercel](http://localhost:5173/)  
  - Backend: [Render](http://localhost:4000/)  

---

## 📂 Project Structure

```
/backend
  ├── models/        # Mongoose schemas
  ├── routes/        # Express routes
  └── server.js      # Entry point

/frontend
  ├── src/components/  # UI components
  └── src/App.jsx      # Main frontend
```

---

## ⚙️ Setup Instructions

### 🔹 Local Development

1. **Clone the repo:**

    ```bash
    git clone 
    cd Me-API-playground
    ```

2. **Backend Setup:**

    ```bash
    cd backend
    npm install
    npm run dev
    ```

    - Add a `.env` file in `/backend`:
      ```
      MONGO_URI=your-mongodb-uri
      PORT=4000
      ```

3. **Frontend Setup:**

    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

    - Add a `.env` file in `/frontend`:
      ```
      VITE_API_URL=http://localhost:4000
      ```

4. **Open in browser:**

    - Backend: [http://localhost:4000](http://localhost:4000)
    - Frontend: [http://localhost:5173](http://localhost:5173)

---

### 🔹 Production

- **Frontend:** [Vercel Live]()
- **Backend:** [Render Live]()
- **Health Check:** `/health` endpoint

---

## 📖 API Documentation

### Profile

- `GET    /profile`         — Get profile
- `POST   /profile`         — Create profile
- `PUT    /profile/:id`     — Update profile
- `DELETE /profile/:id`     — Delete profile

### Skills

- `GET    /skills`          — List skills
- `POST   /skills`          — Add skill
- `PUT    /skills/:id`      — Update skill
- `DELETE /skills/:id`      — Delete skill
- `GET    /skills/top`      — Get top skills

### Projects

- `GET    /projects`        — List projects
- `GET    /projects?q=term` — Search projects
- `POST   /projects`        — Add project
- `PUT    /projects/:id`    — Update project
- `DELETE /projects/:id`    — Delete project

### Health

- `GET    /health`          — Returns `{ message: "ok" }`

---

## 🛑 Known Limitations

- **No authentication or rate limiting** (nice-to-have).
- **Single profile** supported (multi-user is not implemented).
- Assumes MongoDB Atlas for DB connection.

---

## 📄 Resume

[View my resume (Google Drive)](https://drive.google.com/file/d/1amVQRHo4MRH2iBXq278E8V5VUDmf771V/view?usp=sharing)

---

## 🔗 Live Playground

👉 []()

---
