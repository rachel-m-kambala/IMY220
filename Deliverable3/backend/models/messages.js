//Mukaji Mweni Rachel Kambala u23559129 position-24

import mongoose from "mongoose";

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
    type: {
        type: String,
        enum: ['checkin', 'checkout', 'comment'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    files: [{
        filename: String,
        path: String,
        version: Number
    }],
    version: {
        type: Number,
        default: 1
    }
}, {
    timestamp: true
});

export default mongoose.model('Message', messageSchema);