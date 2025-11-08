const express = require('express');
const ClassSession = require('../models/ClassSession');
const Attendance = require('../models/Attendance');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// @route POST /api/attendance/mark
// @desc Student marks attendance using a session code (OTP)
// @access Private (Student only)
router.post('/mark', protect, async (req, res) => {
    if (req.user.role !== 'student') {
        return res.status(403).json({ message: 'Only students can mark attendance.' });
    }

    const { sessionCode } = req.body;
    const studentId = req.user._id;

    if (!sessionCode) {
        return res.status(400).json({ message: 'Session code is required.' });
    }

    try {
        // 1. Find the active session using the provided code
        const activeSession = await ClassSession.findOne({
            sessionCode: sessionCode,
            status: 'LIVE'
        });

        if (!activeSession) {
            return res.status(404).json({ message: 'Invalid or expired session code.' });
        }

        // 2. Check if the student has already marked attendance for this session
        const existingAttendance = await Attendance.findOne({
            session: activeSession._id,
            student: studentId
        });

        if (existingAttendance) {
            return res.status(400).json({ message: 'Attendance already marked for this session.' });
        }

        // 3. Mark the attendance
        await Attendance.create({
            session: activeSession._id,
            student: studentId,
            // Status could be set to LATE based on activeSession.startTime vs markedTime
            status: 'PRESENT'
        });

        // 4. Increment the total attendance count on the ClassSession model
        activeSession.totalAttendance += 1;
        await activeSession.save();

        res.json({
            message: `Attendance marked successfully for ${activeSession.course}!`,
            course: activeSession.course,
            totalAttendance: activeSession.totalAttendance
        });

    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ message: 'Server error during attendance marking.' });
    }
});

module.exports = router;