const mongoose = require('mongoose');

const ClassSessionSchema = new mongoose.Schema({
    timetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Timetable', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: String, required: true },
    room: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, default: null }, // Null until session is ended
    status: { type: String, enum: ['LIVE', 'COMPLETED', 'CANCELLED'], default: 'LIVE' },
    sessionCode: { type: String, unique: true, required: true }, // The OTP/QR code for students
    totalAttendance: { type: Number, default: 0 },
}, {
    timestamps: true
});

module.exports = mongoose.model('ClassSession', ClassSessionSchema);