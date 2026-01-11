import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.mjs";
import userRoutes from "./routes/user.routes.mjs";
import uploadRoutes from "./routes/upload.routers.mjs";
import authRoutes from "./routes/auth.routes.mjs";
import usersRoutes from "./routes/users.routes.mjs";
import { logger } from "./middleware/logger.mjs";
import { notFound, errorHandler } from "./middleware/error.middleware.mjs";

const app = express();

// ===================
// Security Middleware
// ===================
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL || 'http://localhost:5173',
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
app.get("/", (req, res) => {
  res.status(200).send("<h1>Backend Server Running</h1>");
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
app.use('/api/upload', uploadRoutes);

// ===================
// Error Handling
// ===================
app.use(notFound);
app.use(errorHandler);

export default app;
