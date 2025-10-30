//Mukaji Mweni Rachel Kambala u23559129 position-24

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api.jsx';

const HomePage = ({ user }) => {
  const navigate = useNavigate();
  const [feedType, setFeedType] = useState('local');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await apiClient.request('/projects');
      setProjects(response.projects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">CODESYNC</h1>
              <nav className="flex space-x-6">
                <span className="text-blue-400 font-semibold">PROFILE</span>
                <button onClick={() => navigate('/home')} className="text-gray-300 hover:text-white">
                  Home
                </button>
                <span className="text-gray-300">PROJECTS</span>
                <button 
                  onClick={() => apiClient.logout().then(() => window.location.href = '/')}
                  className="text-gray-300 hover:text-white"
                >
                  LOG OUT
                </button>
              </nav>
            </div>
            <div className="text-blue-400">
              Welcome back, @{user?.username}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Feed Toggle */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setFeedType('local')}
            className={`px-6 py-3 rounded-lg font-semibold ${
              feedType === 'local'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            LOCAL FEED
          </button>
          <button
            onClick={() => setFeedType('global')}
            className={`px-6 py-3 rounded-lg font-semibold ${
              feedType === 'global'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            GLOBAL FEED
          </button>
        </div>

        {/* Projects Feed */}
        <div className="space-y-6">
          {projects.map(project => (
            <div key={project._id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mb-3">
                    <span>@{project.owner?.username}</span>
                    <span>•</span>
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  project.isCheckedOut 
                    ? 'bg-red-600 text-white' 
                    : 'bg-green-600 text-white'
                }`}>
                  {project.isCheckedOut ? 'Checked out' : 'Checked in'}
                </span>
              </div>

              <p className="text-gray-300 mb-4">{project.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>Downloads: {project.downloads || 0}</span>
                  <span>Collaborations: {project.members?.length || 1}</span>
                </div>
                <div className="flex space-x-2">
                  {project.members?.slice(0, 3).map(member => (
                    <span key={member.user?._id} className="text-blue-400">
                      @{member.user?.username}
                    </span>
                  ))}
                </div>
              </div>

              {project.isCheckedOut && (
                <div className="mt-4 p-3 bg-gray-700 rounded border border-gray-600">
                  <p className="text-sm text-gray-300">
                    <strong>Checked out by:</strong> @{project.checkedOutBy?.username}
                  </p>
                </div>
              )}
            </div>
          ))}

          {projects.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
              <p className="text-gray-400 mb-4">
                {feedType === 'local' 
                  ? "When your friends create projects, you'll see them here!"
                  : "Be the first to create a project!"
                }
              </p>
              <button 
                onClick={() => navigate('/create-project')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Create Your First Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;