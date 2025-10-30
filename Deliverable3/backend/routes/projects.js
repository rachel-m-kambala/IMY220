//Mukaji Mweni Rachel Kambala u23559129

import express from 'express';
import Project from '../models/projects.js';
import Message from '../models/messages.js';
import { upload } from '../server.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('owner', 'username profilePicture')
      .populate('members.user', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, hashtags, type } = req.body;
    
    const project = new Project({
      name,
      description,
      owner: req.userId,
      hashtags: hashtags ? hashtags.split(',').map(tag => tag.trim()) : [],
      type,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });

    await project.save();
    await project.populate('owner', 'username profilePicture');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

router.post('/:id/files', auth, upload.array('files'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const newFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: `/uploads/${file.filename}`,
      size: file.size,
      uploadedBy: req.userId,
      version: project.currentVersion
    }));

    project.files.push(...newFiles);
    await project.save();

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      files: newFiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading files',
      error: error.message
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
      message: `Checked out project for editing`
    });
    await message.save();

    res.json({
      success: true,
      message: 'Project checked out successfully',
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking out project',
      error: error.message
    });
  }
});

router.post('/:id/checkin', auth, upload.array('files'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (!project.isCheckedOut || project.checkedOutBy.toString() !== req.userId) {
      return res.status(400).json({
        success: false,
        message: 'Project is not checked out by you'
      });
    }

    const { message: checkinMessage } = req.body;

    const newFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: `/uploads/${file.filename}`,
      size: file.size,
      uploadedBy: req.userId,
      version: project.currentVersion + 1
    }));

    project.files.push(...newFiles);
    project.currentVersion += 1;
    project.isCheckedOut = false;
    project.checkedOutBy = null;
    await project.save();

    // Create checkin message
    const message = new Message({
      project: project._id,
      user: req.userId,
      type: 'checkin',
      message: checkinMessage || 'Checked in project with updates',
      files: newFiles.map(file => ({
        filename: file.filename,
        path: file.path,
        version: file.version
      }))
    });
    await message.save();

    res.json({
      success: true,
      message: 'Project checked in successfully',
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking in project',
      error: error.message
    });
  }
});

export default router;