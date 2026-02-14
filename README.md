# Valdio - E-Commerce Application

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Valdio** (RJN_SHOPS) is a robust, full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It powers the **valdio.in** platform, featuring a modern, responsive frontend and a scalable backend architecture, designed to provide a seamless shopping experience.

---

## Features

### Frontend (Client-Side)
- **Modern UI/UX**: Built with **React 19** and **Tailwind CSS v4** for a sleek, responsive design.
- **Dynamic Routing**: Utilizes **React Router DOM 7** for seamless navigation.
- **Interactive Elements**: Enhanced with **Framer Motion** for animations and **AOS** for scroll effects.
- **State Management**: efficient data handling with React Context/Hooks.
- **Key Pages**:
  - Home Page with dynamic product showcases.
  - Product Listing & Filtering.
  - Product Details with reviews.
  - Shopping Cart & Favorites management.

### Backend (Server-Side)
- **RESTful API**: Powered by **Node.js** and **Express**.
- **Database**: **MongoDB** with **Mongoose** for schema-based data modeling.
- **Security**: CORS enabled and environment variable management with Dotenv.
- **Controllers**: modular logic for Products, Users, and Orders.

---

## 🛠️ Tech Stack

### Frontend
*   ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React 19**
*   ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white) **Vite**
*   ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS v4**
*   ![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white) **Material UI**
*   **Lucide React** (Icons)
*   **Framer Motion** (Animations)

### Backend
*   ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) **Node.js**
*   ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) **Express.js**
*   ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB**
  

---

## 📂 Project Architecture

The project is organized into two main synchronized directories:

```graphql
RJN_SHOPS/
├── backend/                # Server-side logic
│   ├── config/             # DB connection & env setup
│   ├── controllers/        # Route logic (Products, Users, etc.)
│   ├── middleware/         # Auth & Error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API Endpoints
│   └── server.js           # Entry point
│
├── frontend/               # Client-side application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state
│   │   ├── hooks/          # Custom React hooks
│   │   ├── Pages/          # Application views (Home, Cart, etc.)
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── index.html          # HTML template
│
└── README.md               # Project documentation
```

---

## 📸 Screenshots

<!-- 
    TODO: Add screenshots of your application here. 
    Example format: ![Alt Text](url-to-image) 
-->

### Landing Page
> <img width="1920" height="1080" alt="Screenshot (2537)" src="https://github.com/user-attachments/assets/88e8a80a-0845-4ca2-bb9d-ed2b32a7770c" />


### Product Details
> <img width="1920" height="1080" alt="Screenshot (2539)" src="https://github.com/user-attachments/assets/fe3430eb-909b-4729-9c12-fcbfa3afecd2" />


### Shopping Cart
> <img width="1920" height="1080" alt="Screenshot (2541)" src="https://github.com/user-attachments/assets/73e919a8-2de0-459f-b9c3-022d4d0582e6" />


---

## ⚡ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
*   **Node.js** (v18+ recommended)
*   **MongoDB** (Local or Atlas connection string)
*   **Git**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Ankit1141192/RJN_SHOPS.git
    cd RJN_SHOPS
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    *   Create a `.env` file in the `backend/` directory:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```
    *   Start the server:
        ```bash
        npm start
        ```

3.  **Frontend Setup**
    *   Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    npm install
    ```
    *   Start the development server:
    ```bash
    npm run dev
    ```

4.  **Access the App**
    *   Frontend: `http://localhost:5173`
    *   Backend API: `http://localhost:5000`

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for any improvements or bug fixes.

## 📄 License

This project is licensed under the MIT License.
