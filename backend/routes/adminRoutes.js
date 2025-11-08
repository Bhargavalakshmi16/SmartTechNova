const express = require('express');
const protect = require('../middleware/authMiddleware');
const User = require('../models/User');
const ClassSession = require('../models/ClassSession');
const Timetable = require('../models/Timetable');
const Attendance = require('../models/Attendance');
const Syllabus = require('../models/Syllabus');

const router = express.Router();

// Middleware to restrict access to Admin role
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin.' });
    }
};

// @route GET /api/admin/users
// @desc Get all users (for User Management table)
// @access Private (Admin only)
router.get('/users', protect, admin, async (req, res) => {
    try {
        // Fetch users, excluding sensitive data like password
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error fetching users.' });
    }
});

// @route GET /api/admin/analytics
// @desc Get complex data for Admin Dashboard charts and metrics
// @access Private (Admin only)
router.get('/analytics', protect, admin, async (req, res) => {
    try {
        // --- 1. Top Metrics ---
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalFaculty = await User.countDocuments({ role: 'faculty' });
        const activeClasses = await ClassSession.countDocuments({ status: 'LIVE' });

        // --- 2. Attendance Trends Mock (For charts) ---
        // In a real app, this would query the Attendance collection
        const attendanceTrends = [
            { month: 'Jan', percentage: 82 },
            { month: 'Feb', percentage: 85 },
            { month: 'Mar', percentage: 88 },
            { month: 'Apr', percentage: 86 },
        ];

        // --- 3. Syllabus Status ---
        // Calculate progress based on mock data
        const allSyllabus = await Syllabus.find({}).select('courseName department totalTopics completedTopics');
        const syllabusStatus = allSyllabus.map(s => ({
            course: s.courseName,
            department: s.department,
            progress: (s.completedTopics / s.totalTopics) * 100,
            status: s.status,
            threshold: s.alertThreshold
        }));

        res.json({
            metrics: {
                totalStudents,
                totalFaculty,
                activeClasses,
                avgAttendance: 85, // Mock average
                response_time: 1.2, // Mock metric
            },
            attendanceTrends,
            syllabusStatus
        });

    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Server error fetching analytics.' });
    }
});

module.exports = router;