const express = require('express');
const ClassSession = require('../models/ClassSession'); // <-- CRITICAL: Model Import
const Timetable = require('../models/Timetable');       // <-- CRITICAL: Model Import
const protect = require('../middleware/authMiddleware'); // <-- CRITICAL: Middleware Import

const router = express.Router();

// Utility function to generate a 6-digit session code (OTP)
const generateSessionCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// @route POST /api/classes/start
// @desc Faculty starts a new live class session
// @access Private (Faculty only)
router.post('/start', protect, async (req, res) => {
    if (req.user.role !== 'faculty') {
        return res.status(403).json({ message: 'Not authorized to start a class.' });
    }

    const { classId } = req.body;

    try {
        const existingLiveSession = await ClassSession.findOne({
            faculty: req.user._id, // Uses the real logged-in user's MongoDB ID
            status: 'LIVE'
        });

        if (existingLiveSession) {
            return res.status(400).json({ message: `You are already teaching: ${existingLiveSession.course} (Room ${existingLiveSession.room}). End previous session first.` });
        }

        const timetableEntry = await Timetable.findOne({
            classId: classId,
            faculty: req.user._id // Ensures the faculty is assigned to this course
        });

        if (!timetableEntry) {
            return res.status(404).json({ message: 'Timetable entry not found or you are not assigned to this course.' });
        }

        const sessionCode = generateSessionCode();
        const newSession = await ClassSession.create({
            timetableId: timetableEntry._id,
            faculty: req.user._id,
            course: timetableEntry.course,
            room: timetableEntry.schedule[0].room,
            startTime: new Date(),
            sessionCode: sessionCode,
            status: 'LIVE'
        });

        res.status(201).json({
            message: 'Session started successfully.',
            session: {
                sessionId: newSession._id,
                course: newSession.course,
                room: newSession.room,
                sessionCode: newSession.sessionCode,
                startTime: newSession.startTime,
            }
        });

    } catch (error) {
        console.error('Error starting session:', error);
        res.status(500).json({ message: 'Server error starting session.' });
    }
});

// @route POST /api/classes/end
// @desc Faculty ends a live class session
// @access Private (Faculty only)
router.post('/end', protect, async (req, res) => {
    if (req.user.role !== 'faculty') {
        return res.status(403).json({ message: 'Not authorized to end a class.' });
    }

    const { sessionId } = req.body;

    try {
        const session = await ClassSession.findOne({
            _id: sessionId,
            faculty: req.user._id,
            status: 'LIVE'
        });

        if (!session) {
            return res.status(404).json({ message: 'Live session not found or already ended.' });
        }

        session.endTime = new Date();
        session.status = 'COMPLETED';
        await session.save();

        res.json({
            message: 'Session ended successfully.',
            totalAttendance: session.totalAttendance,
            duration: Math.round((session.endTime - session.startTime) / 60000)
        });

    } catch (error) {
        console.error('Error ending session:', error);
        res.status(500).json({ message: 'Server error ending session.' });
    }
});

// @route GET /api/classes/live
// @desc Get the current live session for a faculty member
// @access Private (Faculty)
router.get('/live', protect, async (req, res) => {
    try {
        const liveSession = await ClassSession.findOne({
            faculty: req.user._id,
            status: 'LIVE'
        }).populate('timetableId', 'course classId');

        if (!liveSession) {
            return res.json({ message: 'No active session.', session: null });
        }

        res.json({
            session: {
                sessionId: liveSession._id,
                course: liveSession.course,
                classId: liveSession.timetableId.classId,
                room: liveSession.room,
                sessionCode: liveSession.sessionCode,
                totalAttendance: liveSession.totalAttendance,
                startTime: liveSession.startTime
            }
        });
    } catch (error) {
        console.error('Error fetching live session:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;