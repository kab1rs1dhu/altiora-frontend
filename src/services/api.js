import axios from 'axios';

// Configure the base URL for the API, using environment variable or default
// Fix: Replace process.env with import.meta.env for Vite compatibility
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
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
  // Add mock data for other pages as needed
};

// Content service functions
export const contentService = {
  // Get content for a specific page
  getPageContent: async (pageName) => {
    try {
      // Check if we're in development mode and using mock data
      // Fix: Replace process.env with import.meta.env for Vite compatibility
      if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        console.log('Using mock data for', pageName);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockPageContent[pageName] || {};
      }
      
      // Real API call
      const response = await apiClient.get(`/content/page/${pageName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page content:', error);
      
      // In development, fall back to mock data if API call fails
      // Fix: Replace process.env with import.meta.env for Vite compatibility
      if (import.meta.env.DEV) {
        console.log('Falling back to mock data for', pageName);
        return mockPageContent[pageName] || {};
      }
      
      throw error;
    }
  },

  // Get content for a specific section
  getSectionContent: async (pageName, sectionName) => {
    try {
      // Check if we're in development mode and using mock data
      // Fix: Replace process.env with import.meta.env for Vite compatibility
      if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        console.log('Using mock data for', pageName, sectionName);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockPageContent[pageName]?.[sectionName] || '';
      }
      
      // Real API call
      const response = await apiClient.get(`/content/section/${pageName}/${sectionName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching section content:', error);
      
      // In development, fall back to mock data if API call fails
      // Fix: Replace process.env with import.meta.env for Vite compatibility
      if (import.meta.env.DEV) {
        console.log('Falling back to mock data for', pageName, sectionName);
        return mockPageContent[pageName]?.[sectionName] || '';
      }
      
      throw error;
    }
  },
  
  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      // In development mode, mock the submission
      // Fix: Replace process.env with import.meta.env for Vite compatibility
      if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        console.log('Mock form submission:', formData);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true, message: 'Form submitted successfully' };
      }
      
      // Real API call
      const response = await apiClient.post('/contact/submit', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
};

export default apiClient;