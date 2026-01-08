import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.mjs";
import userRoutes from "./routes/user.routes.mjs";
import authRoutes from "./routes/auth.routes.mjs";
import usersRoutes from "./routes/users.routes.mjs";
import { logger } from "./middleware/logger.mjs";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// ===================
// Root Route
app.get("/", (req, res) => {
  res.status(200).send("<h1>Backend Server Running</h1>");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadsRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
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
