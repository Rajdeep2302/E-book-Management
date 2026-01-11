/**
 * Authentication Routes
 */
import express from 'express';
import rateLimit from 'express-rate-limit';
import {
    signup,
    verifyEmail,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    changePassword,
    deleteMe
} from '../controllers/auth.controller.mjs';
import { protect } from '../middleware/auth.middleware.mjs';

const router = express.Router();

// Rate limiter for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        message: 'Too many requests. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Public routes with rate limiting
router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.post('/change-password', protect, changePassword);
router.delete('/me', protect, deleteMe);

export default router;
