/**
 * Users Routes (Admin only)
 */
import express from 'express';
import User from '../model/user.model.mjs';
import asyncHandler from '../utils/asyncHandler.mjs';
import { protect, authorize } from '../middleware/auth.middleware.mjs';

const router = express.Router();

// NOTE: Ideally logic should be in a separate users.controller.mjs file 
// but porting logic directly here for now matching structure of original router content if it was mixed.
// Original file had logic inline. I will keep it inline here for simplicity unless it grows too big.

/**
 * @desc    Get all users with filtering
 * @route   GET /api/users
 * @access  Private/Admin
 */
router.get('/', protect, authorize('admin'), asyncHandler(async (req, res) => {
    const { role, search, page = 1, limit = 20 } = req.query;

    // Build query
    let query = {};

    if (role && ['student', 'teacher', 'admin'].includes(role)) {
        query.role = role;
    }

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    // Get total count for pagination
    const total = await User.countDocuments(query);

    // Fetch users (using helper that abstracts SQL OFFSET/LIMIT)
    const users = await User.findAll(query, (page - 1) * limit, parseInt(limit));

    // Remove sensitive data (manual in SQL or toJSON)
    const safeUsers = users.map(user => user.toJSON());

    res.status(200).json({
        success: true,
        count: safeUsers.length,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        users: safeUsers
    });
}));

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
router.get('/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.status(200).json({
        success: true,
        user: user.toJSON()
    });
}));

/**
 * @desc    Update user role/status
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
router.put('/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
    const { role, isVerified } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    // Update allowed fields
    if (role && ['student', 'teacher', 'admin'].includes(role)) {
        user.role = role;
    }
    if (typeof isVerified === 'boolean') {
        user.isVerified = isVerified;
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user: user.toJSON()
    });
}));

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
router.delete('/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
}));

/**
 * @desc    Get user stats by role
 * @route   GET /api/users/stats/roles
 * @access  Private/Admin
 */
router.get('/stats/roles', protect, authorize('admin'), asyncHandler(async (req, res) => {
    // Pipeline mimicked for DB
    const pipeline = [
        {
            $group: {
                _id: '$role',
                count: { $sum: 1 }
            }
        }
    ];

    const stats = await User.aggregate(pipeline);

    const formattedStats = {
        students: 0,
        teachers: 0,
        admins: 0,
        total: 0
    };

    stats.forEach(stat => {
        // user.model returns mapped string roles: 'student', etc.
        if (stat._id === 'student') formattedStats.students = stat.count;
        if (stat._id === 'teacher') formattedStats.teachers = stat.count;
        if (stat._id === 'admin') formattedStats.admins = stat.count;
        formattedStats.total += stat.count;
    });

    res.status(200).json({
        success: true,
        stats: formattedStats
    });
}));

export default router;
