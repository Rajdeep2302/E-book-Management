import express from "express";
import userRoutes from "./routes/user.routes.mjs";
import { logger } from "./middleware/logger.mjs";

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
app.get("/", (req, res) => {
  res.status(200).send("<h1>Backend Server Running</h1>");
});

// Routes
app.use("/api/users", userRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
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
