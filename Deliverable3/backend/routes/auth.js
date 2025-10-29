//Mukaji Mweni Rachel Kambala u23559129 position-24

import express from 'express';
import User from '../models/User.js';
import { createSession, deleteSession } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
      const { username, email, password } = req.body;
      
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
      
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username'
      });
    }
      
    const user = new User({ 
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password 
    });
    await user.save();

    const sessionToken = createSession(user);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      sessionToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const sessionToken = createSession(user);

    res.json({
      success: true,
      message: 'Login successful',
      sessionToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization')?.replace('Bearer ', '');
    
    if (sessionToken) {
      deleteSession(sessionToken);
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: error.message
    });
  }
});

router.get('/verify', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'No session token'
      });
    }

    const { getSession } = await import('../middleware/auth.js');
    const session = getSession(sessionToken);
    
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session'
      });
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Verify session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying session',
      error: error.message
    });
  }
});

export default router;