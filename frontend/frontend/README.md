# Frontend - EduHub (E-book Management System)

A modern educational resource management platform built with **React 18**, **Vite**, and **Tailwind CSS**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
# Create .env file with: VITE_API_URL=http://localhost:8080/api

# Run development server
npm run dev

# Build for production
npm run build
```

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Modern UI** | Glassmorphism design with smooth animations |
| **Authentication** | Login, Signup, OTP-based password reset |
| **Admin Dashboard** | User management, analytics, resource oversight |
| **User Dashboard** | Browse books, notes, trending content |
| **Profile Management** | View profile, delete account |
| **Responsive** | Optimized for all devices |

## 📁 Project Structure

```
src/
├── admin/          # Admin panel pages & components
├── components/     # Reusable UI components (Navbar, Cards)
├── pages/          # Main app pages (Home, Login, Profile)
├── services/       # API service functions
└── App.tsx         # Root component with routing
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8080/api` |

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build