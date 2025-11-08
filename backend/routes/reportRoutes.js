const express = require('express');
const protect = require('../middleware/authMiddleware');
const Attendance = require('../models/Attendance');
const ClassSession = require('../models/ClassSession');
const User = require('../models/User');

const router = express.Router();

// @route GET /api/reports/faculty/sessions
// @desc Get history of all completed classes for a faculty member (For Faculty Reports tab)
// @access Private (Faculty only)
router.get('/faculty/sessions', protect, async (req, res) => {
    if (req.user.role !== 'faculty') {
        return res.status(403).json({ message: 'Not authorized to view these reports.' });
    }

    try {
        const sessions = await ClassSession.find({
            faculty: req.user._id,
            status: 'COMPLETED'
        })
            .sort({ startTime: -1 }) // Newest first
            .select('course startTime endTime totalAttendance sessionCode');

        const formattedSessions = sessions.map(session => {
            const date = session.startTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            return {
                sessionName: session.course,
                date: date,
                attendance: session.totalAttendance,
                status: 'Completed'
            };
        });

        res.json(formattedSessions);
    } catch (error) {
        console.error('Error fetching faculty reports:', error);
        res.status(500).json({ message: 'Server error fetching reports.' });
    }
});

// @route GET /api/reports/student/attendance
// @desc Get student's subject-wise attendance percentage (For Student Reports/Overview)
// @access Private (Student only)
router.get('/student/attendance', protect, async (req, res) => {
    if (req.user.role !== 'student') {
        return res.status(403).json({ message: 'Not authorized to view these reports.' });
    }

    try {
        // --- Mock Logic for Demonstration ---
        // In a real system, this would calculate: (Attendance records for student) / (Total sessions held for their class)

        const attendanceData = [
            { subject: 'Data Structures', totalClasses: 20, attended: 17, percentage: 85 },
            { subject: 'Web Development', totalClasses: 20, attended: 13, percentage: 65 }, // Low attendance example
            { subject: 'Deep Learning', totalClasses: 15, attended: 14, percentage: 93 },
        ];

        const overallPercentage = (attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length).toFixed(1);

        res.json({
            overallPercentage: overallPercentage + '%',
            attendanceList: attendanceData,
            lowAttendanceAlert: attendanceData.filter(a => a.percentage < 75)
        });

    } catch (error) {
        console.error('Error fetching student reports:', error);
        res.status(500).json({ message: 'Server error fetching reports.' });
    }
});

module.exports = router;