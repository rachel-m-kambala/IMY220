//Mukaji Mweni Rachel Kambala u23559129 position-24

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { apiClient } from './utils/api.js';
import SplashPage from './pages/splashPage.js';
import HomePage from './pages/homePage.js';
import ProfilePage from './pages/profilePage.js';
import ProjectPage from './pages/profilePage.js';
import SearchPage from './pages/searchPage.js';
import CreateProjectPage from './pages/createProjectPage.js';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const isAuthenticated = await apiClient.verifySession();
    if (isAuthenticated) {
      setUser(apiClient.user);
    }
    setLoading(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await apiClient.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/home" element={<HomePage user={user} />} />
            <Route path="/profile/:id" element={<ProfilePage currentUser={user} />} />
            <Route path="/profile" element={<ProfilePage currentUser={user} />} />
            <Route path="/project/:id" element={<ProjectPage currentUser={user} />} />
            <Route path="/create-project" element={<CreateProjectPage user={user} />} />
            <Route path="/search" element={<SearchPage user={user} />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<SplashPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;