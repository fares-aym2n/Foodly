# 🍔 Foodly — Food Delivery REST API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-24+-green.svg)
![Express](https://img.shields.io/badge/Express-5-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-brightgreen.svg)

**A RESTful API for a Food Delivery Application**

</div>

---

## 🎯 About

**Foodly** is a RESTful API for a food delivery application built with **Node.js, Express, MongoDB, and Mongoose**.

The application allows users to browse restaurants, categories, and food items with authentication and authorization.

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Role-based authorization
- ✅ Password hashing with bcrypt
- ✅ Secure authentication cookies

### 👤 Users
- ✅ User signup and login
- ✅ Upload user profile image

### 🏪 Restaurants
- ✅ Create restaurant
- ✅ Get all restaurants
- ✅ Get restaurant by ID
- ✅ Update restaurant
- ✅ Delete restaurant

### 🍽️ Categories
- ✅ Create category
- ✅ Get all categories
- ✅ Get category by ID
- ✅ Update category
- ✅ Delete category

### 🍔 Food
- ✅ Create food
- ✅ Get all food items
- ✅ Get food by ID
- ✅ Update food
- ✅ Delete food
- ✅ Connect food items with restaurants and categories

---

## 🛠 Tech Stack

**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT, bcrypt  
**File Upload:** Multer  
**API Testing:** Postman

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://
cd Natours
```

### 2. Install

```bash
npm install

```

### 3. Set Up Environment Variables

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=<your MongoDB connection string>
JWT_SECRET=<your jwt secret>

```

### 4. Run (development)

```bash
npm start
```

### 5. Production Mode

```bash
npm run start:prod
```
---

## 🧭 Project Structure (short)
```bash
Foodly/
├─ controllers/
├─ models/
├─ routes/
├─ middleware/
├─ uploads/
├─ utils/
├─ index.js
└─ README.md
```

## 👤 Author

**Fares Ayman**

- GitHub: [Fares Ayman](https://github.com/fares-ayman100)
- Email: fareshe73@gmail.com

---

<div align="center">

Made with ❤️ and 🌍

⭐ Star this repo if you find it helpful!

</div>


