import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'
import '../styles/WebDevelopment.css' // Import our new CSS file

const WebDevelopment = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [expandedSteps, setExpandedSteps] = useState([])
  const [activeFaqTab, setActiveFaqTab] = useState('general')
  const [activeTechTab, setActiveTechTab] = useState('frontend')
  
  // Refs for scroll animations
  const processRef = useRef(null)
  const resultsRef = useRef(null)
  const faqRef = useRef(null)
  const techRef = useRef(null)
  const whyChooseRef = useRef(null)
  const portfolioRef = useRef(null)
  
  // Animation states
  const [visibleProcessSteps, setVisibleProcessSteps] = useState([])
  const [visibleResults, setVisibleResults] = useState([])
  const [visibleFaqs, setVisibleFaqs] = useState([])
  const [visibleTechItems, setVisibleTechItems] = useState([])
  const [visibleWhyChooseItems, setVisibleWhyChooseItems] = useState([])
  const [visiblePortfolioItems, setVisiblePortfolioItems] = useState([])
  
  // Toggle process step details
  const toggleProcessDetails = (e, index) => {
    e.preventDefault()
    setExpandedSteps(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }
  
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('web-development')
      setPageContent(content)
    }
    
    loadContent()
  }, [fetchPageContent])
  
  // Handle scroll animation
  useEffect(() => {
  const handleScroll = () => {
    const animateElements = (elements, visibleArray, setVisibleFunc) => {
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.85 && !visibleArray.includes(index)) {
          setVisibleFunc(prev => [...prev, index]);
        }
      });
    };
    
    // Process steps animation
    if (processRef.current) {
      animateElements(
        processRef.current.querySelectorAll('.process-step'), 
        visibleProcessSteps, 
        setVisibleProcessSteps
      );
    }
    
    // Results animation
    if (resultsRef.current) {
      animateElements(
        resultsRef.current.querySelectorAll('.result-card'), 
        visibleResults, 
        setVisibleResults
      );
    }
    
    // FAQ animation
    if (faqRef.current) {
      animateElements(
        faqRef.current.querySelectorAll('.faq-item'), 
        visibleFaqs, 
        setVisibleFaqs
      );
    }

    // Tech items animation
    if (techRef.current) {
      animateElements(
        techRef.current.querySelectorAll('.technology-category'), 
        visibleTechItems, 
        setVisibleTechItems
      );
    }

    // Why Choose Us animation
    if (whyChooseRef.current) {
      animateElements(
        whyChooseRef.current.querySelectorAll('.why-choose-card'), 
        visibleWhyChooseItems, 
        setVisibleWhyChooseItems
      );
    }

    // Portfolio animation
    if (portfolioRef.current) {
      animateElements(
        portfolioRef.current.querySelectorAll('.portfolio-item'), 
        visiblePortfolioItems, 
        setVisiblePortfolioItems
      );
    }
  };
  
  // Add passive flag to improve scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial check with a slight delay to ensure the DOM is fully rendered
  const timer = setTimeout(handleScroll, 300);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(timer);
  };
}, [visibleProcessSteps, visibleResults, visibleFaqs, visibleTechItems, visibleWhyChooseItems, visiblePortfolioItems]);

  useEffect(() => {
  // Reset visible tech items when tab changes
  setVisibleTechItems([]);
  
  // Trigger animation for new tab items
  setTimeout(() => {
    if (techRef.current) {
      const techItems = techRef.current.querySelectorAll('.technology-category');
      techItems.forEach((_, index) => {
        setVisibleTechItems(prev => [...prev, index]);
      });
    }
  }, 100);
}, [activeTechTab]);
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  // If content is still loading, show a loading spinner
  if (loading && !pageContent) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading content...</p>
      </div>
    )
  }
  
  // If there was an error loading content, show an error message
  if (error && !pageContent) {
    return (
      <div className="error-container">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
        <button onClick={() => fetchPageContent('web-development')} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }
  
  // Use default content if API data not available yet
  const heroTitle = getContentSection('web-development', 'heroTitle', 'Web Development')
  const heroDescription = getContentSection('web-development', 'heroDescription', 'Create stunning, high-performing websites that convert visitors into customers.')
  const overviewTitle = getContentSection('web-development', 'overviewTitle', 'Custom Web Solutions for Your Business')
  const overviewContent = getContentSection('web-development', 'overviewContent', 'In today\'s digital world, your website is often the first interaction customers have with your brand. Our web development services ensure that this first impression is not just good, but exceptional.\n\nAt Altiora, we build custom websites that are designed with both users and search engines in mind. From sleek marketing sites to robust e-commerce platforms, we create digital experiences that drive results.')
  const servicesTitle = getContentSection('web-development', 'servicesTitle', 'Our Web Development Services')
  const processTitle = getContentSection('web-development', 'processTitle', 'Our Web Development Process')
  const technologiesTitle = getContentSection('web-development', 'technologiesTitle', 'Technologies We Work With')
  const technologiesDescription = getContentSection('web-development', 'technologiesDescription', 'We use the latest technologies and frameworks to build modern, scalable web applications')
  const whyChooseTitle = getContentSection('web-development', 'whyChooseTitle', 'Why Choose Us for Web Development')
  const faqTitle = getContentSection('web-development', 'faqTitle', 'Frequently Asked Questions')
  const ctaTitle = getContentSection('web-development', 'ctaTitle', 'Ready to Build Your Dream Website?')
  const ctaDescription = getContentSection('web-development', 'ctaDescription', 'Let\'s discuss how we can create a website that drives results for your business.')
  const resultsTitle = getContentSection('web-development', 'resultsTitle', 'Results You Can Expect')
  const portfolioTitle = getContentSection('web-development', 'portfolioTitle', 'Our Web Development Portfolio')
  const approachTitle = getContentSection('web-development', 'approachTitle', 'Our Development Approach')
  
  // Parse services from the API response, or use default services
  let services = []
  try {
    services = JSON.parse(getContentSection('web-development', 'services', '[]'))
  } catch (err) {
    console.error('Error parsing services:', err)
    // Default services
    services = [
      {
        icon: '💻',
        title: 'Custom Website Development',
        description: 'We build tailored websites from scratch that align with your brand, business goals, and user needs.'
      },
      {
        icon: '🛒',
        title: 'E-commerce Development',
        description: 'Create powerful online stores with secure payment processing, inventory management, and a seamless shopping experience.'
      },
      {
        icon: '🎨',
        title: 'UI/UX Design',
        description: 'Craft intuitive, engaging user experiences with thoughtful information architecture and visually appealing designs.'
      },
      {
        icon: '📱',
        title: 'Responsive Web Design',
        description: 'Ensure your website looks and performs perfectly on all devices, from desktops to smartphones.'
      },
      {
        icon: '⚡',
        title: 'Web Performance Optimization',
        description: 'Improve page load times, optimize images, and enhance server response for a faster, smoother user experience.'
      },
      {
        icon: '⚙️',
        title: 'CMS Integration',
        description: 'Implement user-friendly content management systems like WordPress that make it easy to update your website.'
      }
    ]
  }
  
  // Parse process steps from the API response, or use default steps
  let processSteps = []
  try {
    processSteps = JSON.parse(getContentSection('web-development', 'processSteps', '[]'))
  } catch (err) {
    console.error('Error parsing process steps:', err)
    // Default process steps
    processSteps = [
      {
        number: 1,
        title: 'Discovery & Planning',
        description: 'We analyze your business goals, target audience, and competition to develop a strategic website plan.'
      },
      {
        number: 2,
        title: 'Design & Wireframing',
        description: 'We create wireframes and visual designs that focus on user experience, aesthetics, and conversion optimization.'
      },
      {
        number: 3,
        title: 'Development',
        description: 'Our developers bring the designs to life with clean, efficient code and modern development practices.'
      },
      {
        number: 4,
        title: 'Testing & Quality Assurance',
        description: 'We thoroughly test your website across devices and browsers to ensure everything works flawlessly.'
      },
      {
        number: 5,
        title: 'Launch & Maintenance',
        description: 'After launch, we provide ongoing support, updates, and performance monitoring to keep your site running smoothly.'
      }
    ]
  }
  // Results data
  const results = [
    {
      icon: '📈',
      title: 'Increased Conversions',
      description: 'Strategically designed websites with clear user journeys and compelling CTAs lead to higher conversion rates.'
    },
    {
      icon: '🔍',
      title: 'Better Search Rankings',
      description: 'Our SEO-friendly development practices help your site rank higher in search results, driving more organic traffic.'
    },
    {
      icon: '📱',
      title: 'Seamless Mobile Experience',
      description: 'Responsive design ensures your website performs beautifully across all devices and screen sizes.'
    },
    {
      icon: '⚡',
      title: 'Faster Load Times',
      description: 'Optimized performance means better user experience, higher engagement, and improved conversion rates.'
    }
  ]

  // Technologies data organized by category
  const technologies = {
    frontend: [
      'HTML5 / CSS3',
      'JavaScript (ES6+)',
      'React',
      'Angular',
      'Vue.js',
      'TypeScript',
      'Next.js',
      'Gatsby'
    ],
    backend: [
      'Node.js',
      'Java Spring Boot',
      'Python (Django, Flask)',
      'PHP (Laravel)',
      '.NET',
      'Ruby on Rails',
      'Express.js',
      'NestJS'
    ],
    database: [
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Firebase',
      'Elasticsearch',
      'AWS DynamoDB',
      'SQLite'
    ],
    cms: [
      'WordPress',
      'Drupal',
      'Shopify',
      'Contentful',
      'Strapi',
      'Sanity',
      'Webflow',
      'Ghost'
    ]
  }

  // Why Choose Us items
  const whyChooseItems = [
    {
      icon: '🎯',
      title: 'Strategic Approach',
      description: 'We don\'t just build websites; we create strategic digital assets designed to achieve your business goals.',
      dataFeature: 'strategic'
    },
    {
      icon: '👥',
      title: 'User-Centered Design',
      description: 'We place your users at the center of the design process, creating intuitive experiences that convert.',
      dataFeature: 'user-centered'
    },
    {
      icon: '🔍',
      title: 'SEO-Friendly Development',
      description: 'Our websites are built with search engines in mind, helping you rank higher and attract more organic traffic.',
      dataFeature: 'seo'
    },
    {
      icon: '📱',
      title: 'Mobile-First Approach',
      description: 'We ensure your website delivers an excellent experience across all devices, especially mobile.',
      dataFeature: 'mobile'
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'We build fast-loading websites that provide a smooth user experience and better search rankings.',
      dataFeature: 'performance'
    },
    {
      icon: '🔒',
      title: 'Security Focus',
      description: 'We implement robust security measures to protect your website and your users\' data from threats.',
      dataFeature: 'security'
    }
  ]

  // Portfolio items
  const portfolioItems = [
    {
      image: '/images/portfolio-1.jpg',
      title: 'E-commerce Platform',
      description: 'A custom e-commerce solution with advanced product filtering and seamless checkout experience.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      image: '/images/portfolio-2.jpg',
      title: 'Corporate Website',
      description: 'A modern, responsive website for a financial services company with custom CMS integration.',
      tags: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
      link: '#'
    },
    {
      image: '/images/portfolio-3.jpg',
      title: 'SaaS Application',
      description: 'A subscription-based SaaS platform with user authentication and interactive dashboard.',
      tags: ['Vue.js', 'Express.js', 'PostgreSQL', 'AWS'],
      link: '#'
    }
  ]

  // Development approach steps
  const approachSteps = [
    {
      number: '01',
      title: 'Collaborative Process',
      description: 'We work closely with you throughout the development process, ensuring your vision is reflected in the final product while benefiting from our expertise.'
    },
    {
      number: '02',
      title: 'Agile Methodology',
      description: 'Our agile approach allows for flexibility, continuous improvement, and regular delivery of working software throughout the development lifecycle.'
    },
    {
      number: '03',
      title: 'Quality Assurance',
      description: 'We implement rigorous testing procedures to ensure your website is bug-free, secure, and delivers a seamless user experience across all platforms.'
    },
    {
      number: '04',
      title: 'Future-Proof Solutions',
      description: 'We build scalable, maintainable websites using modern technologies and best practices that allow for easy updates and expansion as your business grows.'
    }
  ]
  
  // Testimonials data
  const testimonials = [
    {
      quote: "Altiora transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. The increased site speed and mobile responsiveness have significantly improved our conversion rates.",
      name: "David Wilson",
      position: "Marketing Director",
      company: "Innovate Financial",
      avatar: "/images/testimonial-1.jpg"
    },
    {
      quote: "Working with Altiora's web development team was a seamless experience. They understood our business needs and delivered a custom e-commerce solution that has helped us increase online sales by 45% in just three months.",
      name: "Jennifer Lee",
      position: "E-commerce Manager",
      company: "StyleHouse",
      avatar: "/images/testimonial-2.jpg"
    },
    {
      quote: "The team at Altiora not only built us a beautiful website but also educated us on how to maintain and update it. Their technical expertise combined with their focus on business outcomes made them the perfect development partner.",
      name: "Robert Johnson",
      position: "CEO",
      company: "TechStart Solutions",
      avatar: "/images/testimonial-3.jpg"
    }
  ]
  
  // Parse FAQ items from the API response, or use default FAQ items
  let faqItems = {
    general: [
      {
        question: 'How long does it take to develop a website?',
        answer: 'The timeline varies based on complexity. A simple informational website might take 4-6 weeks, while a complex e-commerce platform could take 3-4 months. We\'ll provide a detailed timeline during the planning phase of your project.'
      },
      {
        question: 'How much does a website cost?',
        answer: 'Website costs depend on your specific requirements, features, and complexity. We provide custom quotes based on your needs after an initial consultation. We\'re transparent about pricing and work within various budgets.'
      },
      {
        question: 'Will my website be mobile-friendly?',
        answer: 'Absolutely! All our websites are built with responsive design principles, ensuring they look and function perfectly on all devices, from desktop computers to tablets and smartphones.'
      },
      {
        question: 'Do you provide website maintenance?',
        answer: 'Yes, we offer ongoing maintenance packages to keep your website secure, up-to-date, and performing optimally. This includes regular updates, security monitoring, backup, and technical support.'
      }
    ],
    technical: [
      {
        question: 'What technologies do you use for web development?',
        answer: 'We use a variety of modern technologies depending on your project requirements. For frontend development, we use HTML5, CSS3, JavaScript, and frameworks like React, Angular, or Vue.js. For backend development, we work with Node.js, PHP, Python, and more. We\'ll recommend the best technology stack based on your specific needs.'
      },
      {
        question: 'Can you integrate my website with other systems?',
        answer: 'Yes, we specialize in integrating websites with CRMs, payment gateways, marketing automation tools, analytics platforms, and other third-party services. We create seamless connections through APIs and custom development to ensure your website works with your existing business systems.'
      },
      {
        question: 'How do you ensure website security?',
        answer: 'We implement multiple security measures including secure coding practices, regular updates, SSL certificates, data encryption, input validation, firewall configuration, and security monitoring. We also conduct security audits and testing to identify and address potential vulnerabilities.'
      },
      {
        question: 'Can you help with website hosting and domain registration?',
        answer: 'Yes, we provide guidance on selecting the appropriate hosting environment for your website based on your needs and budget. We can handle the technical aspects of setting up hosting, domain registration, DNS configuration, and email services to ensure a smooth launch.'
      }
    ],
    ecommerce: [
      {
        question: 'What e-commerce platforms do you work with?',
        answer: 'We work with multiple e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, and custom solutions. We will recommend the best platform based on your business needs, product catalog size, customization requirements, and budget.'
      },
      {
        question: 'How do you handle payment processing for online stores?',
        answer: 'We integrate secure payment gateways like Stripe, PayPal, Square, Authorize.net, and others based on your location and business requirements. We ensure PCI compliance and implement industry-standard security measures to protect customer payment information.'
      },
      {
        question: 'Can you migrate my existing online store to a new platform?',
        answer: 'Yes, we have extensive experience migrating e-commerce stores between platforms. We carefully transfer product data, customer information, order history, and other essential elements while minimizing disruption to your business operations.'
      },
      {
        question: 'Do you build custom e-commerce features?',
        answer: 'Absolutely. We develop custom features such as product configurators, subscription systems, membership areas, advanced search functionality, personalized product recommendations, and unique checkout experiences tailored to your specific business requirements.'
      }
    ]
  }
  
  return (
    <>
      {/* Hero Section with Particles */}
      <section className="service-hero webdev-hero">
        <div className="webdev-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="webdev-particle"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        <div className="container">
          <div className="service-hero-content">
            <h1>{heroTitle}</h1>
            <p className="service-hero-description">
              {heroDescription}
            </p>
            <Link to="/contact" className="btn btn-primary">Get a Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section webdev-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>{overviewTitle}</h2>
              {overviewContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <div className="overview-stats">
                <div className="stat">
                  <h3>94%</h3>
                  <p>of first impressions are design-related</p>
                </div>
                <div className="stat">
                  <h3>3s</h3>
                  <p>or less is the optimal page load time</p>
                </div>
                <div className="stat">
                  <h3>67%</h3>
                  <p>of users prefer a well-designed website</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/web-development-overview.svg" alt="Web Development" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-details-section webdev-services">
        <div className="container">
          <h2 className="section-title text-center">{servicesTitle}</h2>
          <div className="service-details-grid">
            {services.map((service, index) => (
              <div className="service-detail-card" key={index}>
                <div className="service-detail-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Approach Section */}
      <section className="section approach-section">
        <div className="container approach-container">
          <h2 className="section-title text-center">{approachTitle || 'Our Development Approach'}</h2>
          <p className="section-description text-center">
            Our methodology ensures we deliver high-quality websites that meet your business objectives
          </p>
          
          <div className="approach-grid">
            {approachSteps.map((step, index) => (
              <div 
                className={`approach-card ${visibleWhyChooseItems.includes(index) ? 'visible' : ''}`} 
                key={index}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="approach-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section with Enhanced Content and Animation */}
      <section className="section process-section webdev-process" ref={processRef}>
        <div className="container">
          <h2 className="section-title text-center">{processTitle}</h2>
          <p className="section-description text-center">
            Our proven development methodology delivers consistent results through a structured approach
          </p>
          
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div 
                className={`process-step ${visibleProcessSteps.includes(index) ? 'visible' : ''} ${expandedSteps.includes(index) ? 'has-expanded' : ''}`} 
                key={index}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="process-step-number">{step.number}</div>
                <div className="process-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  
                  {/* Enhanced content for each process step */}
                  <div className="process-step-details">
                    {index === 0 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Comprehensive business requirements gathering</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Competitor analysis and market research</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Target audience identification and persona development</span>
                        </div>
                      </>
                    )}
                    
                    {index === 1 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Information architecture and site mapping</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Low and high fidelity wireframes</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>UI design with brand alignment and conversion optimization</span>
                        </div>
                      </>
                    )}
                    
                    {index === 2 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Frontend development with responsive design</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Backend systems integration and database setup</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Performance optimization and SEO implementation</span>
                        </div>
                      </>
                    )}
                    
                    {index === 3 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Cross-browser and cross-device testing</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Functionality and user experience validation</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Security testing and performance benchmarking</span>
                        </div>
                      </>
                    )}
                    
                    {index === 4 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Domain setup and deployment</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Training and documentation for content management</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Ongoing support and performance monitoring</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="process-step-action">
                    <button className="process-step-toggle" onClick={(e) => toggleProcessDetails(e, index)}>
                      <span>{expandedSteps.includes(index) ? 'Show Less' : 'Show More'}</span>
                      <i className={`fa-solid ${expandedSteps.includes(index) ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="process-cta">
            <p>Ready to start your web development project with us?</p>
            <Link to="/contact" className="btn btn-primary">Get a Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section webdev-technologies" ref={techRef}>
        <div className="container">
          <h2 className="section-title text-center">{technologiesTitle}</h2>
          <p className="section-description text-center">
            {technologiesDescription}
          </p>
          
          <div className="faq-tabs">
            <button 
              className={`faq-tab ${activeTechTab === 'frontend' ? 'active' : ''}`} 
              onClick={() => setActiveTechTab('frontend')}
            >
              Frontend
            </button>
            <button 
              className={`faq-tab ${activeTechTab === 'backend' ? 'active' : ''}`} 
              onClick={() => setActiveTechTab('backend')}
            >
              Backend
            </button>
            <button 
              className={`faq-tab ${activeTechTab === 'database' ? 'active' : ''}`} 
              onClick={() => setActiveTechTab('database')}
            >
              Database
            </button>
            <button 
              className={`faq-tab ${activeTechTab === 'cms' ? 'active' : ''}`} 
              onClick={() => setActiveTechTab('cms')}
            >
              CMS
            </button>
          </div>


<div className="technology-grid">
  {activeTechTab === 'frontend' && (
    <>
      {technologies.frontend.map((tech, index) => (
        <div 
          key={index}
          className={`technology-category ${visibleTechItems.includes(index) ? 'visible' : ''}`}
          style={{ transitionDelay: `${index * 0.1}s` }}
        >
          <h3>{tech}</h3>
          <div className="technology-progress">
            <div className="progress-bar" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
          </div>
        </div>
      ))}
    </>
  )}
  
  {activeTechTab === 'backend' && (
    <>
      {technologies.backend.map((tech, index) => (
        <div 
          key={index}
          className={`technology-category ${visibleTechItems.includes(index) ? 'visible' : ''}`}
          style={{ transitionDelay: `${index * 0.1}s` }}
        >
          <h3>{tech}</h3>
          <div className="technology-progress">
            <div className="progress-bar" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
          </div>
        </div>
      ))}
    </>
  )}
  
  {activeTechTab === 'database' && (
    <>
      {technologies.database.map((tech, index) => (
        <div 
          key={index}
          className={`technology-category ${visibleTechItems.includes(index) ? 'visible' : ''}`}
          style={{ transitionDelay: `${index * 0.1}s` }}
        >
          <h3>{tech}</h3>
          <div className="technology-progress">
            <div className="progress-bar" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
          </div>
        </div>
      ))}
    </>
  )}
  
  {activeTechTab === 'cms' && (
    <>
      {technologies.cms.map((tech, index) => (
        <div 
          key={index}
          className={`technology-category ${visibleTechItems.includes(index) ? 'visible' : ''}`}
          style={{ transitionDelay: `${index * 0.1}s` }}
        >
          <h3>{tech}</h3>
          <div className="technology-progress">
            <div className="progress-bar" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
          </div>
        </div>
      ))}
    </>
  )}
</div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section webdev-results" ref={resultsRef}>
        <div className="container">
          <h2 className="section-title text-center">{resultsTitle || 'Results You Can Expect'}</h2>
          <p className="section-description text-center">
            Our web development approach delivers measurable business outcomes
          </p>
          
          <div className="results-grid">
            {results.map((result, index) => (
              <div 
                className={`result-card ${visibleResults.includes(index) ? 'visible' : ''}`} 
                key={index} 
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="result-icon">
                  <i className="icon">{result.icon}</i>
                </div>
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-section webdev-why-choose" ref={whyChooseRef}>
        <div className="container why-choose-container">
          <div className="why-choose-header">
            <h2 className="section-title">{whyChooseTitle}</h2>
            <p className="section-description">
              What sets our web development services apart
            </p>
          </div>
          
          <div className="why-choose-grid">
            {whyChooseItems.map((item, index) => (
              <div 
                className={`why-choose-card ${visibleWhyChooseItems.includes(index) ? 'visible' : ''}`} 
                key={index}
                style={{ transitionDelay: `${index * 0.15}s` }}
                data-feature={item.dataFeature || ''}
              >
                <div className="why-choose-icon">
                  <i className="icon">{item.icon}</i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section webdev-portfolio" ref={portfolioRef}>
        <div className="container">
          <h2 className="section-title text-center">{portfolioTitle || 'Our Web Development Portfolio'}</h2>
          <p className="section-description text-center">
            Take a look at some of our recent web development projects
          </p>
          
          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <div 
                className={`portfolio-item ${visiblePortfolioItems.includes(index) ? 'visible' : ''}`} 
                key={index}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="portfolio-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="portfolio-tags">
                    {item.tags.map((tag, tagIndex) => (
                      <span className="portfolio-tag" key={tagIndex}>{tag}</span>
                    ))}
                  </div>
                  <Link to={item.link} className="portfolio-link">
                    View Project <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section webdev-testimonials">
        <div className="container">
          <h2 className="section-title text-center">What Our Clients Say</h2>
          <p className="section-description text-center">
            Hear from businesses that have transformed their online presence with our web development services
          </p>
          
          <div className="testimonials-container">
            <div className="testimonial-slider">
              <div className="testimonial-card">
                <p className="testimonial-quote">{testimonials[activeTestimonial].quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonials[activeTestimonial].name}</h4>
                    <p>{testimonials[activeTestimonial].position}, {testimonials[activeTestimonial].company}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-nav">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button 
              className="testimonial-arrow prev"
              onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
              aria-label="Previous testimonial"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              className="testimonial-arrow next"
              onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section webdev-faq" ref={faqRef}>
        <div className="container">
          <h2 className="section-title text-center">{faqTitle}</h2>
          <p className="section-description text-center">
            Find answers to common questions about our web development services
          </p>
          
          <div className="faq-tabs">
            <button 
              className={`faq-tab ${activeFaqTab === 'general' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('general')}
            >
              General Questions
            </button>
            <button 
              className={`faq-tab ${activeFaqTab === 'technical' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('technical')}
            >
              Technical
            </button>
            <button 
              className={`faq-tab ${activeFaqTab === 'ecommerce' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('ecommerce')}
            >
              E-commerce
            </button>
          </div>
          
          <div className={`faq-content ${activeFaqTab === 'general' ? 'active' : ''}`}>
            <div className="faq-grid">
              {faqItems.general.map((item, index) => (
                <div 
                  className={`faq-item ${visibleFaqs.includes(index) ? 'visible' : ''}`} 
                  key={index}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`faq-content ${activeFaqTab === 'technical' ? 'active' : ''}`}>
            <div className="faq-grid">
              {faqItems.technical.map((item, index) => (
                <div 
                  className={`faq-item ${visibleFaqs.includes(index) ? 'visible' : ''}`} 
                  key={index}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`faq-content ${activeFaqTab === 'ecommerce' ? 'active' : ''}`}>
            <div className="faq-grid">
              {faqItems.ecommerce.map((item, index) => (
                <div 
                  className={`faq-item ${visibleFaqs.includes(index) ? 'visible' : ''}`} 
                  key={index}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="faq-cta">
            <p>Have more questions? We're here to help!</p>
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Particles */}
      <section className="section service-cta-section webdev-cta">
        <div className="cta-particles">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="cta-particle"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        <div className="container">
          <div className="service-cta-content">
            <h2>{ctaTitle}</h2>
            <p>{ctaDescription}</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default WebDevelopment