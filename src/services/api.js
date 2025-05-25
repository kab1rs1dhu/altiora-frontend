import axios from 'axios';

// Configure the base URL for the API, using environment variable or default
// Use Vite's import.meta.env syntax
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Maximum number of retries for API calls
const MAX_RETRIES = 2;

// Timeout for API calls in milliseconds
const API_TIMEOUT = 5000;

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: API_TIMEOUT
});

// Mock data for development until backend is ready
const mockPageContent = {
  home: {
    heroTitle: 'Elevate Your Business with Strategic Digital Marketing',
    heroSubtitle: 'Altiora helps businesses grow through custom digital strategies, innovative development, and data-driven marketing solutions.',
    servicesTitle: 'Our Services',
    servicesDescription: 'Comprehensive digital marketing solutions tailored to your business needs',
    whyChooseTitle: 'Why Choose Altiora',
    whyChooseDescription: 'We deliver measurable results with a client-centered approach',
    ctaTitle: 'Ready to Grow Your Business?',
    ctaDescription: 'Schedule a free consultation with our digital marketing experts today.',
    services: JSON.stringify([
      {
        icon: 'fa-solid fa-magnifying-glass',
        title: 'Search Engine Optimization',
        description: 'Improve your online visibility and drive organic traffic with our data-driven SEO strategies.',
        link: '/seo'
      },
      {
        icon: 'fa-solid fa-rectangle-ad',
        title: 'PPC Advertising',
        description: 'Generate immediate results with targeted pay-per-click campaigns optimized for ROI.',
        link: '/ppc'
      },
      {
        icon: 'fa-solid fa-laptop-code',
        title: 'Web Development',
        description: 'Create stunning, high-performing websites that convert visitors into customers.',
        link: '/web-development'
      },
      {
        icon: 'fa-solid fa-mobile-screen',
        title: 'Mobile App Development',
        description: 'Build innovative mobile applications that engage users and drive business growth.',
        link: '/mobile-development'
      },
      {
        icon: 'fa-solid fa-chart-line',
        title: 'Lead Generation',
        description: 'Capture high-quality leads with proven strategies that fill your sales pipeline.',
        link: '/lead-generation'
      },
      {
        icon: 'fa-solid fa-calendar-check',
        title: 'Appointment Setting',
        description: 'Fill your calendar with qualified prospects through our appointment setting services.',
        link: '/appointment-setting'
      }
    ]),
    whyChoosePoints: JSON.stringify([
      {
        icon: 'fa-solid fa-bullseye',
        title: 'Data-Driven Strategies',
        description: 'We base all our marketing decisions on analytics and performance data to ensure optimal results.'
      },
      {
        icon: 'fa-solid fa-users',
        title: 'Expert Team',
        description: 'Our seasoned professionals have years of experience across various industries and digital platforms.'
      },
      {
        icon: 'fa-solid fa-handshake',
        title: 'Customized Solutions',
        description: 'We don\'t believe in one-size-fits-all. Every strategy is tailored to your specific business goals.'
      },
      {
        icon: 'fa-solid fa-chart-simple',
        title: 'Transparent Reporting',
        description: 'Get regular insights into your campaign performance with easy-to-understand reports.'
      }
    ])
  },
  seo: {
    heroTitle: 'Search Engine Optimization',
    heroDescription: 'Drive organic traffic and boost your website\'s visibility with our data-driven SEO strategies.',
    overviewTitle: 'Elevate Your Online Presence',
    overviewContent: 'In today\'s digital landscape, ranking high in search engines is crucial for your business\'s success. Our comprehensive SEO services are designed to increase your website\'s visibility, drive targeted traffic, and improve conversion rates.\n\nAt Altiora, we take a holistic approach to SEO, combining technical optimization, content strategy, and link building to create sustainable growth for your business. We don\'t just focus on rankings—we deliver real business results.',
    // Add more mock data as needed
  },
  // Add mock data for other pages
  ppc: {
    heroTitle: 'PPC Advertising',
    heroDescription: 'Drive targeted traffic and generate immediate results with our data-driven pay-per-click campaigns.',
    // Rest of PPC content
  },
  'web-development': {
    heroTitle: 'Web Development',
    heroDescription: 'Create stunning, high-performing websites that convert visitors into customers.',
    // Rest of web development content
  },
  'mobile-development': {
    heroTitle: 'Mobile App Development',
    heroDescription: 'Build innovative mobile applications that engage users and drive business growth.',
    // Rest of mobile development content
  },
  'lead-generation': {
    heroTitle: 'Lead Generation',
    heroDescription: 'Capture high-quality leads with proven strategies that fill your sales pipeline.',
    // Rest of lead generation content
  },
  'appointment-setting': {
    heroTitle: 'Appointment Setting',
    heroDescription: 'Fill your calendar with qualified prospects through our appointment setting services.',
    // Rest of appointment setting content
  },
  contact: {
    heroTitle: 'Get In Touch',
    heroDescription: 'We\'d love to hear from you. Let\'s discuss how we can help grow your business.',
    // Rest of contact content
  }
};

// Memory cache for API responses
const apiCache = new Map();

// Async function to handle API calls with retry logic and caching
const makeApiCall = async (endpoint, options = {}, retries = 0) => {
  // Check cache first (if caching is enabled and it's a GET request)
  const cacheKey = `${options.method || 'GET'}-${endpoint}-${JSON.stringify(options.data || {})}`;
  const useCache = options.useCache !== false && (!options.method || options.method === 'GET');
  
  if (useCache && apiCache.has(cacheKey)) {
    console.log(`Using cached response for: ${cacheKey}`);
    return apiCache.get(cacheKey);
  }
  
  try {
    const response = await apiClient(endpoint, options);
    
    // Cache the successful response (if it's a GET request)
    if (useCache) {
      apiCache.set(cacheKey, response.data);
    }
    
    return response.data;
  } catch (error) {
    // Handle retries if we haven't exceeded the maximum
    if (retries < MAX_RETRIES) {
      console.warn(`API call failed, retrying (${retries + 1}/${MAX_RETRIES}):`, endpoint);
      // Exponential backoff: wait longer between each retry
      const delay = Math.pow(2, retries) * 300; 
      await new Promise(resolve => setTimeout(resolve, delay));
      return makeApiCall(endpoint, options, retries + 1);
    }
    
    // If we've exhausted retries or it's not a network error, throw the error
    console.error('API call failed after retries:', error);
    throw error;
  }
};

// Clear the entire cache or a specific endpoint
const clearCache = (endpoint = null) => {
  if (endpoint) {
    // Clear specific endpoint matches
    apiCache.forEach((value, key) => {
      if (key.includes(endpoint)) {
        apiCache.delete(key);
      }
    });
  } else {
    // Clear the entire cache
    apiCache.clear();
  }
};

// Content service functions
export const contentService = {
  // Get content for a specific page
  getPageContent: async (pageName, options = {}) => {
    try {
      // Check if we're in development mode and using mock data
      if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        console.log('Using mock data for', pageName);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200));
        return mockPageContent[pageName] || {};
      }
      
      // Real API call with caching
      return await makeApiCall(`/content/page/${pageName}`, {
        ...options,
        useCache: true
      });
    } catch (error) {
      console.error('Error fetching page content:', error);
      
      // In development, fall back to mock data if API call fails
      if (import.meta.env.DEV) {
        console.log('Falling back to mock data for', pageName);
        return mockPageContent[pageName] || {};
      }
      
      throw error;
    }
  },

  // Get content for a specific section
  getSectionContent: async (pageName, sectionKey, options = {}) => {
    try {
      // Check if we're in development mode and using mock data
      if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        console.log('Using mock data for', pageName, sectionKey);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        return mockPageContent[pageName]?.[sectionKey] || '';
      }
      
      // Real API call with caching
      return await makeApiCall(`/content/section/${pageName}/${sectionKey}`, {
        ...options,
        useCache: true
      });
    } catch (error) {
      console.error('Error fetching section content:', error);
      
      // In development, fall back to mock data if API call fails
      if (import.meta.env.DEV) {
        console.log('Falling back to mock data for', pageName, sectionKey);
        return mockPageContent[pageName]?.[sectionKey] || '';
      }
      
      throw error;
    }
  },
  
  // Submit contact form
  submitContactForm: async (formData, options = {}) => {
    try {
      // In development mode, mock the submission
      if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        console.log('Mock form submission:', formData);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true, message: 'Form submitted successfully' };
      }
      
      // Real API call (no caching for POST requests)
      return await makeApiCall('/contact/submit', {
        ...options,
        method: 'POST',
        data: formData,
        useCache: false
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
  
  // Clear API cache
  clearCache
};

// Export the API client and cache utilities
export default {
  client: apiClient,
  makeApiCall,
  clearCache
};