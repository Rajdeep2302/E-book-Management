/**
 * Authentication Controller
 * Handles signup, login, and password reset
 */
import crypto from 'crypto';
import User from '../model/user.model.mjs';
import asyncHandler from '../utils/asyncHandler.mjs';
import { sendEmail, getWelcomeEmailHTML, getResetPasswordEmailHTML } from '../utils/sendEmail.mjs';
import { AppError } from '../middleware/error.middleware.mjs';
import env from '../config/env.mjs';

/**
 * @desc    Register new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const signup = asyncHandler(async (req, res, next) => {
    // Added institute, department, phone to destructuring
    const { name, email, password, role, institute, department, phone } = req.body;

    if (!institute) {
        return next(new AppError('Institute is required', 400));
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return next(new AppError('Password must be at least 8 characters with uppercase, lowercase, and a number', 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError('This email is already registered. Please login instead.', 400));
    }

    // Create user (auto-verified logic preserved from forked)
    const user = await User.create({
        name,
        email,
        password,
        role: role || 'student', // string role, model converts to int
        isVerified: true,
        institute,
        department,
        phone
    });

    // Send welcome email
    const loginUrl = `${env.FRONTEND_URL}/login`;

    try {
        await sendEmail({
            to: user.email,
            subject: '🎓 Welcome to EduHub - Account Created!',
            text: `Welcome ${user.name}! Your account has been created with email: ${email}. Login at: ${loginUrl}`,
            html: getWelcomeEmailHTML(user.name, user.email, loginUrl)
        });
        console.log(`📧 Welcome email sent to ${email}`);
    } catch (error) {
        console.log(`⚠️ Could not send welcome email to ${email}:`, error.message);
    }

    res.status(201).json({
        success: true,
        message: 'Account created successfully! You can now log in.'
    });
});


/**
 * @desc    Verify email address
 * @route   GET /api/auth/verify-email/:token
 * @access  Public
 */
export const verifyEmail = asyncHandler(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: new Date() } // Date object for Postgres check
        // Note: User.findOne logic handles date check in SQL usually, 
        // but our implementation has special handling for token objects.
    });

    if (!user) {
        return next(new AppError('Invalid or expired verification token', 400));
    }

    user.isVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpiry = null;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Email verified successfully! You can now log in.'
    });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError('Invalid email or password', 401));
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new AppError('Invalid email or password', 401));
    }

    if (!user.isVerified) {
        return next(new AppError('Please verify your email before logging in', 401));
    }

    // Generate JWT
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, // "student" etc.
            institute: user.institute
        }
    });
});

/**
 * @desc    Get current logged-in user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            institute: user.institute,
            createdAt: user.createdAt
        }
    });
});

/**
 * @desc    Forgot password - send reset email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError('No account found with this email. Please sign up first.', 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `${env.FRONTEND_URL}/reset-password/${resetToken}`;

    try {
        await sendEmail({
            to: user.email,
            subject: '🔐 EduHub Password Reset Request',
            text: `Reset your password by clicking: ${resetUrl}`,
            html: getResetPasswordEmailHTML(user.name, resetUrl)
        });

        res.status(200).json({
            success: true,
            message: 'Password reset email sent'
        });
    } catch (error) {
        user.resetPasswordToken = null;
        user.resetPasswordExpiry = null;
        await user.save();

        return next(new AppError('Email could not be sent', 500));
    }
});

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res, next) => {
    const { password } = req.body;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return next(new AppError('Password must be at least 8 characters with uppercase, lowercase, and a number', 400));
    }

    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpiry: { $gt: new Date() }
    });

    if (!user) {
        return next(new AppError('Invalid or expired reset token', 400));
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password reset successful. You can now log in with your new password.'
    });
});

/**
 * @desc    Change password (for logged-in users)
 * @route   POST /api/auth/change-password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        return next(new AppError('New password must be at least 8 characters with uppercase, lowercase, and a number', 400));
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
        return next(new AppError('Current password is incorrect', 401));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password changed successfully!'
    });
});
