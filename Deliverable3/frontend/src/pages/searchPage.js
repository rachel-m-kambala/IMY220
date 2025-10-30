//Mukaji Mweni Rachel Kambala u23559129 position-24

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiClient } from '../utils/api.js';
import ProjectCard from '../components/project/projectCard.js';

const SearchPage = ({ user }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchType, setSearchType] = useState('all'); // 'all', 'projects', 'users'
  const [results, setResults] = useState({ projects: [], users: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, searchType]);

  const performSearch = async () => {
    try {
      setLoading(true);
      setError('');

      setSearchParams({ q: query });

      const projectsResponse = await apiClient.request('/projects');
      const allProjects = projectsResponse.projects || [];

      const usersResponse = await apiClient.request('/users');
      const allUsers = usersResponse.users || [];

      const filteredProjects = allProjects.filter(project => 
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        (project.tags && project.tags.some(tag => 
          tag.toLowerCase().includes(query.toLowerCase())
        ))
      );

      const filteredUsers = allUsers.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        (user.name && user.name.toLowerCase().includes(query.toLowerCase())) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );

      setResults({
        projects: filteredProjects,
        users: filteredUsers
      });

    } catch (error) {
      setError('Search failed');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch();
    }
  };

  const totalResults = results.projects.length + results.users.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search CodeSync</h1>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for projects, users, or technologies..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        <div className="flex space-x-4">
          <button
            onClick={() => setSearchType('all')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              searchType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({totalResults})
          </button>
          <button
            onClick={() => setSearchType('projects')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              searchType === 'projects'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Projects ({results.projects.length})
          </button>
          <button
            onClick={() => setSearchType('users')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              searchType === 'users'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Users ({results.users.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {query && (
        <div>
          {(searchType === 'all' || searchType === 'projects') && results.projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Projects ({results.projects.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.projects.map(project => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </section>
          )}

          {(searchType === 'all' || searchType === 'users') && results.users.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Users ({results.users.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.users.map(user => (
                  <div key={user._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0) || user.username.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{user.name || user.username}</h3>
                        <p className="text-gray-600 text-sm">@{user.username}</p>
                        {user.occupation && (
                          <p className="text-blue-600 text-sm">{user.occupation}</p>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => window.location.href = `/profile/${user._id}`}
                      className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {totalResults === 0 && query && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600">
                No projects or users found for "{query}". Try different keywords or check the spelling.
              </p>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💡</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Searching</h3>
          <p className="text-gray-600">
            Enter a search term above to find projects, users, or technologies on CodeSync.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;