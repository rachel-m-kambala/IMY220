//Mukaji Mweni Rachel Kambala u23559129

import express from 'express';
import Project from '../models/projects.js';
import Message from '../models/messages.js';
import auth from '../middleware/auth.js';
import upload from '../config/multer.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('owner', 'username name email')
      .populate('members.user', 'username name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'username name email')
      .populate('members.user', 'username name')
      .populate('checkedOutBy', 'username name');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project'
    });
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, type, hashtags } = req.body;
    
    const project = new Project({
      name,
      description,
      owner: req.userId,
      type: type || 'web-application',
      hashtags: hashtags ? hashtags.split(',').map(tag => tag.trim()) : [],
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });

    await project.save();
    await project.populate('owner', 'username name');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project'
    });
  }
});

router.post('/:id/checkout', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.isCheckedOut) {
      return res.status(400).json({
        success: false,
        message: 'Project is already checked out'
      });
    }

    project.isCheckedOut = true;
    project.checkedOutBy = req.userId;
    await project.save();

    const message = new Message({
      project: project._id,
      user: req.userId,
      type: 'checkout',
      message: 'Checked out project for editing'
    });
    await message.save();

    res.json({
      success: true,
      message: 'Project checked out successfully',
      project
    });
  } catch (error) {
    console.error('Error checking out project:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking out project'
    });
  }
});

export default router;