# Zapp: Modern Online Grocery Platform

Zapp is a comprehensive, full-stack online grocery application designed to provide a seamless shopping experience. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this platform offers robust user authentication, secure payment processing, and efficient product management.

## Key Features

*   **Secure User Authentication:** Implemented robust user registration and login with JWT (JSON Web Tokens) and bcrypt for password hashing, ensuring secure access.
*   **Product & Inventory Management:** Features for adding, listing, and managing product inventory, including stock status updates and image uploads via Cloudinary.
*   **Secure Payment Integration:** Integrated Stripe payment gateway for seamless and secure online transactions, supporting webhooks for payment verification.
*   **Responsive User Interface:** A dynamic and user-friendly frontend built with React 19, React Router for navigation, and styled with Tailwind CSS 4.x, ensuring a responsive experience across devices.
*   **API-Driven Backend:** A powerful backend developed with Node.js and Express.js 5.x, handling all core functionalities, data interactions with MongoDB (via Mongoose), and secure middleware.

## Technologies Used

**Frontend:**
*   **React 19:** For building the interactive user interface.
*   **React Router 7.x:** For client-side routing and navigation.
*   **Tailwind CSS 4.x:** For utility-first CSS styling and responsive design.
*   **Vite:** A fast build tool for development and optimized production builds.
*   **Axios:** For making HTTP requests to the backend API.

**Backend:**
*   **Node.js:** JavaScript runtime environment.
*   **Express.js 5.x:** A fast, unopinionated, minimalist web framework.
*   **MongoDB:** NoSQL database for flexible data storage.
*   **Mongoose:** ODM for MongoDB in Node.js.
*   **jsonwebtoken:** For implementing JWT-based authentication.
*   **bcryptjs:** For password hashing and security.
*   **cookie-parser:** Middleware for parsing cookies.
*   **cors:** Middleware for enabling Cross-Origin Resource Sharing.
*   **dotenv:** For loading environment variables.
*   **multer:** Middleware for handling `multipart/form-data`, primarily for file uploads.
*   **Stripe:** For payment processing.
*   **Cloudinary:** For cloud-based image storage and management.

**Deployment & Development Tools:**
*   **Vercel:** For deployment and continuous integration/delivery.
*   **ESLint:** For maintaining code quality and consistency.
*   **Nodemon:** (Development only) For automatic server restarts during development.
*   **Git:** For version control.
*   **Postman** For API Testing

## Getting Started

To get a copy of the project up and running on your local machine for development and testing purposes, follow these steps:

1.  **Clone the repository:**
    `git clone https://github.com/armanulhaq/zapp`
2.  **Navigate to the `client` directory and install dependencies:**
    `cd client && npm install`
3.  **Navigate to the `server` directory and install dependencies:**
    `cd ../server && npm install`
4.  **Set up environment variables:** Create a `.env` file in the `server` directory with your MongoDB URI, JWT secret, Cloudinary credentials, and Stripe keys.
5.  **Start the development servers:**
    *   For the client: `cd client && npm run dev`
    *   For the server: `cd server && npm run server`

---
