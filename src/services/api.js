import axios from 'axios';

// Configure the base URL for the API, using environment variable or default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Content service functions
export const contentService = {
  // Get content for a specific page
  getPageContent: async (pageName) => {
    try {
      const response = await apiClient.get(`/content/page/${pageName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page content:', error);
      throw error;
    }
  },

  // Get content for a specific section
  getSectionContent: async (pageName, sectionName) => {
    try {
      const response = await apiClient.get(`/content/section/${pageName}/${sectionName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching section content:', error);
      throw error;
    }
  }
};

export default apiClient;