//Mukaji Mweni Rachel Kambala u23559129 position-24

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";
import messageRoutes from "./routes/messages.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(_dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } //limited to 10MB
});

const MONGODB_URI = "mongodb+srv://u23559129_db_user:JlNITZAQpcPwaLaZ@cluster0.udird4d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to codesync database');
  console.log('Collections available: users, projects, messages');
})
.catch(err => console.error('MongoDB connection error:', err));   

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/appi/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    collections: ['users', 'projects', 'messages']
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});