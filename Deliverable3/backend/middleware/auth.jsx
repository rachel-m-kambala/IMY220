//Mukaji Mweni Rachel Kambala u23559129 position-24

import User from "../models/users.jsx";

const sessions = new Map();

export const generateSessionToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const createSession = (user) => {
  const sessionToken = generateSessionToken();
  const session = {
    userId: user._id.toString(),
    username: user.username,
    createdAt: new Date(),
    lastAccessed: new Date()
  };
  
  sessions.set(sessionToken, session);
  return sessionToken;
};

export const getSession = (sessionToken) => {
  const session = sessions.get(sessionToken);
  if (session) {
    session.lastAccessed = new Date();
  }
  return session;
};

export const deleteSession = (sessionToken) => {
  sessions.delete(sessionToken);
};

setInterval(() => {
  const now = new Date();
  for (const [token, session] of sessions.entries()) {
    if (now - session.lastAccessed > 24 * 60 * 60 * 1000) {
      sessions.delete(token);
    }
  }
}, 60 * 60 * 1000);

const auth = async (req, res, next) => {
  try {
    const sessionToken = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }

    const session = getSession(sessionToken);
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session'
      });
        }
      
      const user = await User.findById(session.userId);
    if (!user) {
      deleteSession(sessionToken);
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    req.userId = session.userId;
    req.sessionToken = sessionToken;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

export default auth;