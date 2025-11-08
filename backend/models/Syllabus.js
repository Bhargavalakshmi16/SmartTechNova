const mongoose = require('mongoose');

const SyllabusSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Timetable', required: true, unique: true },
    courseName: { type: String, required: true },
    department: { type: String, required: true },
    totalTopics: { type: Number, required: true, default: 100 }, // Total parts to cover
    completedTopics: { type: Number, default: 0 },
    alertThreshold: { type: Number, default: 75 }, // % completion required before a deadline
    status: { type: String, enum: ['On Track', 'Lagging', 'Complete'], default: 'On Track' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Syllabus', SyllabusSchema);