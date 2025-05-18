import { createContext, useState, useContext, useEffect } from 'react';
import { contentService } from '../services/api';

// Create context
const ContentContext = createContext();

// Content provider component
export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  // Function to fetch content for a specific page
  const fetchPageContent = async (pageName) => {
    setLoading(true);
    try {
      const pageContent = await contentService.getPageContent(pageName);
      
      // Update state with new content
      setContent(prevContent => ({
        ...prevContent,
        [pageName]: pageContent
      }));
      
      setError(null);
      return pageContent;
    } catch (err) {
      setError(`Error loading content for ${pageName}: ${err.message}`);
      console.error(`Error loading content for ${pageName}:`, err);
      return null;
    } finally {
      setLoading(false);
      setIsContentLoaded(true);
    }
  };

  // Function to get content for a specific section
  const getContentSection = (pageName, sectionKey, defaultValue = '') => {
    if (!content[pageName]) {
      return defaultValue;
    }
    
    return content[pageName][sectionKey] || defaultValue;
  };

  // Values to be provided to consuming components
  const value = {
    content,
    loading,
    error,
    isContentLoaded,
    fetchPageContent,
    getContentSection
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

// Hook for using content context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export default ContentContext;