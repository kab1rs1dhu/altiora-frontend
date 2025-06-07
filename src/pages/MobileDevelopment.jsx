import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'
import '../styles/MobileDevelopment.css' // Import our custom CSS file

const MobileDevelopment = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [expandedSteps, setExpandedSteps] = useState([])
  const [activeFaqTab, setActiveFaqTab] = useState('general')
  const [activePlatformTab, setActivePlatformTab] = useState('native')
  
  // Refs for scroll animations
  const processRef = useRef(null)
  const techRef = useRef(null)
  const faqRef = useRef(null)
  const portfolioRef = useRef(null)
  
  // Animation states
  const [visibleProcessSteps, setVisibleProcessSteps] = useState([])
  const [visibleTechCategories, setVisibleTechCategories] = useState([])
  const [visibleFaqs, setVisibleFaqs] = useState([])
  const [visiblePortfolioItems, setVisiblePortfolioItems] = useState([])
  
  // Handle app prototype demo button
  const handleViewPrototype = (e) => {
    e.preventDefault()
    
    console.log("Launching mobile app prototype demo...")
    
    // Simulate loading a prototype
    alert("Mobile app prototype would launch here. In a production environment, this would open an interactive prototype in a modal or redirect to a demo page.")
  }
  
  // Toggle expanded/collapsed state of process details
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
      const content = await fetchPageContent('mobile-development')
      setPageContent(content)
    }
    
    loadContent()
  }, [fetchPageContent])
  
  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      // Process steps animation
      if (processRef.current) {
        const processSteps = processRef.current.querySelectorAll('.process-step')
        processSteps.forEach((step, index) => {
          const rect = step.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8 && !visibleProcessSteps.includes(index)) {
            setVisibleProcessSteps(prev => [...prev, index])
          }
        })
      }
      
      // Technology categories animation
      if (techRef.current) {
        const techCategories = techRef.current.querySelectorAll('.technology-category')
        techCategories.forEach((category, index) => {
          const rect = category.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8 && !visibleTechCategories.includes(index)) {
            setVisibleTechCategories(prev => [...prev, index])
          }
        })
      }
      
      // FAQ animation
      if (faqRef.current) {
        const faqItems = faqRef.current.querySelectorAll('.faq-item')
        faqItems.forEach((item, index) => {
          const rect = item.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8 && !visibleFaqs.includes(index)) {
            setVisibleFaqs(prev => [...prev, index])
          }
        })
      }
      
      // Portfolio items animation
      if (portfolioRef.current) {
        const portfolioItems = portfolioRef.current.querySelectorAll('.portfolio-item')
        portfolioItems.forEach((item, index) => {
          const rect = item.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8 && !visiblePortfolioItems.includes(index)) {
            setVisiblePortfolioItems(prev => [...prev, index])
          }
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    // Initial check
    setTimeout(handleScroll, 500)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visibleProcessSteps, visibleTechCategories, visibleFaqs, visiblePortfolioItems])
  
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
        <button onClick={() => fetchPageContent('mobile-development')} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }
  
  // Use default content if API data not available yet
  const heroTitle = getContentSection('mobile-development', 'heroTitle', 'Mobile App Development')
  const heroDescription = getContentSection('mobile-development', 'heroDescription', 'Build innovative mobile applications that engage users and drive business growth.')
  const overviewTitle = getContentSection('mobile-development', 'overviewTitle', 'Turn Your Ideas Into Powerful Mobile Experiences')
  const overviewContent = getContentSection('mobile-development', 'overviewContent', 'In today\'s mobile-first world, a well-designed mobile app can be transformative for your business. Our expert development team creates custom mobile applications that deliver exceptional user experiences while meeting your specific business objectives.\n\nWhether you need a native iOS or Android app, a cross-platform solution, or a progressive web app, we have the expertise to develop a mobile solution that engages your users and drives results.')
  const servicesTitle = getContentSection('mobile-development', 'servicesTitle', 'Our Mobile Development Services')
  const processTitle = getContentSection('mobile-development', 'processTitle', 'Our Mobile App Development Process')
  const technologiesTitle = getContentSection('mobile-development', 'technologiesTitle', 'Technologies We Use')
  const technologiesDescription = getContentSection('mobile-development', 'technologiesDescription', 'We leverage the latest mobile technologies to build powerful, scalable applications')
  const faqTitle = getContentSection('mobile-development', 'faqTitle', 'Frequently Asked Questions')
  const ctaTitle = getContentSection('mobile-development', 'ctaTitle', 'Ready to Build Your Mobile App?')
  const ctaDescription = getContentSection('mobile-development', 'ctaDescription', 'Let\'s discuss how we can create a mobile solution that drives results for your business.')
  
  // Expanded services with detailed descriptions
  const services = [
    {
      icon: '📱',
      title: 'Native iOS Development',
      description: 'We build high-performance iOS apps using Swift and SwiftUI that fully leverage Apple\'s platform capabilities and design guidelines. Our iOS apps are optimized for all Apple devices including iPhones, iPads, and Apple Watch for a seamless user experience across the ecosystem.'
    },
    {
      icon: '🤖',
      title: 'Native Android Development',
      description: 'Our team creates powerful Android applications using Kotlin that provide exceptional performance and user experience across the Android ecosystem. We follow Material Design principles and optimize for the wide variety of Android devices to ensure consistent functionality and appearance.'
    },
    {
      icon: '🔄',
      title: 'Cross-Platform Development',
      description: 'We use React Native and Flutter to build cost-effective apps that work seamlessly across multiple platforms while maintaining a native feel. This approach allows for faster development cycles, code reusability, and simultaneous updates across platforms, reducing time-to-market and maintenance costs.'
    },
    {
      icon: '🌐',
      title: 'Progressive Web Apps',
      description: 'We develop progressive web apps that combine the best of web and mobile apps, offering offline functionality and app-like experiences. PWAs provide the advantages of discoverability via web searches while offering installation options, push notifications, and offline capabilities typically associated with native apps.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design for Mobile',
      description: 'Our designers create intuitive, engaging mobile interfaces that follow platform-specific design principles and deliver exceptional user experiences. We conduct user research, create wireframes and prototypes, and perform usability testing to ensure your app is both visually appealing and highly functional.'
    },
    {
      icon: '🔌',
      title: 'API Development & Integration',
      description: 'We build robust APIs and integrate with third-party services to ensure your mobile app connects seamlessly with your existing systems. Our APIs are designed for performance, security, and scalability, with comprehensive documentation to support future development needs.'
    }
  ]
  
  // Enhanced process steps with additional details
  const processSteps = [
    {
      number: 1,
      title: 'Discovery & Planning',
      description: 'We analyze your business goals, target audience, and competition to create a comprehensive mobile strategy and detailed project roadmap.',
      details: [
        'Conduct stakeholder interviews to understand business objectives',
        'Research target audience and create user personas',
        'Analyze competitors and market trends',
        'Define app features and prioritize based on business impact',
        'Create a detailed project timeline and resource allocation plan'
      ]
    },
    {
      number: 2,
      title: 'UI/UX Design',
      description: 'Our designers create intuitive wireframes, user flows, and interactive prototypes to visualize the app before development begins.',
      details: [
        'Develop information architecture and user flows',
        'Create wireframes for key app screens and functionality',
        'Design high-fidelity mockups following platform guidelines',
        'Build interactive prototypes for user testing',
        'Refine designs based on stakeholder and user feedback'
      ]
    },
    {
      number: 3,
      title: 'Development',
      description: 'Our development team builds your application using agile methodologies, with regular updates and demos throughout the process.',
      details: [
        'Set up development environment and project architecture',
        'Implement frontend components and user interfaces',
        'Develop backend services and database structures',
        'Integrate APIs and third-party services',
        'Conduct regular code reviews and maintain quality standards'
      ]
    },
    {
      number: 4,
      title: 'Testing & QA',
      description: 'We conduct thorough testing across devices and operating systems to ensure your app works flawlessly for all users.',
      details: [
        'Perform functional testing of all app features',
        'Conduct compatibility testing across device types',
        'Test performance, security, and usability',
        'Run automated and manual regression testing',
        'Fix bugs and optimize app performance'
      ]
    },
    {
      number: 5,
      title: 'Deployment & Ongoing Support',
      description: 'After launch, we provide ongoing maintenance, updates, and performance monitoring to ensure your app\'s continued success.',
      details: [
        'Prepare app for submission to app stores',
        'Configure analytics and crash reporting',
        'Develop a maintenance and update schedule',
        'Monitor app performance and user feedback',
        'Plan and implement future feature enhancements'
      ]
    }
  ]
  
  // Enhanced technologies with platform-specific frameworks and tools
  const technologies = [
    {
      category: 'iOS Development',
      items: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'ARKit', 'CoreML', 'WidgetKit', 'CloudKit', 'WatchKit', 'Metal']
    },
    {
      category: 'Android Development',
      items: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Room Database', 'Navigation Component', 'WorkManager', 'Dagger/Hilt', 'Retrofit', 'Glide', 'ML Kit']
    },
    {
      category: 'Cross-Platform',
      items: ['React Native', 'Flutter', 'Expo', 'Capacitor', 'Ionic', 'NativeScript', 'MobX', 'Redux', 'Styled Components', 'React Navigation']
    },
    {
      category: 'Backend & APIs',
      items: ['Node.js', 'Firebase', 'AWS Amplify', 'GraphQL', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Express.js', 'Serverless', 'Socket.io']
    },
    {
      category: 'DevOps & Tools',
      items: ['CI/CD Pipelines', 'GitHub Actions', 'Fastlane', 'App Center', 'Xcode Cloud', 'Firebase App Distribution', 'TestFlight', 'Google Play Console', 'Jira', 'Figma']
    }
  ]
  
  // Sample portfolio items
  const portfolioItems = [
    {
      title: 'HealthTracker Pro',
      category: 'Healthcare',
      description: 'A comprehensive health tracking app with wearable device integration, personalized insights, and secure data sharing with healthcare providers.',
      image: '/images/portfolio-health.jpg',
      link: '/contact'
    },
    {
      title: 'ShopSmart',
      category: 'E-Commerce',
      description: 'A feature-rich shopping app with AR product previews, personalized recommendations, and seamless payment integration.',
      image: '/images/portfolio-ecommerce.jpg',
      link: '/contact'
    },
    {
      title: 'TravelCompanion',
      category: 'Travel',
      description: 'An all-in-one travel companion with offline maps, real-time translations, and local recommendations powered by AI.',
      image: '/images/portfolio-travel.jpg',
      link: '/contact'
    }
  ]
  
  // Testimonials data
  const testimonials = [
    {
      quote: "The team at Altiora delivered an exceptional mobile app that exceeded our expectations. Their expertise in both iOS and Android development was evident in the seamless user experience they created.",
      name: "Sarah Johnson",
      position: "Product Manager",
      company: "HealthTech Innovations",
      avatar: "/images/testimonial-1.jpg"
    },
    {
      quote: "Working with Altiora was a game-changer for our business. They transformed our concept into a polished mobile app that our customers love. Their attention to detail and commitment to quality is outstanding.",
      name: "Michael Chen",
      position: "CEO",
      company: "RetailSmart",
      avatar: "/images/testimonial-2.jpg"
    },
    {
      quote: "We chose Altiora for their cross-platform expertise, and they delivered a fantastic app that works flawlessly on both iOS and Android. Their agile approach kept us involved throughout the development process.",
      name: "Emily Rodriguez",
      position: "CTO",
      company: "TravelTech Solutions",
      avatar: "/images/testimonial-3.jpg"
    }
  ]
  
  // Categorized FAQ items
  const generalFaqs = [
    {
      question: 'How long does it take to develop a mobile app?',
      answer: 'Development timelines vary based on complexity. A simple app might take 2-3 months, while a complex application could take 4-6 months or more. We\'ll provide a detailed timeline during our initial planning phase after understanding your specific requirements and project scope.'
    },
    {
      question: 'Should I build a native app or a cross-platform app?',
      answer: 'It depends on your specific requirements. Native apps offer the best performance and access to platform features, while cross-platform apps can be more cost-effective with faster time-to-market. We\'ll help you decide which approach best meets your business goals, budget, and technical requirements during our consultation.'
    },
    {
      question: 'How much does it cost to develop a mobile app?',
      answer: 'App development costs vary widely based on complexity, features, and platforms. We provide custom quotes after understanding your specific requirements. We\'re transparent about pricing and offer flexible engagement models to accommodate different budgets while ensuring high-quality results.'
    },
    {
      question: 'Do you provide app maintenance and updates?',
      answer: 'Yes, we offer ongoing maintenance and support to keep your app running smoothly. This includes regular updates, bug fixes, performance monitoring, and feature enhancements to ensure your app remains compatible with the latest OS versions and devices. We offer various support packages to meet your needs.'
    }
  ]
  
  const technicalFaqs = [
    {
      question: 'How do you ensure the security of mobile applications?',
      answer: 'We implement industry best practices for mobile app security, including secure authentication methods, data encryption, secure network communications (HTTPS/SSL), input validation, secure data storage, and protection against common vulnerabilities. We also conduct security testing throughout the development process and can perform security audits for existing applications.'
    },
    {
      question: 'Can you integrate my app with existing systems?',
      answer: 'Yes, we specialize in integrating mobile apps with existing systems such as CRMs, ERPs, payment gateways, and custom backends. We develop secure and efficient APIs that enable seamless data flow between your mobile app and other business systems. Our team has experience working with a wide range of integration protocols including REST, SOAP, GraphQL, and WebSockets.'
    },
    {
      question: 'How do you handle app store submissions?',
      answer: 'We manage the entire app store submission process for both iOS and Android platforms. This includes preparing app store assets (screenshots, descriptions, keywords), configuring app settings, handling developer account requirements, ensuring compliance with app store guidelines, and addressing any feedback from the review process. We stay current with changing app store policies to ensure smooth approvals.'
    },
    {
      question: 'What analytics and monitoring do you implement in mobile apps?',
      answer: 'We integrate analytics solutions such as Firebase Analytics, Mixpanel, or Amplitude to track user behavior and app performance. We also implement crash reporting tools like Crashlytics to monitor app stability. These tools provide valuable insights into user engagement, retention, conversion rates, and potential issues, helping you make data-driven decisions for app improvements.'
    }
  ]
  
  const featureFaqs = [
    {
      question: 'Can you implement offline functionality in mobile apps?',
      answer: 'Yes, we design apps with offline capabilities that allow users to access core features without an internet connection. We implement local data storage, synchronization mechanisms, and conflict resolution strategies to ensure seamless operation regardless of connectivity status. When connectivity is restored, the app intelligently synchronizes data with the server to maintain data integrity.'
    },
    {
      question: 'Do you develop apps with push notifications?',
      answer: 'Yes, we implement push notification systems that allow you to engage users with timely, relevant messages. We can set up various notification types including standard push notifications, rich media notifications, and interactive notifications. Our solutions typically include a notification management system that lets you segment users and schedule notifications through an admin dashboard.'
    },
    {
      question: 'Can you build apps with AR/VR features?',
      answer: 'Yes, we develop mobile applications with augmented reality (AR) and virtual reality (VR) capabilities. We work with technologies such as ARKit for iOS, ARCore for Android, and cross-platform frameworks like Unity and Vuforia. Our team has experience creating immersive experiences for various industries including retail (virtual try-on), real estate (virtual property tours), education, and gaming.'
    },
    {
      question: 'How do you approach app monetization strategies?',
      answer: 'We help clients implement various monetization strategies based on their business model and target audience. These include subscription models, in-app purchases, freemium models, advertising, sponsorships, and more. We analyze your market and competitors to recommend the most effective monetization approach and implement the necessary technical components to support it.'
    }
  ]
  
  return (
    <>
      {/* Hero Section with Particles */}
      <section className="service-hero mobile-dev-hero">
        <div className="mobile-dev-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="mobile-dev-particle"
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
            <span className="hero-badge">Mobile Solutions</span>
            <h1>{heroTitle}</h1>
            <p className="service-hero-description">
              {heroDescription}
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ color: 'white', background: 'var(--mobile-dev-primary)' }}>Get a Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section mobile-dev-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>{overviewTitle}</h2>
              {overviewContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              
              {/* Add View Prototype Button */}
              <div className="overview-actions">
                <button 
                  className="btn btn-secondary analysis-btn" 
                  onClick={handleViewPrototype}
                  style={{ 
                    background: 'linear-gradient(135deg, var(--mobile-dev-primary) 0%, var(--mobile-dev-secondary) 100%)',
                    color: 'white'
                  }}
                >
                  <i className="fa-solid fa-mobile-screen"></i> View App Prototype Demo
                </button>
              </div>
              
              <div className="overview-stats">
                <div className="stat">
                  <h3>6.5b</h3>
                  <p>smartphone users worldwide</p>
                </div>
                <div className="stat">
                  <h3>90%</h3>
                  <p>of mobile time spent in apps</p>
                </div>
                <div className="stat">
                  <h3>230b</h3>
                  <p>mobile app downloads annually</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <div className="image-wrapper">
                <img src="/images/app-dev.avif" alt="Mobile App Development" />
                <div className="image-decoration">
                  <div className="decoration-circle circle-1"></div>
                  <div className="decoration-circle circle-2"></div>
                  <div className="decoration-line line-1"></div>
                  <div className="decoration-line line-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-details-section mobile-dev-services">
        <div className="service-blob blob-1"></div>
        <div className="service-blob blob-2"></div>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Expertise</span>
            <h2 className="section-title">
              <span className="text-gradient">{servicesTitle}</span>
            </h2>
            <p className="section-description">
              Comprehensive mobile development solutions tailored to your business needs
            </p>
          </div>
          <div className="service-details-grid">
            {services.map((service, index) => (
              <div 
                className="service-detail-card" 
                key={index}
                style={{ 
                  '--card-color': `var(--mobile-dev-color-${index % 5 + 1})`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="service-detail-icon">
                  <i className="icon">{service.icon}</i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section with Enhanced Content and Animation */}
      <section className="section process-section mobile-dev-process" ref={processRef}>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Methodology</span>
            <h2 className="section-title">
              <span className="text-gradient">{processTitle}</span>
            </h2>
            <p className="section-description">
              Our proven app development methodology delivers consistent results through a structured, data-driven approach
            </p>
          </div>
          
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
                    {step.details.map((detail, detailIndex) => (
                      <div className="process-step-detail" key={detailIndex}>
                        <i className="fa-solid fa-check"></i>
                        <span>{detail}</span>
                      </div>
                    ))}
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
            <p>Ready to start your mobile app development journey?</p>
            <Link to="/contact" className="btn btn-primary">Get a Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section mobile-dev-technology" ref={techRef}>
        <div className="tech-blob blob-1"></div>
        <div className="tech-blob blob-2"></div>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Tech Stack</span>
            <h2 className="section-title">
              <span className="text-gradient">{technologiesTitle}</span>
            </h2>
            <p className="section-description">
              {technologiesDescription}
            </p>
          </div>
          
          <div className="technology-grid">
            {technologies.map((tech, index) => (
              <div 
                className={`technology-category ${visibleTechCategories.includes(index) ? 'visible' : ''}`}
                key={index}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <h3>{tech.category}</h3>
                <ul className="technology-list">
                  {tech.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section mobile-dev-portfolio" ref={portfolioRef}>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Work</span>
            <h2 className="section-title">
              <span className="text-gradient">Featured Mobile Projects</span>
            </h2>
            <p className="section-description">
              Explore some of our recent mobile application development projects
            </p>
          </div>
          
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
                  <span className="portfolio-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link to={item.link} className="portfolio-link">
                    View Case Study <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Comparison Section */}
      <section className="section platform-comparison">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Platform Guide</span>
            <h2 className="section-title">
              <span className="text-gradient">Mobile Platform Comparison</span>
            </h2>
            <p className="section-description">
              Understanding the strengths of each mobile development approach
            </p>
          </div>
          
          <div className="comparison-tabs">
            <button 
              className={`comparison-tab ${activePlatformTab === 'native' ? 'active' : ''}`}
              onClick={() => setActivePlatformTab('native')}
            >
              Native Apps
            </button>
            <button 
              className={`comparison-tab ${activePlatformTab === 'cross' ? 'active' : ''}`}
              onClick={() => setActivePlatformTab('cross')}
            >
              Cross-Platform
            </button>
            <button 
              className={`comparison-tab ${activePlatformTab === 'pwa' ? 'active' : ''}`}
              onClick={() => setActivePlatformTab('pwa')}
            >
              Progressive Web Apps
            </button>
          </div>
          
          <div className={`comparison-content ${activePlatformTab === 'native' ? 'active' : ''}`}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Native iOS</th>
                  <th>Native Android</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Performance</td>
                  <td>Excellent <span className="rating-stars">★★★★★</span></td>
                  <td>Excellent <span className="rating-stars">★★★★★</span></td>
                </tr>
                <tr>
                  <td>User Experience</td>
                  <td>Platform-specific <span className="rating-stars">★★★★★</span></td>
                  <td>Platform-specific <span className="rating-stars">★★★★★</span></td>
                </tr>
                <tr>
                  <td>Access to Device Features</td>
                  <td>Complete <span className="rating-stars">★★★★★</span></td>
                  <td>Complete <span className="rating-stars">★★★★★</span></td>
                </tr>
                <tr>
                  <td>Development Cost</td>
                  <td>Higher (separate codebases) <span className="rating-stars">★★☆☆☆</span></td>
                  <td>Higher (separate codebases) <span className="rating-stars">★★☆☆☆</span></td>
                </tr>
                <tr>
                  <td>Time to Market</td>
                  <td>Longer <span className="rating-stars">★★★☆☆</span></td>
                  <td>Longer <span className="rating-stars">★★★☆☆</span></td>
                </tr>
                <tr>
                  <td>Maintenance</td>
                  <td>More complex (separate updates) <span className="rating-stars">★★★☆☆</span></td>
                  <td>More complex (separate updates) <span className="rating-stars">★★★☆☆</span></td>
                </tr>
                <tr>
                  <td>Ideal For</td>
                  <td>High-performance apps, games, AR/VR, platform-specific experiences</td>
                  <td>High-performance apps, deep integrations, custom hardware interactions</td>
                </tr>
              </tbody>
            </table>
            
            <div className="platform-features">
              <div className="platform-feature">
                <div className="platform-feature-icon">
                  <i className="fa-solid fa-gauge-high"></i>
                </div>
                <div className="platform-feature-content">
                  <h4>Optimal Performance</h4>
                  <p>Direct access to device hardware for maximum speed and efficiency</p>
                </div>
              </div>
              <div className="platform-feature">
                <div className="platform-feature-icon">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <div className="platform-feature-content">
                  <h4>Platform-Specific Design</h4>
                  <p>Follows iOS and Android design guidelines for familiar user experience</p>
                </div>
              </div>
              <div className="platform-feature">
                <div className="platform-feature-icon">
                  <i className="fa-solid fa-cubes"></i>
                </div>
                <div className="platform-feature-content">
                  <h4>Advanced Features</h4>
                  <p>Full access to latest platform features as soon as they're released</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`comparison-content ${activePlatformTab === 'cross' ? 'active' : ''}`}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>React Native</th>
                  <th>Flutter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Performance</td>
                  <td>Very Good <span className="rating-stars">★★★★☆</span></td>
                  <td>Excellent <span className="rating-stars">★★★★★</span></td>
                </tr>
                <tr>
                  <td>User Experience</td>
                  <td>Near-native <span className="rating-stars">★★★★☆</span></td>
                  <td>Consistent across platforms <span className="rating-stars">★★★★☆</span></td>
                </tr>
                <tr>
                  <td>Access to Device Features</td>
                  <td>Good (via native modules) <span className="rating-stars">★★★★☆</span></td>
                  <td>Good (via platform channels) <span className="rating-stars">★★★★☆</span></td>
                </tr>
                <tr>
                  <td>Development Cost</td>
                  <td>Lower (shared codebase) <span className="rating-stars">★★★★☆</span></td>
                  <td>Lower (shared codebase) <span className="rating-stars">★★★★☆</span></td>
                </tr>
                <tr>
                  <td>Time to Market</td>
                  <td>Faster <span className="rating-stars">★★★★☆</span></td>
                  <td>Faster <span className="rating-stars">★★★★☆</span></td>
                </tr>
                <tr>
                  <td>Maintenance</td>
                  <td>Easier (single codebase) <span className="rating-stars">★★★★☆</span></td>
                  <td>Easier (single codebase) <span className="rating-stars">★★★★☆</span></td>
                </tr>
                <tr>
                  <td>Ideal For</td>
                  <td>Business apps, content-driven apps, apps with web-based equivalents</td>
                  <td>Apps with custom designs, animation-heavy interfaces, complex UIs</td>
                </tr>
              </tbody>
            </table>
            
            <div className="platform-features">
              <div className="platform-feature">
                <div className="platform-feature-icon">
                  <i className="fa-solid fa-code"></i>
                </div>
                <div className="platform-feature-content">
                  <h4>Code Reusability</h4>
                  <p>Share up to 90% of code between iOS and Android platforms</p>
                </div>
              </div>
              <div className="platform-feature">
                <div className="platform-feature-icon">
                  <i className="fa-solid fa-money-bill-trend-up"></i>
                </div>
                <div className="platform-feature-content">
                  <h4>Cost Effectiveness</h4>
                  <p>Significantly reduced development and maintenance costs</p>
                </div>
              </div>
              <div className="platform-feature">
                <div className="platform-feature-icon">
                  <i className="fa-solid fa-rocket"></i>
                </div>
                <div className="platform-feature-content">
                  <h4>Faster Time to Market</h4>
                  <p>Launch simultaneously on multiple platforms with a single team</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`comparison-content ${activePlatformTab === 'pwa' ? 'active' : ''}`}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Progressive Web Apps</th>
                  <th>Comparison to Native</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Performance</td>
                  <td>Good <span className="rating-stars">★★★☆☆</span></td>
                  <td>Lower than native <span className="rating-stars">★★★☆☆</span></td>
                </tr>
                <tr>
                  <td>User Experience</td>
                  <td>App-like <span className="rating-stars">★★★☆☆</span></td>
                  <td>Less integrated <span className="rating-stars">★★★☆☆</span></td>
                </tr>
                <tr>
                  <td>Access to Device Features</td>
                  <td>Limited <span className="rating-stars">★★★☆☆</span></td>
                  <td>Restricted compared to native <span className="rating-stars">★★★☆☆</span></td>
                </tr>
                <tr>
                  <td>Development Cost</td>
                  <td>Lowest <span className="rating-stars">★★★★★</span></td>
                  <td>Much lower <span className="rating-stars">★★★★★</span></td>
                </tr>
                <tr>
                  <td>Time to Market</td>
                  <td>Fastest <span className="rating-stars">★★★★★</span></td>
                  <td>Faster <span className="rating-stars">★★★★★</span></td>
                </tr>
                <tr>
                  <td>Maintenance</td>
                  <td>Easiest (web updates) <span className="rating-stars">★★★★★</span></td>
                  <td>Much easier <span className="rating-stars">★★★★★</span></td>
                </tr>
                <tr>
                  <td>Ideal For</td>
                  <td>Content-focused apps, e-commerce, news, blogs, simple tools</td>
                  <td>Projects with limited budget, wide reach requirements, content-heavy apps</td>
                </tr>
              </tbody>
            </table>
            
            <div className="platform-features">
              <div className="platform-feature">
                <div className="platform-feature-icon">
                  <i className="fa-solid fa-globe"></i>
                </div>
                <div className="platform-feature-content">
                  <h4>Universal Access</h4>
                  <p>Accessible via web browsers without app store installation</p>
                </div>
              </div>
              <div className="platform-feature">
                <div className="platform-feature-icon">
                  <i className="fa-solid fa-wifi"></i>
                </div>
                <div className="platform-feature-content">
                  <h4>Offline Capability</h4>
                  <p>Works without internet connection after initial load</p>
                </div>
              </div>
              <div className="platform-feature">
                <div className="platform-feature-icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className="platform-feature-content">
                  <h4>Discoverability</h4>
                  <p>Indexed by search engines for better visibility and reach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="section app-showcase">
        <div className="showcase-blob blob-1"></div>
        <div className="showcase-blob blob-2"></div>
        <div className="container showcase-container">
          <div className="section-heading">
            <span className="section-subtitle">App Showcase</span>
            <h2 className="section-title">
              <span className="text-gradient">Beautiful Experiences Across Devices</span>
            </h2>
            <p className="section-description">
              We design and develop mobile applications that look and perform flawlessly on all devices
            </p>
          </div>
          
          <div className="app-devices">
            <div className="device device-phone visible" style={{ transitionDelay: '0.2s' }}>
              <img src="/images/app-showcase-phone.png" alt="Mobile app on smartphone" />
            </div>
            <div className="device device-tablet visible" style={{ transitionDelay: '0.4s' }}>
              <img src="/images/app-showcase-tablet.png" alt="Mobile app on tablet" />
            </div>
            <div className="device device-phone visible" style={{ transitionDelay: '0.6s' }}>
              <img src="/images/app-showcase-phone-2.png" alt="Mobile app on smartphone" />
            </div>
          </div>
          
          <div className="app-features">
            <div className="app-feature visible" style={{ transitionDelay: '0.3s' }}>
              <div className="feature-icon">
                <i className="fa-solid fa-brush"></i>
              </div>
              <h3>Stunning UI Design</h3>
              <p>Visually captivating interfaces that engage users and reinforce your brand identity across all screen sizes.</p>
            </div>
            <div className="app-feature visible" style={{ transitionDelay: '0.4s' }}>
              <div className="feature-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>Intuitive UX</h3>
              <p>User-centric design that prioritizes ease of use, accessibility, and seamless navigation for all users.</p>
            </div>
            <div className="app-feature visible" style={{ transitionDelay: '0.5s' }}>
              <div className="feature-icon">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3>Lightning Performance</h3>
              <p>Optimized code and efficient resource management ensuring fast load times and smooth interactions.</p>
            </div>
          </div>
          
          <div className="demo-cta">
            <button 
              className="btn" 
              onClick={handleViewPrototype}
              style={{ 
                background: 'linear-gradient(135deg, var(--mobile-dev-primary) 0%, var(--mobile-dev-secondary) 100%)',
                color: 'white' 
              }}
            >
              <i className="fa-solid fa-play"></i> View Interactive Demo
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section with Tabs */}
      <section className="section faq-section mobile-dev-faq" ref={faqRef}>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Got Questions?</span>
            <h2 className="section-title">
              <span className="text-gradient">{faqTitle}</span>
            </h2>
            <p className="section-description">
              Find answers to common questions about our mobile app development services
            </p>
          </div>
          
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
              Technical Details
            </button>
            <button 
              className={`faq-tab ${activeFaqTab === 'features' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('features')}
            >
              App Features
            </button>
          </div>
          
          {/* General FAQ Questions */}
          <div className={`faq-content ${activeFaqTab === 'general' ? 'active' : ''}`}>
            <div className="faq-grid">
              {generalFaqs.map((item, index) => (
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
          
          {/* Technical FAQ Questions */}
          <div className={`faq-content ${activeFaqTab === 'technical' ? 'active' : ''}`}>
            <div className="faq-grid">
              {technicalFaqs.map((item, index) => (
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
          
          {/* Features FAQ Questions */}
          <div className={`faq-content ${activeFaqTab === 'features' ? 'active' : ''}`}>
            <div className="faq-grid">
              {featureFaqs.map((item, index) => (
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
            <p>Have more questions about mobile app development?</p>
            <Link 
              to="/contact" 
              className="btn btn-primary" 
              style={{ background: 'linear-gradient(135deg, var(--mobile-dev-primary) 0%, var(--mobile-dev-secondary) 100%)', color: 'white' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Particles */}
      <section className="section service-cta-section mobile-dev-cta">
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
            <Link to="/contact" className="btn btn-glow btn-large">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default MobileDevelopment
