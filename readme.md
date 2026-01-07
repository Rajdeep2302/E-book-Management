# 📚 EduHub - E-book Management System

A comprehensive platform designed for academic communities to share, discover, and access educational resources.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react) ![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=node.js) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)

---

## � Overview

Whether you're a student looking for study materials or an educator wanting to share your knowledge, this platform provides a seamless experience for managing books, notes, and study resources.

### Key Highlights

- 📖 **Resource Library** - Browse and search through curated books and notes
- 📤 **Easy Upload** - Share your study materials with the community
- 👥 **Role-Based Access** - Student, Teacher, and Admin roles with appropriate permissions
- 🔐 **Secure Authentication** - JWT-based authentication with email verification
- 🎨 **Modern UI** - Beautiful, responsive design with dark theme
- 👀 **Preview Mode** - Users can view 30% of any PDF without login

---

## ✨ Features

### For Students
| Feature | Description |
|---------|-------------|
| 🔍 **Search & Discover** | Find books and notes by category, subject, or keyword |
| 📚 **Browse Collections** | Explore recommended books and trending notes |
| 📝 **Upload Resources** | Share your study notes with fellow students |
| 💬 **Community Discussions** | Engage in academic discussions |

### For Teachers
| Feature | Description |
|---------|-------------|
| 📖 **Share Materials** | Upload books and lecture notes |
| 📊 **Track Contributions** | Monitor your shared resources |
| ✅ **Review PDFs** | Can review and approve uploaded PDFs |

### For Administrators
| Feature | Description |
|---------|-------------|
| 👥 **User Management** | View, edit, and manage all users |
| 📚 **Content Moderation** | Manage books, notes, and question papers |
| 📈 **Dashboard Analytics** | View platform statistics and user metrics |
| ⚙️ **System Configuration** | Manage platform settings |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Library |
| **TypeScript** | 5.9.3 | Type Safety |
| **Vite** | Latest | Build Tool & Dev Server |
| **Tailwind CSS** | 4.1.18 | Styling |
| **React Router DOM** | 7.11.0 | Client-Side Routing |
| **Lucide React** | 0.562.0 | Icons |
| **React Toastify** | 11.0.5 | Notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | ≥18.0.0 | Runtime Environment |
| **Express** | 5.2.1 | Web Framework |
| **PostgreSQL** | 16+ | Database |
| **JWT** | 9.0.3 | Authentication |
| **Bcrypt** | 6.0.0 | Password Hashing |
| **Nodemailer** | 7.0.12 | Email Service |
| **Helmet** | 8.1.0 | Security Headers |
| **Multer** | 2.0.2 | File Uploads |
| **Python Fitz** | - | PDF validation (blank, corrupted, password-protected) & previews |

---

## 👤 User Roles

| Role | Code | Permissions |
|------|------|-------------|
| **Student** | 0 | Browse resources, upload notes, view discussions |
| **Teacher** | 1 | All student permissions + upload books, review PDFs |
| **Admin** | 2 | Full access including user management |

---

## 📁 Project Structure

```
E-book-Management/
├── 📂 frontend/                    # React Frontend Application
│   ├── 📂 src/
│   │   ├── 📂 admin/               # Admin Panel
│   │   │   ├── 📂 components/      # Admin UI components
│   │   │   └── 📂 pages/           # Dashboard, Users, Books, Notes
│   │   ├── 📂 components/          # Shared UI components
│   │   │   ├── Navbar.tsx          # Navigation bar
│   │   │   ├── ProtectedRoute.tsx  # Route guards
│   │   │   └── ...
│   │   ├── 📂 pages/               # Main app pages
│   │   │   ├── Home.tsx            # Landing page
│   │   │   ├── 📂 Users/           # User pages
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Signup.tsx
│   │   │   │   ├── ForgotPassword.tsx
│   │   │   │   └── ProfilePage.tsx
│   │   │   └── ...
│   │   ├── 📂 services/            # API service layer
│   │   │   └── authService.ts      # Authentication API calls
│   │   ├── App.tsx                 # Root component with routing
│   │   └── main.tsx                # Entry point
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── README.md                   # Frontend documentation
│
├── 📂 backend/                     # Node.js Backend API
│   ├── 📂 src/
│   │   ├── 📂 config/              # Configuration
│   │   │   ├── db.mjs              # PostgreSQL connection
│   │   │   └── env.mjs             # Environment variables
│   │   ├── � controllers/         # Request handlers
│   │   │   ├── auth.controller.mjs # Auth (login, signup, reset)
│   │   │   └── user.controller.mjs # User management
│   │   ├── 📂 middleware/          # Express middleware
│   │   │   ├── auth.middleware.mjs # JWT verification
│   │   │   └── error.middleware.mjs
│   │   ├── 📂 model/               # Database models
│   │   │   └── user.model.mjs      # User model (PostgreSQL)
│   │   ├── 📂 routes/              # API routes
│   │   │   ├── auth.routes.mjs     # /api/auth/*
│   │   │   └── users.routes.mjs    # /api/users/*
│   │   ├── 📂 mail/                # Email templates
│   │   │   ├── otpMail.mjs         # OTP email template
│   │   │   └── regstrationSuccesfull.mjs
│   │   └── 📂 utils/               # Utilities
│   │       ├── sendEmail.mjs       # SMTP email sender
│   │       └── asyncHandler.mjs
│   ├── 📂 scripts/                 # Database scripts
│   │   ├── seedUsers.mjs           # Seed test users
│   │   └── clearOtp.mjs            # Clear OTP data
│   ├── server.mjs                  # Entry point
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── README.md                   # Backend documentation
│
└── README.md                       # This file
```

---

## � Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL 16+
- Git

### Installation

```bash
# Clone repository
git clone <repo-url>
cd E-book-Management

# Backend setup
cd backend
npm install
# Configure .env (see backend/README.md)
node server.mjs

# Frontend setup (new terminal)
cd frontend
npm install
# Configure .env with VITE_API_URL
npm run dev
```

### Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | `student@test.com` | `Password@123` |
| Teacher | `teacher@test.com` | `Password@123` |
| Admin | `admin@test.com` | `Password@123` |

---

## 🔮 Future Vision

- 📱 **Mobile App** - Native iOS/Android application
- 🏫 **College Communities** - Teachers can create college-specific communities
- 🤝 **Collaboration** - Real-time study groups and discussions
- 🪙 **Token System** - Enhanced reputation and rewards system

#### 🏆 Reputation & Token System

Users earn reputation points based on their contributions:

| Action | Points |
|--------|--------|
| 📖 Book Uploaded | 50 points |
| 📝 Note Shared | 20 points |
| ❤️ Likes/Upvotes Received | 10 points |

---

## 📖 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

---

## 📄 License

MIT License © 2026
