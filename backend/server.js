const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// --- Import Routes ---
const authRoutes = require('./routes/authRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const classRoutes = require('./routes/classRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const adminRoutes = require('./routes/adminRoutes'); // <-- NEW IMPORT

const app = express();
const PORT = process.env.PORT || 5000;

// --- Database Connection ---
const connectDB = async () => {
    // CRITICAL CHECK: Ensure MONGO_URI is available and not a placeholder
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<Your')) {
        console.error('CRITICAL ERROR: MONGO_URI is missing or contains placeholder values. Please check your .env file.');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

// Connect to the database
connectDB();

// --- Middleware ---
// Configure CORS to allow requests from the React frontend (localhost:3000)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // Allows parsing JSON body data

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes); // <-- NEW ROUTE USAGE

// Simple test route
app.get('/', (req, res) => {
    res.send('SCFMP Backend API is running.');
});

// --- Start Server ---
app.listen(PORT, () => {
    const serverUrl = `http://localhost:${PORT}`;
    const seedUrl = `${serverUrl}/api/timetable/seed`;

    console.log(`Server running on port ${PORT}`);
    console.log(`--------------------------------------------------------`);
    console.log(`🚀 API Base URL: ${serverUrl}`);
    console.log(`💾 Data Seeding (GET Request): ${seedUrl}`); // Temporary GET link for browser access
    console.log(`--------------------------------------------------------`);
});
