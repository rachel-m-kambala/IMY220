//Mukaji Mweni Rachel Kambala u23559129 position-24

const API_BASE = 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.sessionToken = localStorage.getItem('sessionToken');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (this.sessionToken) {
      config.headers.Authorization = `Bearer ${this.sessionToken}`;
    }

    try {
      const response = await fetch(url, config);
      
      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json') 
        ? await response.json() 
        : await response.text();

      if (!response.ok) {
        throw new Error(typeof data === 'object' ? data.message : 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Updated to handle your user data structure
  setSession(sessionToken, user) {
    this.sessionToken = sessionToken;
    this.user = user;
    
    if (sessionToken && user) {
      localStorage.setItem('sessionToken', sessionToken);
      
      // Ensure user has all required fields for frontend
      const userWithDefaults = {
        id: user.id || user._id,
        username: user.username,
        email: user.email,
        name: user.name || user.username,
        profilePicture: user.profilePicture || '',
        bio: user.bio || '',
        isAdmin: user.isAdmin || false,
        ...user
      };
      
      localStorage.setItem('user', JSON.stringify(userWithDefaults));
      this.user = userWithDefaults;
    } else {
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('user');
      this.user = null;
    }
  }

  // Updated user profile display component
  getUserDisplayName() {
    if (!this.user) return 'User';
    return this.user.name || this.user.username;
  }

  // Updated project data formatting
  formatProjectForDisplay(project) {
    return {
      ...project,
      displayName: project.name,
      displayTags: project.allTags || project.tags || project.hashtags || [],
      ownerName: project.owner?.name || project.owner?.username || 'Unknown'
    };
  }
}

export const apiClient = new ApiClient();