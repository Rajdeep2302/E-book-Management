import env from '../config/env.mjs';

/**
 * Custom Error Class
 */
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Not Found Handler (404)
 */
export const notFound = (req, res, next) => {
    const error = new AppError(`Route not found: ${req.originalUrl}`, 404);
    next(error);
};

/**
 * Global Error Handler
 */
export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error for development (skip 404s as they're expected for browser requests)
    if (env.NODE_ENV === 'development' && err.statusCode !== 404) {
        console.error('❌ Error:', err);
    }

    // Postgres Duplicate Key (code 23505) - Handled in User model as 11000 or here
    // If User model throws standard error with code 11000 (mimicked)
    if (err.code === 11000) {
        // const field = Object.keys(err.keyValue)[0];
        // Simple replacement
        const message = 'Duplicate field value entered';
        error = new AppError(message, 400);
    }

    // JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token. Please log in again.';
        error = new AppError(message, 401);
    }

    // JWT Expired
    if (err.name === 'TokenExpiredError') {
        const message = 'Token has expired. Please log in again.';
        error = new AppError(message, 401);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        ...(env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
