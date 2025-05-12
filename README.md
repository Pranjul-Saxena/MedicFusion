# MedicFusion - Healthcare Management System (MERN Stack)

## 📌 Project Overview
**MedicFusion** is a **MERN-based SaaS Healthcare Management System** designed to streamline clinic operations. It offers **role-based access** for **SuperAdmin, Doctors, and Receptionists** to manage **appointments, patient records, and doctor references efficiently.**
  

## 🚀 Features
✅ **Role-Based Access Control (RBAC)**  
✅ **SuperAdmin Panel** - Manage users, doctors, and clinic settings  
✅ **Doctor Management** - View schedules, track patient history  
✅ **Receptionist Portal** - Register patients, book appointments  
✅ **Patient Management** - Store, update, and fetch patient records dynamically  
✅ **Appointment Booking** - Real-time booking and management  
✅ **Doctor Reference Tracking** - Assign and track patient referrals  
✅ **Dynamic Search** - Search for patients and doctors efficiently  
✅ **Optimized UI/UX** - Built with Tailwind CSS & React  
✅ **Secure Authentication & API Handling**  


## **🔹 Detailed Key Features & Functionalities**

### **1️⃣ Role-Based Access Control (RBAC)**

- **SuperAdmin**
    - Manages clinics, doctors, and receptionists.
    - Oversees overall system functionality.
- **Receptionist**
    - Books appointments based on patient calls.
    - Searches patients dynamically before adding new records.
    - Assigns doctors based on availability.
- **Doctor**
    - Views assigned appointments and patient details.
    - Tracks patient referrals.

### **2️⃣ Patient Management System**

✔ **Dynamic Search:** Search patients by name or contact number (Optimized for large datasets).

✔ **CRUD Operations:** Receptionists can **Add, Edit, View, and Delete** patient records.

✔ **Doctor Reference Selection:** Fetches and displays a clinic’s doctors dynamically.

### **3️⃣ Appointment Booking System**

✔ **Real-Time Patient Search:** Receptionists can quickly find and select existing patients.

✔ **Doctor Selection:** Doctors can be searched and selected with frontend filtering.

✔ **Date & Time Selection:** Ensures proper scheduling.

✔ **Backend Integration:** Uses `createAsyncThunk` for API calls.

### **4️⃣ Tech Stack Used**

### **⚙ Backend (Server-Side)**

- **Node.js & Express.js** – RESTful API development.
- **MongoDB (Mongoose ODM)** – Database to store patient, doctor, and appointment details.
- **JWT Authentication** – Secure login for different roles.
- **Bcrypt.js** – Password hashing for user security.
- **Multer & Cloudinary** – Handles image/file uploads if needed.
- **Error Handling & Validations** – Ensures data integrity.

### **🎨 Frontend (Client-Side)**

- **React.js** – Interactive UI for role-based access.
- **Redux Toolkit (`createAsyncThunk`)** – Manages API calls & state efficiently.
- **Tailwind CSS** – Ensures a responsive and modern UI.
- **React-Hot-Toast** – Displays success/error messages.
- **React-Router** – Handles navigation across pages.

### **5️⃣ API Integration & Testing**

- **Postman** – Used for testing all patient-related routes (`Add, Get, Update, Delete`).
- **Success/Error Handling** – Ensures smooth operations & feedback.

## **🛠 Optimizations & Best Practices**

✅ **Efficient Data Fetching** – Uses **dynamic fetching** for patient data and **frontend filtering** for doctors.

✅ **Search Box Instead of Dropdowns** – Improves performance for large datasets.

✅ **Role-Based Dashboard Access** – Ensures only authorized users access specific data.

✅ **Scalability & Security** – Uses modern authentication and database indexing.

## 🏗️ Tech Stack
### 🔹 **Frontend**
- React.js ⚛️  
- Redux Toolkit  
- Tailwind CSS  
- React Router  
- React-Hot-Toast (for notifications)  

### 🔹 **Backend**
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication
  
### 🔹 **Tools & Libraries**
- Postman (API Testing)  
- Git & GitHub (Version Control)  
- dotenv (Environment Variables)  

