//Mukaji Mweni Rachel Kambala u23559129 position-24

import mongoose from 'mongoose';
import User from '../models/users.jsx';
import Project from '../models/projects.jsx';
import Message from '../models/messages.jsx';

const checkDatabaseCompatibility = async () => {
  try {
    console.log('Checking codesync database compatibility...');

    const userCount = await User.countDocuments();
    const projectCount = await Project.countDocuments();
    const messageCount = await Message.countDocuments();
    
    console.log(`Users in database: ${userCount}`);
    console.log(`Projects in database: ${projectCount}`);
    console.log(`Messages in database: ${messageCount}`);

    if (userCount > 0) {
      const sampleUser = await User.findOne();
      console.log('\n👤 Sample User Structure:');
      console.log('Fields:', Object.keys(sampleUser.toObject()));
      console.log('Username:', sampleUser.username);
      console.log('Email:', sampleUser.email);
      console.log('Has password field:', 'password' in sampleUser.toObject());

      const usersWithPlainPasswords = await User.find({
        password: { $not: { $regex: /^\$2[ayb]\$.{56}$/ } } // Not bcrypt format
      });
      console.log(`Users needing password rehashing: ${usersWithPlainPasswords.length}`);
    }

    if (projectCount > 0) {
      const sampleProject = await Project.findOne().populate('owner', 'username email');
      console.log('Sample Project Structure:');
      console.log('Fields:', Object.keys(sampleProject.toObject()));
      console.log('Project Name:', sampleProject.name);
      console.log('Owner:', sampleProject.owner);
      console.log('Type:', sampleProject.type);
      console.log('Has files:', sampleProject.files && sampleProject.files.length > 0);
    }
    
    return {
      users: userCount,
      projects: projectCount,
      messages: messageCount,
      status: 'Compatibility check complete'
    };
    
  } catch (error) {
    console.error('Error checking database:', error);
    throw error;
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codesync')
    .then(() => checkDatabaseCompatibility())
    .then(() => mongoose.connection.close())
    .catch(console.error);
}

export default checkDatabaseCompatibility;