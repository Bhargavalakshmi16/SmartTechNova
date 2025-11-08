const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @route POST /api/auth/register
// @desc Register a new user (for demo setup)
router.post('/register', async (req, res) => {
    const { id, name, email, password, role, department } = req.body;

    // Basic validation
    if (!id || !name || !email || !password || !role || !department) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        const userExists = await User.findOne({ id });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            id,
            name,
            email,
            password, // Password will be hashed by pre-save hook
            role,
            department
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// @route POST /api/auth/login
// @desc Authenticate user and get token
router.post('/login', async (req, res) => {
    const { identifier, password, role } = req.body;

    try {
        // Find user by ID and role
        const user = await User.findOne({ id: identifier, role });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid ID or Password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;