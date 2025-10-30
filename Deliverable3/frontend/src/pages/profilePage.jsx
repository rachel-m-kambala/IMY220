//Mukaji Mweni Rachel Kambala u23559129 postion-24

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api.jsx';
import ProfileEditor from '../components/user/profileEditor.jsx';

const ProfilePage = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !id || id === currentUser.id;

  useEffect(() => {
    loadProfileData();
  }, [id]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const userId = id || currentUser.id;

      const userResponse = await apiClient.request(`/users/${userId}`);
      setUser(userResponse.user);

      const projectsResponse = await apiClient.request('/projects');
      const userProjects = projectsResponse.projects.filter(
        project => project.owner._id === userId
      );
      setProjects(userProjects);

    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
    if (isOwnProfile) {
      apiClient.setSession(apiClient.sessionToken, updatedUser);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">CODESYNC</h1>
              <nav className="flex space-x-6">
                <button onClick={() => navigate('/home')} className="text-gray-300 hover:text-white">
                  Home
                </button>
                <span className="text-blue-400 font-semibold">PROJECTS</span>
                <button 
                  onClick={() => apiClient.logout().then(() => window.location.href = '/')}
                  className="text-gray-300 hover:text-white"
                >
                  LOG OUT
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-400">@{user?.username}</span>
              {user?.isVerified && (
                <span className="bg-blue-500 text-xs px-2 py-1 rounded">Verified</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{user?.name || user?.username}</h1>
              <div className="grid md:grid-cols-2 gap-8 text-gray-300">
                <div>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Location:</strong> {user?.location || 'Not specified'}</p>
                  <p><strong>Occupation:</strong> {user?.occupation || 'Not specified'}</p>
                  {user?.website && (
                    <p><strong>Website:</strong> {user?.website}</p>
                  )}
                  <p><strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {isOwnProfile && (
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
                  Account
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
                  View Friends
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-semibold mb-4">STATS</h3>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-2xl font-bold">{user?.friends?.length || 0}</p>
                <p className="text-gray-400">Friends</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{projects.length}</p>
                <p className="text-gray-400">Projects</p>
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">Programming Languages:</p>
                <div className="flex flex-wrap gap-2">
                  {user?.programmingLanguages?.map((lang, index) => (
                    <span key={index} className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                      #{lang}
                    </span>
                  )) || (
                    <span className="text-gray-500">No languages specified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">PROJECTS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project._id} className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors duration-200">
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags?.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-blue-600 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>v{project.currentVersion || 1}</span>
                  <span>{project.isCheckedOut ? '🔴 Checked Out' : '🟢 Available'}</span>
                </div>
              </div>
            ))}
          </div>
          
          {projects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
              <p className="text-gray-400 mb-4">
                {isOwnProfile 
                  ? "Create your first project to get started!"
                  : "This user hasn't created any projects yet."
                }
              </p>
              {isOwnProfile && (
                <button 
                  onClick={() => navigate('/create-project')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                  Create Project
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <ProfileEditor 
          user={user}
          onSave={handleProfileUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;