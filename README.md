# 🌍 Tour App  

A full-stack web application for managing and booking tours. The platform allows users to explore tours, view details, make bookings, and submit reviews. Admins can manage tours, bookings, reviews, and users.  

---

## ✨ Features  

### 👤 Authentication & Authorization  
- User registration & login (JWT authentication with refresh tokens in HTTP-only cookies)  
- Secure session management with device & IP tracking  
- Email verification & password reset flows  
- Role-based access (user, admin)  

### 🏞️ Tours  
- Add, update, delete, and view tours  
- Upload & optimize tour images (using **Multer + Sharp**)  
- Tour ratings & reviews  
- Automatic cleanup of related bookings, reviews, and payments when deleting a tour  

### 📅 Bookings  
- Book tours with real-time availability  
- View user booking history  
- PDF booking receipt generation  
- Payment handled by **cash only**  

### 📊 Analytics  
- Top Tours by Bookings & Revenue  
- Average ratings per tour  
- Occupancy and performance metrics  

### 🎨 Frontend (React App)  
- Multi-step forms (React Hook Form + Zod + Redux Toolkit/Zustand)  
- Protected routes & persistent login  
- ShadCN + TailwindCSS for UI  
- Axios interceptors for secure API requests  
- Dashboard with charts & tables  

---

## 🛠️ Tech Stack  

### **Frontend**  
- ⚛️ React (Vite + TypeScript)  
- 🧩 Redux Toolkit / Zustand (state management)  
- 🎯 React Hook Form + Zod (form handling & validation)  
- 🎨 TailwindCSS + ShadCN (UI & styling)  
- 📡 Axios (API requests with interceptors)  

### **Backend**  
- 🟢 Node.js + Express  
- 🍃 MongoDB + Mongoose (database & models)  
- 🔑 JWT (access & refresh tokens)  
- 📂 Multer + Sharp (image uploads & optimization)  
- 💵 Cash payment handling  
- 📄 PDF generation (ReportLab / pdfkit)  

### **Dev Tools & Others**  
- ESLint + Prettier (code quality)  
- Path aliases (`@/features/...`)  
- Nodemon / ts-node for backend dev  

---

## ⚙️ Installation & Setup  

### 1. Clone the repo  
git clone https://github.com/yourusername/tour-app.git
cd tour-app

### 2. Backend Setup
cd backend
npm install
cp .env.example .env   # Add MongoDB URI, JWT secrets, etc.
npm run dev

### 2. Frontend Setup
cd frontend
npm install
npm run dev


## Roadmap / Next Steps

✅ Multi-device session management

✅ Cash payments support

🚧 Notifications (email & in-app)

🚧 Multi-language support

🚧 Mobile app (React Native)


