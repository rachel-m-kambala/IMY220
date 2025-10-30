//Mukaji Mweni Rachel Kambala u23559129

import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const displayName = project.name;
  const displayDescription = project.description;
  const tags = project.tags || project.hashtags || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {project.image && (
        <img
          src={`http://localhost:5000${project.image}`}
          alt={displayName}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
            {displayName}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            project.isCheckedOut 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {project.isCheckedOut ? 'Checked Out' : 'Available'}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {displayDescription}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">
              {project.owner?.username?.charAt(0) || 'U'}
            </div>
            {project.owner?.username || 'Unknown'}
          </span>
          <span>v{project.currentVersion || 1}</span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/project/${project._id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;