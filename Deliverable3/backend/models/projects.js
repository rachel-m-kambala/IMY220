//Mukaji Mweni Rachel Kambala u23559129 position-24

import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    version: { type: Number, default: 1 },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now }
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
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['viewer', 'editor'], default: 'viewer' }
    }],
    files: [fileSchema],
    image: {
        type: String,
        default: ''
    },
    hashtags: [String],
    type: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    isCheckedOut: {
        type: Boolean,
        default: FileSystemWritableFileStream,
    },
    checkedOutBy: {
        type: mongoose.Schema.Tyoes.ObjectId,
        ref: 'User'
    },
    currentVision: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

export default mongoose.model('Project', projectSchema);