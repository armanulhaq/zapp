# 🛒 Zapp – Online Grocery Platform

**Zapp** is a full-stack MERN application designed for a smooth online grocery shopping experience. It includes secure authentication, product management, and Stripe payments — all within a clean, responsive UI.

---

## 🚀 Features

- 🔐 **Authentication**  
  JWT-based login and signup with hashed passwords using `bcrypt`.

- 📦 **Product & Inventory Management**  
  Admin features to add, update stock availability data, and list products. Includes image uploads via **Cloudinary**.

- 💳 **Stripe Payments**  
  Seamless checkout flow with **Stripe**, including webhook-based payment verification.

- 🖥️ **Frontend**  
  Built with **React 19**, **React Router 7, and **Tailwind CSS 4.

- ⚙️ **Backend**  
  RESTful API using **Node.js**, **Express 5.x**, and **MongoDB** via **Mongoose**.

---

## 🧰 Tech Stack

### Frontend
- `React 19`
- `React Router 7`
- `Tailwind CSS 4`
- `Vite`
- `Axios`

### Backend
- `Node.js`
- `Express.js 5`
- `MongoDB` + `Mongoose`
- `jsonwebtoken`, `bcryptjs`, `cookie-parser`, `cors`, `dotenv`, `multer`
- `Stripe` for payments
- `Cloudinary` for image storage

### Tools & Deployment
- `Vercel` (Frontend hosting)
- `Nodemon` (Dev server)
- `ESLint` (Linting)
- `Git`, `Postman`

---

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/armanulhaq/zapp

# 2. Install client dependencies
cd client && npm install

# 3. Install server dependencies
cd ../server && npm install

# 4. Add a .env file in /server with:
# MONGO_URI, JWT_SECRET, CLOUDINARY creds, STRIPE keys

# 5. Start the development servers
cd client && npm run dev      # Start frontend
cd ../server && npm run server  # Start backend
