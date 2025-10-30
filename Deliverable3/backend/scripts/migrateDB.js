//Mukaji Mweni Rachel Kambala u23559129 position-24

import mongoose from 'mongoose';
import User from '../models/users.js';
import Project from '../models/projects.js';
import bcrypt from 'bcryptjs';

const migrateExistingData = async () => {
  try {
    console.log('Migrating existing data to new schema...');

    const users = await User.find();
    console.log(`Found ${users.length} users to migrate`);
    
    for (const user of users) {
      const updates = {};

      if (!user.username && user.name) {
        updates.username = user.name.toLowerCase().replace(/\s+/g, '');
      }

      if (user.password && !user.password.startsWith('$2')) {
        updates.password = await bcrypt.hash(user.password, 12);
        console.log(`Hashing password for user: ${user.email}`);
      }

      if (!user.bio && user.occupation) {
        updates.bio = `${user.occupation} specializing in web development.`;
      }
      
      if (Object.keys(updates).length > 0) {
        await User.findByIdAndUpdate(user._id, updates);
        console.log(`Updated user: ${user.email}`);
      }
    }

    const projects = await Project.find();
    console.log(`\nFound ${projects.length} projects to migrate`);
    
    for (const project of projects) {
      const updates = {};

      if (project.tags && project.tags.length > 0 && (!project.hashtags || project.hashtags.length === 0)) {
        updates.hashtags = project.tags;
      }

      if (!project.type) {
        updates.type = 'public';
      }

      if (!project.currentVersion) {
        updates.currentVersion = 1;
      }
      
      if (Object.keys(updates).length > 0) {
        await Project.findByIdAndUpdate(project._id, updates);
        console.log(`Updated project: ${project.name}`);
      }
    }
    
    console.log('Database migration completed successfully!');
    
  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  }
};

export default migrateExistingData;