//Mukaji Mweni Rachel Kambala u23559129 position-24

import mongoose from 'mongoose';
import User from '../models/User.js';
import Project from '../models/projects.js';
import Message from '../models/messages.js';
import bcrypt from 'bcryptjs';

const initializeSampleData = async () => {
  try {
    console.log('Initializing sample data...');

    const existingUsers = await User.countDocuments();
    
    if (existingUsers === 0) {
      console.log('Creating sample users...');

      const users = await User.create([
        {
          username: 'admin',
          email: 'admin@example.com',
          password: await bcrypt.hash('admin123', 12),
          isAdmin: true,
          firstName: 'Admin',
          lastName: 'User'
        },
        {
          username: 'johndoe',
          email: 'john@example.com',
          password: await bcrypt.hash('password123', 12),
          firstName: 'John',
          lastName: 'Doe'
        },
        {
          username: 'janesmith',
          email: 'jane@example.com',
          password: await bcrypt.hash('password123', 12),
          firstName: 'Jane',
          lastName: 'Smith'
        }
      ]);
      
      console.log(`Created ${users.length} sample users`);
    }
 
    const existingProjects = await Project.countDocuments();
    
    if (existingProjects === 0 && existingUsers > 0) {
      console.log('Creating sample projects...');
      
      const users = await User.find();
      const sampleProjects = [
        {
          name: 'Web Development Starter',
          description: 'A starter template for web development projects',
          owner: users[1]._id,
          type: 'public',
          hashtags: ['webdev', 'starter', 'template']
        },
        {
          name: 'Mobile App Design',
          description: 'UI/UX design files for mobile application',
          owner: users[2]._id,
          type: 'public',
          hashtags: ['mobile', 'design', 'uiux']
        }
      ];
      
      const projects = await Project.create(sampleProjects);
      console.log(`Created ${projects.length} sample projects`);
    }
    
    console.log('Database initialization complete!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default initializeSampleData;