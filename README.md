#  Inventory Management System

A modern **full-stack Inventory Management System** built with **React, TypeScript, Node.js, Express, and MongoDB** following clean architecture principles. The application provides secure authentication and complete product management with a responsive and user-friendly interface.

---

## Features

###  Authentication
- User Registration
- User Login
- JWT Authentication
- Refresh Token Authentication
- Protected Routes
- Secure Logout
- Axios Authentication Interceptors

###  Product Management
- Create Product
- View Products
- Update Product
- Delete Product
- Product Search
- Client-side Pagination
- Empty State UI
- Loading Skeletons
- Delete Confirmation Dialog

###  User Interface
- Responsive Design
- Modern Dashboard
- Error Boundaries
- Toast Notifications
- Loading Indicators
- Empty States
- Form Validation

### 🛠 Developer Experience
- TypeScript
- ESLint
- Prettier
- Repository Pattern
- Modular Folder Structure
- Environment Configuration

---

# 🏗 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- React Hook Form
- Zod
- Tailwind CSS

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

---

# Project Structure

```
inventory-management/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   └── main.tsx
│
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/thanveerathasni/inventory-management.git
```

```bash
cd inventory-management
```

---

# Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRES=15m

REFRESH_TOKEN_EXPIRES=7d
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_BASE_URL=http://localhost:5000
```

Run frontend

```bash
npm run dev
```

---

#  Authentication Flow

```
Register
      │
      ▼
Login
      │
      ▼
Access Token
      │
      ▼
Protected Routes
      │
      ▼
Expired Token
      │
      ▼
Refresh Token
      │
      ▼
New Access Token
```

---

#  Product Flow

```
Create Product

        │

        ▼

View Products

        │

        ▼

Search Products

        │

        ▼

Update Product

        │

        ▼

Delete Product
```

---

#  Scripts

## Backend

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

---

## Frontend

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```



#  Security

- Password hashing using bcrypt
- JWT Authentication
- Refresh Token mechanism
- Protected API Routes
- Axios Authorization Interceptors
- Environment Variables

---

#  Future Improvements

- User Roles (Admin/User)
- Inventory Analytics Dashboard
- Image Uploads
- Barcode Support
- Category Management
- Stock Notifications
- Unit Testing
- Docker Support
- CI/CD Pipeline

---

#  Author

**Thanveera thasni**

GitHub

https://github.com/thanveerathasni
---


