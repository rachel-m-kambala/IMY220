//Mukaji Mweni Rachel Kambala u23559129 position-24

import React from 'react';

const UserProfile = ({ user }) => {
  const displayName = user.name || user.username;
  const occupation = user.occupation || 'Developer';
  const website = user.website || '';
  const bio = user.bio || 'No bio available';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{displayName}</h1>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-blue-600">{occupation}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-gray-700">{bio}</p>
      </div>
      
      {website && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Website</h2>
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {website}
          </a>
        </div>
      )}
      
      <div className="flex space-x-4 text-sm text-gray-500">
        <span>{user.friends?.length || 0} Friends</span>
        <span>{user.projects?.length || 0} Projects</span>
      </div>
    </div>
  );
};

export default UserProfile;