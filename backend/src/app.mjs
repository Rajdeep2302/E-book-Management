import express from "express";
import userRoutes from "./routes/user.routes.mjs";
import uploadsRouter from "./routes/upload.routers.mjs";
import { logger } from "./middleware/logger.mjs";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);


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

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;
