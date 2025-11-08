const express = require('express');
const Timetable = require('../models/Timetable');
const User = require('../models/User');
const Syllabus = require('../models/Syllabus'); // <-- NEW MODEL IMPORT

const router = express.Router();

// NOTE: We keep mockProtect for the timetable GET endpoint for now
const mockProtect = (req, res, next) => {
    // This allows the route to be tested immediately without a JWT
    req.user = { id: 'dummyUser', role: 'student' };
    next();
};

// @route GET /api/timetable/seed  <-- TEMPORARY GET METHOD FOR EASY BROWSER SEEDING
// @desc Utility to create initial data (only for testing/setup)
router.get('/seed', async (req, res) => {
    try {
        // --- 1. Ensure Dummy Users Exist ---
        let faculty1 = await User.findOne({ id: 'faculty1' });
        let faculty2 = await User.findOne({ id: 'faculty2' });
        let faculty3 = await User.findOne({ id: 'faculty3' });
        let student1 = await User.findOne({ id: '12345' });
        let admin1 = await User.findOne({ id: 'admin' });

        if (!faculty1) { faculty1 = await User.create({ id: 'faculty1', name: 'Dr. Alice Chen', email: 'alice.chen@scfmp.edu', password: '123', role: 'faculty', department: 'CSE' }); }
        if (!faculty2) { faculty2 = await User.create({ id: 'faculty2', name: 'Prof. Bob Smith', email: 'bob.smith@scfmp.edu', password: '123', role: 'faculty', department: 'ECE' }); }
        if (!faculty3) { faculty3 = await User.create({ id: 'faculty3', name: 'Dr. Jane Smith', email: 'jane.smith@scfmp.edu', password: '123', role: 'faculty', department: 'CSE' }); }
        if (!student1) { student1 = await User.create({ id: '12345', name: 'Anjali Desai', email: 'anjali@scfmp.edu', password: '123', role: 'student', department: 'CSE', class: 'CSE-B' }); }
        if (!admin1) { admin1 = await User.create({ id: 'admin', name: 'System Administrator', email: 'admin@scfmp.edu', password: '123', role: 'admin', department: 'Admin' }); }

        // --- 2. Clear and Seed Timetable Data ---
        await Timetable.deleteMany({});

        const sampleTimetables = [
            {
                classId: 'CS101-CSE', course: 'Data Structures', department: 'CSE', class: 'CSE-B', faculty: faculty1._id, totalStudents: 55,
                schedule: [{ day: 'Monday', startTime: '09:00 AM', endTime: '10:30 AM', room: 'A-301' }]
            },
            {
                classId: 'WEB201-CSE', course: 'Web Development', department: 'CSE', class: 'CSE-B', faculty: faculty2._id, totalStudents: 55,
                schedule: [{ day: 'Monday', startTime: '11:00 AM', endTime: '12:30 PM', room: 'A-205' }]
            },
            {
                classId: 'AI305-CSE', course: 'Deep Learning', department: 'CSE', class: 'CSE-B', faculty: faculty3._id, totalStudents: 55,
                schedule: [{ day: 'Tuesday', startTime: '13:00 PM', endTime: '14:30 PM', room: 'B-101' }]
            }
        ];

        const insertedTimetables = await Timetable.insertMany(sampleTimetables);

        // --- 3. Clear and Seed Syllabus Data ---
        await Syllabus.deleteMany({});

        const syllabusEntries = [
            { courseId: insertedTimetables[0]._id, courseName: 'Data Structures', department: 'CSE', completedTopics: 90, totalTopics: 100, status: 'On Track' },
            { courseId: insertedTimetables[1]._id, courseName: 'Web Development', department: 'CSE', completedTopics: 65, totalTopics: 100, status: 'Lagging', alertThreshold: 70 },
            { courseId: insertedTimetables[2]._id, courseName: 'Deep Learning', department: 'CSE', completedTopics: 40, totalTopics: 100, status: 'On Track' },
        ];

        await Syllabus.insertMany(syllabusEntries);


        res.json({ message: 'Users, Timetable, and Syllabus data seeded successfully!' });

    } catch (error) {
        console.error('Error seeding data:', error);
        res.status(500).json({ message: 'Server error during data seeding' });
    }
});


// @route GET /api/timetable/classes/:facultyId
// @desc Get all classes/courses taught by a specific faculty member (Used by Faculty Dashboard)
router.get('/classes/:facultyId', async (req, res) => {
    const facultyId = req.params.facultyId;

    try {
        const facultyUser = await User.findOne({ id: facultyId });
        if (!facultyUser) {
            return res.status(404).json({ message: 'Faculty user not found.' });
        }

        // --- ORIGINAL WORKING FUNCTIONALITY ---
        const facultyClasses = await Timetable.find({ faculty: facultyUser._id }).select('course classId totalStudents schedule');

        if (facultyClasses.length === 0) {
            return res.status(404).json({ message: 'No classes assigned to this faculty member.' });
        }

        const formattedClasses = facultyClasses.map(cls => {
            const firstSchedule = cls.schedule[0];
            return {
                classId: cls.classId,
                course: cls.course,
                students: cls.totalStudents,
                time: `${firstSchedule.startTime} - ${firstSchedule.endTime}`,
                room: firstSchedule.room,
                status: 'Upcoming'
            };
        });

        res.json(formattedClasses);
        // --- END ORIGINAL WORKING FUNCTIONALITY ---

    } catch (error) {
        console.error('Error fetching faculty classes:', error);
        res.status(500).json({ message: 'Server error fetching faculty classes.' });
    }
});


// @route GET /api/timetable/:id
// @desc Get structured timetable for a user (Student/Faculty)
router.get('/:id', mockProtect, async (req, res) => {
    const userId = req.params.id;
    const userRole = req.query.role;

    try {
        let timetable;

        const currentUser = await User.findOne({ id: userId });
        if (!currentUser) return res.status(404).json({ message: 'User not found.' });

        if (userRole === 'student') {
            const classFilter = currentUser.class || 'CSE-B';
            timetable = await Timetable.find({ class: classFilter }).populate('faculty', 'name id');
        } else if (userRole === 'faculty') {
            timetable = await Timetable.find({ faculty: currentUser._id }).populate('faculty', 'name id');
        } else {
            timetable = await Timetable.find({}).populate('faculty', 'name id');
        }

        if (timetable.length === 0) {
            return res.status(404).json({ message: 'No timetable found for this user.' });
        }

        // --- ORIGINAL WORKING FUNCTIONALITY ---
        const structuredTimetable = timetable.reduce((acc, entry) => {
            if (entry.schedule && entry.schedule.length > 0) {
                entry.schedule.forEach(sched => {
                    const day = sched.day;
                    if (!acc[day]) { acc[day] = []; }
                    acc[day].push({
                        time: `${sched.startTime} - ${sched.endTime}`,
                        subject: entry.course,
                        faculty: entry.faculty.name,
                        room: sched.room,
                        status: 'Scheduled',
                        classId: entry.classId
                    });
                });
            }
            return acc;
        }, {});

        res.json(structuredTimetable);
        // --- END ORIGINAL WORKING FUNCTIONALITY ---

    } catch (error) {
        console.error('Error fetching timetable:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;