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
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async upload(endpoint, formData) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.sessionToken}`
      },
      body: formData
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  setSession(sessionToken, user) {
    this.sessionToken = sessionToken;
    this.user = user;
    
    if (sessionToken && user) {
      localStorage.setItem('sessionToken', sessionToken);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('user');
    }
  }

  async verifySession() {
    if (!this.sessionToken) {
      return false;
    }

    try {
      const response = await this.request('/auth/verify');
      this.user = response.user;
      localStorage.setItem('user', JSON.stringify(response.user));
      return true;
    } catch (error) {
      this.setSession(null, null);
      return false;
    }
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.setSession(null, null);
    }
  }

  isAuthenticated() {
    return !!this.sessionToken && !!this.user;
  }
}

export const apiClient = new ApiClient();