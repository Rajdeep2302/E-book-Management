import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.mjs';
import User from '../model/user.model.mjs';
import env from '../config/env.mjs';

/**
 * Protect routes - Verify JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route. No token provided.'
        });
    }

    try {
        // Verify token (Synchronous verify, wraps in try-catch)
        const decoded = jwt.verify(token, env.JWT_SECRET);

        // Attach user to request
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Token is invalid.'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized. Token is invalid or expired.'
        });
    }
});

/**
 * Authorize specific roles
 * @param  {...string} roles - Allowed roles (e.g., 'admin', 'teacher')
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role '${req.user.role}' is not authorized to access this route.`
            });
        }
        next();
    };
};
