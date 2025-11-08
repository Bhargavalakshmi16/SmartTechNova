const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSession', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    markedTime: { type: Date, default: Date.now },
    status: { type: String, enum: ['PRESENT', 'LATE'], default: 'PRESENT' },
    isVerified: { type: Boolean, default: true }, // Flag for QR/OTP verification
}, {
    timestamps: true
});

// Compound index to prevent double attendance marks for the same student in the same session
AttendanceSchema.index({ session: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);