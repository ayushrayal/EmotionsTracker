const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    console.log('Incoming Signup Request Body:', req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'Missing fields: username, email, and password are required' });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle Mongoose validation errors (Invalid format)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: `Invalid format: ${messages.join(', ')}` });
    }
    
    res.status(400).json({ success: false, error: error.message || 'Signup failed due to an unexpected error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
