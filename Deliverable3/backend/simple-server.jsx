//Mukaji Mweni rachel Kambala u23559129 position-24

import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();

app.use(cors());
app.use(express.json());

let users = [
  {
    id: '1',
    username: 'testuser',
    email: 'test@test.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/Lewd.s8OJIQswNRFG', // "test123"
    name: 'Test User',
    bio: 'This is a test user for IMY 220',
    occupation: 'Student',
    location: 'Cape Town',
    friends: ['2'],
    createdAt: new Date()
  },
  {
    id: '2', 
    username: 'elle-codes-45',
    email: 'elle@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/Lewd.s8OJIQswNRFG', // "password123"
    name: 'Elle Johnson',
    bio: 'Frontend Developer passionate about React.',
    occupation: 'Front-End Developer',
    location: 'Cape Town, South Africa',
    website: 'https://ellecodes.com',
    friends: ['1'],
    createdAt: new Date()
  }
];

let projects = [
  {
    id: '1',
    name: 'DevChatBot',
    description: 'A chatbot for developers using Node.js and React',
    owner: '2',
    type: 'Web Application',
    tags: ['javascript', 'nodejs', 'react', 'chatbot'],
    isCheckedOut: false,
    currentVersion: 1,
    members: [
      { user: '2', role: 'owner' },
      { user: '1', role: 'editor' }
    ],
    createdAt: new Date('2025-03-15'),
    updatedAt: new Date('2025-03-15')
  }
];

let sessions = new Map();

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: 'Mock (In-Memory)',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isValidPassword = user.password.includes('$2a$');
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessions.set(sessionToken, { userId: user.id, username: user.username });

    res.json({
      success: true,
      message: 'Login successful',
      sessionToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        bio: user.bio,
        occupation: user.occupation,
        website: user.website,
        location: user.location,
        friends: user.friends
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during login'
    });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (users.find(u => u.email === email || u.username === username)) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const newUser = {
      id: (users.length + 1).toString(),
      username,
      email,
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/Lewd.s8OJIQswNRFG', // Mock hashed password
      name: username,
      bio: '',
      friends: [],
      createdAt: new Date()
    };

    users.push(newUser);

    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessions.set(sessionToken, { userId: newUser.id, username: newUser.username });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      sessionToken,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
        bio: newUser.bio
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user'
    });
  }
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      bio: user.bio,
      occupation: user.occupation,
      website: user.website,
      location: user.location,
      friends: user.friends,
      createdAt: user.createdAt
    }
  });
});

app.get('/api/users/profile/me', (req, res) => {
  const sessionToken = req.header('Authorization')?.replace('Bearer ', '');
  const session = sessions.get(sessionToken);
  
  if (!session) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }

  const user = users.find(u => u.id === session.userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      bio: user.bio,
      occupation: user.occupation,
      website: user.website,
      location: user.location,
      friends: user.friends,
      createdAt: user.createdAt
    }
  });
});

app.get('/api/projects', (req, res) => {
  const projectsWithUsers = projects.map(project => ({
    ...project,
    owner: users.find(u => u.id === project.owner)
  }));

  res.json({
    success: true,
    projects: projectsWithUsers
  });
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  const projectWithUsers = {
    ...project,
    owner: users.find(u => u.id === project.owner),
    members: project.members.map(member => ({
      ...member,
      user: users.find(u => u.id === member.user)
    }))
  };

  res.json({
    success: true,
    project: projectWithUsers
  });
});

app.post('/api/projects', (req, res) => {
  const sessionToken = req.header('Authorization')?.replace('Bearer ', '');
  const session = sessions.get(sessionToken);
  
  if (!session) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }

  const { name, description, type, hashtags } = req.body;

  const newProject = {
    id: (projects.length + 1).toString(),
    name,
    description,
    owner: session.userId,
    type: type || 'web-application',
    tags: hashtags ? hashtags.split(',').map(tag => tag.trim()) : [],
    isCheckedOut: false,
    currentVersion: 1,
    members: [
      { user: session.userId, role: 'owner' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  projects.push(newProject);

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    project: {
      ...newProject,
      owner: users.find(u => u.id === session.userId)
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SIMPLE Backend server running on http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log('💡 Using mock data - no MongoDB required!');
  console.log('👤 Test users:');
  console.log('   test@test.com / test123');
  console.log('   elle@example.com / password123');
});