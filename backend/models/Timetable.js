const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    classId: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    department: { type: String, required: true },
    class: { type: String, required: true }, // e.g., 'Class 12-A', 'CSE-B'
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schedule: [{
        day: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        room: { type: String, required: true }
    }],
    totalStudents: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Timetable', TimetableSchema);