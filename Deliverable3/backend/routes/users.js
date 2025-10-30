//Mukaji Mweni Rachel Kambala u23559129 position-24

import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import upload from '../config/multer.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -friendRequests')
      .populate('friends', 'username profilePicture');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

router.put('/profile', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    const updates = {};
    
    if (req.body.username) updates.username = req.body.username;
    if (req.body.bio) updates.bio = req.body.bio;
    if (req.body.location) updates.location = req.body.location;
    if (req.body.occupation) updates.occupation = req.body.occupation;
    if (req.body.website) updates.website = req.body.website;
    if (req.body.name) updates.name = req.body.name;
    
    if (req.file) {
      updates.profilePicture = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password -friendRequests');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

router.post('/:id/friend-request', auth, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (targetUser._id.toString() === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot send friend request to yourself'
      });
    }

    if (targetUser.friends.includes(req.userId)) {
      return res.status(400).json({
        success: false,
        message: 'Already friends with this user'
      });
    }

    const existingRequest = targetUser.friendRequests.find(
      request => request.from.toString() === req.userId && request.status === 'pending'
    );

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'Friend request already sent'
      });
    }

    targetUser.friendRequests.push({
      from: req.userId,
      status: 'pending'
    });

    await targetUser.save();

    res.json({
      success: true,
      message: 'Friend request sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending friend request',
      error: error.message
    });
  }
});

router.post('/friend-requests/:requestId/accept', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const friendRequest = user.friendRequests.id(req.params.requestId);

    if (!friendRequest || friendRequest.status !== 'pending') {
      return res.status(404).json({
        success: false,
        message: 'Friend request not found'
      });
    }

    friendRequest.status = 'accepted';

    user.friends.push(friendRequest.from);
    await user.save();

    const friendUser = await User.findById(friendRequest.from);
    friendUser.friends.push(req.userId);
    await friendUser.save();

    res.json({
      success: true,
      message: 'Friend request accepted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error accepting friend request',
      error: error.message
    });
  }
});

router.get('/friend-requests/pending', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('friendRequests.from', 'username profilePicture name')
      .select('friendRequests');

    const pendingRequests = user.friendRequests.filter(
      request => request.status === 'pending'
    );

    res.json({
      success: true,
      requests: pendingRequests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching friend requests',
      error: error.message
    });
  }
});

export default router;