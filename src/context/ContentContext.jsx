import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { contentService } from '../services/api';

// Create context
const ContentContext = createContext();

// Content provider component
export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [cachedPages, setCachedPages] = useState({}); // Track which pages we've already fetched

  // Function to fetch content for a specific page
  const fetchPageContent = useCallback(async (pageName) => {
    // Check if we already have this page's content cached
    if (cachedPages[pageName]) {
      console.log(`Using cached content for ${pageName}`);
      return content[pageName];
    }

    setLoading(true);
    try {
      console.log(`Fetching content for ${pageName}`);
      const pageContent = await contentService.getPageContent(pageName);
      
      // Update state with new content
      setContent(prevContent => ({
        ...prevContent,
        [pageName]: pageContent
      }));
      
      // Mark this page as cached
      setCachedPages(prev => ({
        ...prev,
        [pageName]: true
      }));
      
      setError(null);
      return pageContent;
    } catch (err) {
      console.error(`Error loading content for ${pageName}:`, err);
      setError(`Error loading content for ${pageName}: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
      setIsContentLoaded(true);
    }
  }, [cachedPages, content]);

  // Function to get content for a specific section
  const getContentSection = useCallback((pageName, sectionKey, defaultValue = '') => {
    if (!content[pageName]) {
      return defaultValue;
    }
    
    return content[pageName][sectionKey] || defaultValue;
  }, [content]);

  // Function to clear the cache for a specific page or all pages
  const clearCache = useCallback((pageName = null) => {
    if (pageName) {
      setCachedPages(prev => {
        const updated = { ...prev };
        delete updated[pageName];
        return updated;
      });
    } else {
      setCachedPages({});
    }
  }, []);

  // Function to prefetch multiple pages
  const prefetchPages = useCallback(async (pageNames) => {
    const promises = pageNames.map(name => {
      if (!cachedPages[name]) {
        return fetchPageContent(name);
      }
      return Promise.resolve(content[name]);
    });
    
    try {
      await Promise.all(promises);
      return true;
    } catch (err) {
      console.error('Error prefetching pages:', err);
      return false;
    }
  }, [cachedPages, content, fetchPageContent]);

  // Values to be provided to consuming components
  const value = {
    content,
    loading,
    error,
    isContentLoaded,
    fetchPageContent,
    getContentSection,
    clearCache,
    prefetchPages,
    cachedPages
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