import { useState, useEffect, useCallback, useRef } from 'react';

// Create a global request cache
const globalCache = new Map();

/**
 * Custom hook for API requests with built-in caching
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies to determine when to refetch
 * @param {Object} options - Additional options
 * @returns {Object} - { data, loading, error, refetch }
 */
function useApi(apiFunction, dependencies = [], options = {}) {
  const { 
    initialData = null,
    cacheKey = null,
    skipInitialFetch = false,
    onSuccess = null,
    onError = null,
    staleTime = 5 * 60 * 1000, // 5 minutes default stale time
    dedupingInterval = 2000 // 2 seconds deduping interval
  } = options;
  
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!skipInitialFetch);
  const [error, setError] = useState(null);
  
  // Use refs to keep track of in-flight requests and last fetch time
  const inFlightRequest = useRef(null);
  const lastFetchTime = useRef(null);
  
  // Generate a cache key if not provided
  const effectiveCacheKey = cacheKey || 
    apiFunction.toString() + (dependencies ? JSON.stringify(dependencies) : '');
  
  // Fetch function that handles caching
  const fetchData = useCallback(async (forceRefresh = false) => {
    // Check if we have a cached response that's not stale
    const cachedItem = globalCache.get(effectiveCacheKey);
    const now = Date.now();
    
    if (
      !forceRefresh && 
      cachedItem && 
      now - cachedItem.timestamp < staleTime
    ) {
      setData(cachedItem.data);
      setLoading(false);
      setError(null);
      return cachedItem.data;
    }
    
    // Check if there's already an in-flight request for this resource
    if (inFlightRequest.current && now - lastFetchTime.current < dedupingInterval) {
      return inFlightRequest.current;
    }
    
    // Start loading
    setLoading(true);
    
    // Create and store the promise
    lastFetchTime.current = now;
    inFlightRequest.current = apiFunction();
    
    try {
      // Await the result
      const result = await inFlightRequest.current;
      
      // Update cache
      globalCache.set(effectiveCacheKey, {
        data: result,
        timestamp: Date.now()
      });
      
      // Update state
      setData(result);
      setError(null);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      console.error('API Error:', err);
      setError(err);
      
      // Call error callback if provided
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
      inFlightRequest.current = null;
    }
  }, [apiFunction, effectiveCacheKey, staleTime, dedupingInterval, onSuccess, onError]);
  
  // Effect to fetch data when dependencies change
  useEffect(() => {
    if (skipInitialFetch) return;
    
    fetchData().catch(err => {
      console.error('Failed to fetch data:', err);
    });
  }, [...dependencies, effectiveCacheKey]);
  
  // Return data, loading state, error, and refetch function
  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Static methods for cache management
useApi.clearCache = (key = null) => {
  if (key) {
    globalCache.delete(key);
  } else {
    globalCache.clear();
  }
};

useApi.prefetch = async (apiFunction, cacheKey) => {
  try {
    const effectiveCacheKey = cacheKey || apiFunction.toString();
    const result = await apiFunction();
    
    globalCache.set(effectiveCacheKey, {
      data: result,
      timestamp: Date.now()
    });
    
    return result;
  } catch (error) {
    console.error('Prefetch error:', error);
    throw error;
  }
};

export default useApi;