import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import env from "./config/env.mjs";

import authRoutes from "./routes/auth.routes.mjs";
import usersRoutes from "./routes/users.routes.mjs";
import { notFound, errorHandler } from "./middleware/error.middleware.mjs";

const app = express();

// ===================
// Security Middleware
// ===================
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true
}));

// ===================
// Body Parsers
// ===================
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// ===================
// Root Route
// ===================
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'E-book Management API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users'
    }
  });
});

// ===================
// Health Check
// ===================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV
  });
});

// ===================
// API Routes
// ===================
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

// ===================
// Error Handling
// ===================
app.use(notFound);
app.use(errorHandler);

export default app;
