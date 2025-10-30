//Mukaji Mweni Rachel Kambala u23559129 position-24

import express from 'express';
import Message from '../models/messages.jsx';
import auth from '../middleware/auth.jsx';

const router = express.Router();

router.get('/project/:projectId', async (req, res) => {
  try {
    const messages = await Message.find({ project: req.params.projectId })
      .populate('user', 'username name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages'
    });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { project, message, type } = req.body;

    const newMessage = new Message({
      project,
      user: req.userId,
      message,
      type: type || 'comment'
    });

    await newMessage.save();
    await newMessage.populate('user', 'username name');

    res.status(201).json({
      success: true,
      message: 'Message created successfully',
      newMessage
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating message'
    });
  }
});

export default router;