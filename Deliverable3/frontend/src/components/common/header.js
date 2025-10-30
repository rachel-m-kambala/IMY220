//Mukaji Mweni Rachel Kambala u23559129 position-24

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await onLogout();
    setShowDropdown(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-400' : 'text-gray-300 hover:text-white';
  };

  return (
    <header className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-gray-900 text-sm">CS</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
              CodeSync
            </span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects, users, or hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                🔍
              </button>
            </div>
          </form>

          <nav className="flex items-center space-x-6">
            <Link to="/home" className={`${isActive('/home')} transition-colors duration-200`}>
              Home
            </Link>
            <Link to="/create-project" className={`${isActive('/create-project')} transition-colors duration-200`}>
              Create Project
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </div>
                <span>{user?.name || user?.username}</span>
                <span>▼</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-700">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    onClick={() => setShowDropdown(false)}
                  >
                    👤 My Profile
                  </Link>
                  <Link
                    to="/search"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    onClick={() => setShowDropdown(false)}
                  >
                    🔍 Advanced Search
                  </Link>
                  <hr className="my-2 border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;