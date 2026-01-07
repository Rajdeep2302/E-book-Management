# Frontend - E-book Management System

This is the frontend application for the E-book Management System, built with **React**, **Vite**, and **Tailwind CSS**.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure `.env` file (ensure `VITE_API_URL` points to backend).

### Running

- **Development**:
    ```bash
    npm run dev
    ```
- **Build**:
    ```bash
    npm run build
    ```

## 🛠️ Features

- **Modern UI**: Built with Tailwind CSS and Framer Motion (assumed) for smooth animations.
- **Admin Dashboard**: Comprehensive panel to manage users, books, and notes.
- **User Dashboard**: Browse resources, view trending notes, and recommended books.
- **Profile Management**: View stats, update profile (photo coming soon), and delete account.
- **Responsive Design**: Fully optimized for mobile and desktop.

## 📂 Project Structure

- `src/components`: Reusable UI components (Buttons, Navbar, Cards).
- `src/pages`: Page views (Home, Login, Profile, etc.).
- `src/services`: API service functions (auth, resources).
- `src/admin`: Admin-specific layouts and pages.
- `src/context` / `src/store`: State management (if applicable).
