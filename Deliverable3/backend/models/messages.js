//Mukaji Mweni Rachel Kambala u23559129 position-24

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Alternative to user

  type: {
    type: String,
    enum: ['checkin', 'checkout', 'comment', 'update', 'system'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  content: String, 
  title: String,

  files: [{
    filename: String,
    path: String,
    url: String,
    version: Number,
    description: String
  }],
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
 
  version: {
    type: Number,
    default: 1
  },
  previousVersion: Number,

  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reactions: Map,

  parentMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

messageSchema.index({ project: 1, createdAt: -1 });
messageSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema, 'messages');