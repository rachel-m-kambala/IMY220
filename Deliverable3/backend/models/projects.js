//Mukaji Mweni Rachel Kambala u23559129 position-24

import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  path: String,
  url: String, 
  size: Number,
  fileType: String,
  version: { type: Number, default: 1 },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now },
  description: String
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  title: String,
  summary: String,
  image: String,
  thumbnail: String,
  coverImage: String,
 
  type: {
    type: String,
    enum: ['public', 'private', 'shared'],
    default: 'public'
  },
  category: String,
  tags: [String],
  hashtags: [String],
  keywords: [String],
  
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['viewer', 'editor', 'admin'], default: 'viewer' },
    joinedAt: { type: Date, default: Date.now }
  }],
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  files: [fileSchema],
  isCheckedOut: {
    type: Boolean,
    default: false
  },
  checkedOutBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  currentVersion: {
    type: Number,
    default: 1
  },
  versionHistory: [{
    version: Number,
    changes: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date, default: Date.now }
  }],
 
  status: {
    type: String,
    enum: ['active', 'archived', 'deleted'],
    default: 'active'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: Date
}, {
  timestamps: true
});

projectSchema.index({ owner: 1, createdAt: -1 });
projectSchema.index({ hashtags: 1 });
projectSchema.index({ type: 1, status: 1 });

export default mongoose.model('Project', projectSchema, 'projects');