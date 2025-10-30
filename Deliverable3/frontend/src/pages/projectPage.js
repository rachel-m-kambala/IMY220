//Mukaji Mweni Rachel Kambala u23559129 position-24

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api.js';

const ProjectPage = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const response = await apiClient.request(`/projects/${id}`);
      setProject(response.project);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <button 
            onClick={() => navigate('/home')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Go Home
          </button>
        </div>
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
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">PROJECT: {project.name}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {project.image && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">IMAGE OF PROJECT</h2>
                <img
                  src={`http://localhost:5000${project.image}`}
                  alt={project.name}
                  className="w-full h-64 object-cover rounded"
                />
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">FILES:</h2>
              <div className="space-y-3">
                {project.files?.map((file, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded border border-gray-600">
                    <p className="text-gray-300">{file.originalName || file.filename}</p>
                  </div>
                )) || (
                  <p className="text-gray-400">No files uploaded yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">TAGS:</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag, index) => (
                  <span key={index} className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                )) || (
                  <span className="text-gray-400">No tags</span>
                )}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">DESCRIPTION:</h3>
              <p className="text-gray-300">{project.description}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">PROJECT STATUS:</h3>
              <div className="space-y-3">
                <div>
                  <strong>CURRENT STATUS:</strong>{' '}
                  <span className={project.isCheckedOut ? 'text-red-400' : 'text-green-400'}>
                    {project.isCheckedOut ? 'Checked out' : 'Checked in'}
                  </span>
                </div>
                <div>
                  <strong>LAST UPDATED:</strong>{' '}
                  <span className="text-gray-300">
                    {new Date(project.updatedAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <strong>CHECKED OUT BY:</strong>{' '}
                  <span className="text-gray-300">
                    {project.isCheckedOut 
                      ? `@${project.checkedOutBy?.username}` 
                      : '(Not checked out yet)'
                    }
                  </span>
                </div>
                <div>
                  <strong>MEMBERS:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.members?.map(member => (
                      <span key={member.user?._id} className="text-blue-400">
                        @{member.user?.username}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;