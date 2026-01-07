# Backend - E-book Management System

This is the backend API for the E-book Management System, built with Node.js, Express, and PostgreSQL.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL Database (NeonDB configured)

### Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure `.env` file (ensure DB_URL and SMTP credentials are set).

### Running

- **Development**:
    ```bash
    npm run dev
    ```

## 🧪 Test Users

The database has been seeded with the following test accounts:

| Role    | Email              | Password     | Description                |
| :------ | :----------------- | :----------- | :------------------------- |
| Student | `student@test.com` | `Password@123` | Can view books, notes, etc.|
| Teacher | `teacher@test.com` | `Password@123` | Can upload resources.      |
| Admin   | `admin@test.com`   | `Password@123` | Full access to Admin Panel.|

**Note**: All passwords are `Password@123`.

## 🛠️ Key Features

- **Authentication**: JWT-based auth (Login, Signup, Forgot Password).
- **User Management**: Profile updates, role-based access control (RBAC).
- **Resource Management**: Upload/View books (PDFs) and notes.
- **Email Service**: SMTP integration for welcome/reset emails.
- **Admin Panel API**: Statistics, user management, and resource oversight.

## 📂 Project Structure

- `src/controllers`: Request handlers.
- `src/routes`: API route definitions.
- `src/model`: Database models (PostgreSQL).
- `src/middleware`: Auth, error handling, validation.
- `src/config`: Environment and DB configuration.
