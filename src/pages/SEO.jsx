import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'
import '../styles/SEO.css' // Import our new CSS file

const SEO = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

const [expandedSteps, setExpandedSteps] = useState([]);
// Add this state near your other state declarations
const [activeFaqTab, setActiveFaqTab] = useState('general');

// Add this function to toggle the expanded/collapsed state of process details
const toggleProcessDetails = (e, index) => {
  e.preventDefault();
  setExpandedSteps(prev => {
    if (prev.includes(index)) {
      return prev.filter(i => i !== index);
    } else {
      return [...prev, index];
    }
  });
}
  
  // Refs for scroll animations
  const processRef = useRef(null)
  const resultsRef = useRef(null)
  const faqRef = useRef(null)
  
  // Animation states
  const [visibleProcessSteps, setVisibleProcessSteps] = useState([])
  const [visibleResults, setVisibleResults] = useState([])
  const [visibleFaqs, setVisibleFaqs] = useState([])
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('seo')
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
      
      // Results animation
      if (resultsRef.current) {
        const resultCards = resultsRef.current.querySelectorAll('.result-card')
        resultCards.forEach((card, index) => {
          const rect = card.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8 && !visibleResults.includes(index)) {
            setVisibleResults(prev => [...prev, index])
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
    }
    
    window.addEventListener('scroll', handleScroll)
    // Initial check
    setTimeout(handleScroll, 500)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visibleProcessSteps, visibleResults, visibleFaqs])
  
  // Auto-rotate testimonials
  useEffect(() => {
    const testimonials = [
      {
        quote: "Altiora transformed our online visibility completely. Their SEO strategies increased our organic traffic by 215% in just 6 months, leading to a significant boost in qualified leads and sales.",
        name: "Sarah Johnson",
        position: "Marketing Director",
        company: "TechSolutions Inc.",
        avatar: "/images/testimonial-1.jpg"
      },
      {
        quote: "Working with Altiora has been a game-changer for our business. Their data-driven approach to SEO helped us rank for competitive keywords that we'd been targeting unsuccessfully for years.",
        name: "Michael Chen",
        position: "CEO",
        company: "GrowthHub",
        avatar: "/images/testimonial-2.jpg"
      },
      {
        quote: "The team at Altiora truly understands SEO. They not only improved our rankings but also helped us develop a content strategy that established our brand as a thought leader in our industry.",
        name: "Emily Rodriguez",
        position: "Content Manager",
        company: "Innovate Digital",
        avatar: "/images/testimonial-3.jpg"
      }
    ]
    
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
        <button onClick={() => fetchPageContent('seo')} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }
  
  // Use default content if API data not available yet
  const heroTitle = getContentSection('seo', 'heroTitle', 'Search Engine Optimization')
  const heroDescription = getContentSection('seo', 'heroDescription', 'Drive organic traffic and boost your website\'s visibility with our data-driven SEO strategies.')
  const overviewTitle = getContentSection('seo', 'overviewTitle', 'Elevate Your Online Presence')
  const overviewContent = getContentSection('seo', 'overviewContent', 'In today\'s digital landscape, ranking high in search engines is crucial for your business\'s success. Our comprehensive SEO services are designed to increase your website\'s visibility, drive targeted traffic, and improve conversion rates.\n\nAt Altiora, we take a holistic approach to SEO, combining technical optimization, content strategy, and link building to create sustainable growth for your business. We don\'t just focus on rankings—we deliver real business results.')
  const servicesTitle = getContentSection('seo', 'servicesTitle', 'Our SEO Services')
  const processTitle = getContentSection('seo', 'processTitle', 'Our SEO Process')
  const faqTitle = getContentSection('seo', 'faqTitle', 'Frequently Asked Questions')
  const ctaTitle = getContentSection('seo', 'ctaTitle', 'Ready to Boost Your Search Rankings?')
  const ctaDescription = getContentSection('seo', 'ctaDescription', 'Get a free SEO audit and discover how we can help grow your business.')
  
  // Parse services from the API response, or use default services
  let services = []
  try {
    services = JSON.parse(getContentSection('seo', 'services', '[]'))
  } catch (err) {
    console.error('Error parsing services:', err)
    // Default services
    services = [
      {
        icon: '🔍',
        title: 'SEO Audit & Strategy',
        description: 'We analyze your website\'s current performance, identify issues, and create a comprehensive SEO strategy tailored to your business goals and target audience.'
      },
      {
        icon: '⚙️',
        title: 'Technical SEO',
        description: 'We optimize your website\'s technical aspects, including site speed, mobile-friendliness, crawlability, indexation, and site architecture to ensure search engines can effectively crawl and index your content.'
      },
      {
        icon: '🔑',
        title: 'Keyword Research',
        description: 'We identify high-value keywords that your target audience is searching for, analyzing search volume, competition, and user intent to prioritize the most impactful opportunities.'
      },
      {
        icon: '📝',
        title: 'Content Optimization',
        description: 'We create and optimize content that resonates with both users and search engines, focusing on relevance, quality, and strategic keyword integration.'
      },
      {
        icon: '🔗',
        title: 'Link Building',
        description: 'We develop and execute strategic link building campaigns to increase your website\'s authority, focusing on quality over quantity to drive sustainable results.'
      },
      {
        icon: '📊',
        title: 'Performance Tracking',
        description: 'We monitor key performance indicators, providing regular reports and insights to track progress and continuously refine our strategy for optimal results.'
      }
    ]
  }
  
  // Parse process steps from the API response, or use default steps
  let processSteps = []
  try {
    processSteps = JSON.parse(getContentSection('seo', 'processSteps', '[]'))
  } catch (err) {
    console.error('Error parsing process steps:', err)
    // Default process steps
    processSteps = [
      {
        number: 1,
        title: 'Discovery & Audit',
        description: 'We analyze your website, competitors, and industry to identify opportunities and challenges for your SEO campaign.'
      },
      {
        number: 2,
        title: 'Strategy Development',
        description: 'We create a customized SEO roadmap based on the audit findings, business goals, and target audience.'
      },
      {
        number: 3,
        title: 'On-Page Optimization',
        description: 'We optimize your website\'s content, structure, and technical elements to improve search engine visibility.'
      },
      {
        number: 4,
        title: 'Off-Page Optimization',
        description: 'We implement strategic link building and brand mention strategies to boost your website\'s authority.'
      },
      {
        number: 5,
        title: 'Monitoring & Reporting',
        description: 'We continuously track performance, provide regular reports, and make data-driven adjustments to improve results.'
      }
    ]
  }
  
  // New Results section data
  const results = [
    {
      icon: '📈',
      title: 'Increased Organic Traffic',
      description: 'Our SEO strategies deliver consistent growth in targeted organic traffic, bringing more potential customers to your website.'
    },
    {
      icon: '🏆',
      title: 'Higher Search Rankings',
      description: 'We help your website climb the search engine results pages for keywords that matter to your business.'
    },
    {
      icon: '💼',
      title: 'More Qualified Leads',
      description: 'By targeting the right keywords and optimizing your content, we attract visitors who are more likely to convert into customers.'
    },
    {
      icon: '💰',
      title: 'Improved ROI',
      description: 'Our SEO strategies focus on delivering measurable business results and a strong return on your marketing investment.'
    }
  ]
  
  // New Strategies section data
  const strategies = [
    {
      image: '/images/local-seo.jpg',
      title: 'Local SEO',
      description: 'Dominate local search results and attract more customers from your area with our specialized local SEO strategies.',
      link: '/contact'
    },
    {
      image: '/images/ecommerce-seo.jpg',
      title: 'E-commerce SEO',
      description: 'Boost product visibility, increase organic traffic, and drive more sales with our specialized e-commerce SEO approach.',
      link: '/contact'
    },
    {
      image: '/images/enterprise-seo.jpg',
      title: 'Enterprise SEO',
      description: 'Scale your SEO efforts across large websites and complex organizations with our enterprise-level SEO solutions.',
      link: '/contact'
    }
  ]
  
  // Testimonials data
  const testimonials = [
    {
      quote: "Altiora transformed our online visibility completely. Their SEO strategies increased our organic traffic by 215% in just 6 months, leading to a significant boost in qualified leads and sales.",
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechSolutions Inc.",
      avatar: "/images/testimonial-1.jpg"
    },
    {
      quote: "Working with Altiora has been a game-changer for our business. Their data-driven approach to SEO helped us rank for competitive keywords that we'd been targeting unsuccessfully for years.",
      name: "Michael Chen",
      position: "CEO",
      company: "GrowthHub",
      avatar: "/images/testimonial-2.jpg"
    },
    {
      quote: "The team at Altiora truly understands SEO. They not only improved our rankings but also helped us develop a content strategy that established our brand as a thought leader in our industry.",
      name: "Emily Rodriguez",
      position: "Content Manager",
      company: "Innovate Digital",
      avatar: "/images/testimonial-3.jpg"
    }
  ]
  
  // Parse FAQ items from the API response, or use default FAQ items
  let faqItems = []
  try {
    faqItems = JSON.parse(getContentSection('seo', 'faqItems', '[]'))
  } catch (err) {
    console.error('Error parsing FAQ items:', err)
    // Default FAQ items
    faqItems = [
      {
        question: 'How long does it take to see results from SEO?',
        answer: 'SEO is a long-term strategy. While some improvements can be seen within a few weeks, significant results typically take 3-6 months, depending on your industry, competition, and website\'s current state. We focus on sustainable growth rather than quick fixes.'
      },
      {
        question: 'How do you measure SEO success?',
        answer: 'We track various metrics, including organic traffic, keyword rankings, engagement metrics, conversion rates, and ROI. We provide regular reports showing these metrics and what they mean for your business.'
      },
      {
        question: 'Do you guarantee first-page rankings?',
        answer: 'No reputable SEO agency can guarantee specific rankings, as search algorithms consider hundreds of factors outside our control. We focus on improving your overall organic visibility and business results rather than promising specific positions.'
      },
      {
        question: 'How is your SEO service different from others?',
        answer: 'We take a holistic, data-driven approach focused on your business goals, not just rankings. Our strategies are customized to your specific needs, and we prioritize transparency throughout the process.'
      },
      {
        question: 'What does SEO cost?',
        answer: 'Our SEO services are customized based on your specific needs, goals, and competition. We offer different packages to accommodate various budgets, and we are transparent about pricing. We focus on delivering a strong ROI regardless of your investment level.'
      },
      {
        question: 'Do I need ongoing SEO or can it be a one-time project?',
        answer: 'SEO should be viewed as an ongoing investment. Search algorithms change regularly, competition evolves, and your business goals shift over time. We recommend ongoing SEO to maintain and build upon initial gains, but we also offer one-time audit and strategy services for businesses looking to implement recommendations in-house.'
      }
    ]
  }
  
  return (
    <>
      {/* Hero Section with Particles */}
      <section className="service-hero seo-hero">
        <div className="seo-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="seo-particle"
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
            <Link to="/contact" className="btn btn-primary">Get a Free SEO Audit</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section seo-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>{overviewTitle}</h2>
              {overviewContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <div className="overview-stats">
                <div className="stat">
                  <h3>93%</h3>
                  <p>of online experiences begin with a search engine</p>
                </div>
                <div className="stat">
                  <h3>75%</h3>
                  <p>of users never scroll past the first page of search results</p>
                </div>
                <div className="stat">
                  <h3>70%</h3>
                  <p>higher conversion rate for SEO leads compared to other channels</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/seo-overview.webp" alt="SEO Strategy" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-details-section seo-services">
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

      {/* Process Section with Enhanced Content and Animation */}
<section className="section process-section seo-process" ref={processRef}>
  <div className="container">
    <h2 className="section-title text-center">{processTitle}</h2>
    <p className="section-description text-center">
      Our proven SEO methodology delivers consistent results through a structured, data-driven approach
    </p>
    
    <div className="process-steps">
      {processSteps.map((step, index) => (
        <div 
          className={`process-step ${visibleProcessSteps.includes(index) ? 'visible' : ''}`} 
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
                    <span>Comprehensive technical SEO audit to identify issues and opportunities</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>In-depth competitor analysis to benchmark your performance</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Thorough keyword research to identify high-value search terms</span>
                  </div>
                </>
              )}
              
              {index === 1 && (
                <>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Custom SEO strategy tailored to your specific business goals</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Prioritized recommendations based on impact and resource requirements</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Clear timeline and KPIs to measure progress and success</span>
                  </div>
                </>
              )}
              
              {index === 2 && (
                <>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Content optimization for search engines and user experience</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Technical improvements to site structure, speed, and mobile usability</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Schema markup implementation to enhance search appearance</span>
                  </div>
                </>
              )}
              
              {index === 3 && (
                <>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Strategic link building to boost domain authority</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Digital PR to increase brand mentions and backlinks</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Local citation building for businesses with physical locations</span>
                  </div>
                </>
              )}
              
              {index === 4 && (
                <>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Detailed monthly reports showing key metrics and progress</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Regular strategy reviews to adapt to algorithm changes</span>
                  </div>
                  <div className="process-step-detail">
                    <i className="fa-solid fa-check"></i>
                    <span>Continuous optimization based on performance data</span>
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
      <p>Ready to start your SEO journey with us?</p>
      <Link to="/contact" className="btn btn-primary">Get a Free SEO Audit</Link>
    </div>
  </div>
</section>

      {/* NEW: Results Section */}
      <section className="section seo-results" ref={resultsRef}>
        <div className="container">
          <h2 className="section-title text-center">Results You Can Expect</h2>
          <p className="section-description text-center">
            Our data-driven SEO strategies deliver measurable business outcomes
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

      {/* NEW: SEO Strategies Section */}
      <section className="section seo-strategies">
        <div className="container">
          <h2 className="section-title text-center">Specialized SEO Strategies</h2>
          <p className="section-description text-center">
            Tailored approaches for different business needs and industries
          </p>
          
          <div className="strategies-grid">
            {strategies.map((strategy, index) => (
              <div className="strategy-card" key={index}>
                <div className="strategy-image">
                  <img src={strategy.image} alt={strategy.title} />
                </div>
                <div className="strategy-content">
                  <h3>{strategy.title}</h3>
                  <p>{strategy.description}</p>
                  <Link to={strategy.link} className="strategy-link">
                    Learn More <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Testimonials Section */}
      <section className="section seo-testimonials">
        <div className="container">
          <h2 className="section-title text-center">What Our Clients Say</h2>
          <p className="section-description text-center">
            Hear from businesses that have transformed their online presence with our SEO services
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

      {/* FAQ Section with Animation */}
{/* Enhanced FAQ Section with more questions and better interactivity */}
<section className="section faq-section seo-faq" ref={faqRef}>
  <div className="container">
    <h2 className="section-title text-center">{faqTitle}</h2>
    <p className="section-description text-center">
      Find answers to common questions about our SEO services and approach
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
        Technical SEO
      </button>
      <button 
        className={`faq-tab ${activeFaqTab === 'content' ? 'active' : ''}`} 
        onClick={() => setActiveFaqTab('content')}
      >
        Content & Strategy
      </button>
    </div>
    
    {/* General FAQ Questions */}
    <div className={`faq-content ${activeFaqTab === 'general' ? 'active' : ''}`}>
      <div className="faq-grid">
        {/* Original FAQ items */}
        {faqItems.slice(0, 4).map((item, index) => (
          <div 
            className={`faq-item ${visibleFaqs.includes(index) ? 'visible' : ''}`} 
            key={index}
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
        
        {/* Additional General FAQs */}
        <div 
          className={`faq-item ${visibleFaqs.includes(4) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.6s' }}
        >
          <h3>What industries do you specialize in for SEO?</h3>
          <p>
            We have experience across a wide range of industries including e-commerce, SaaS, healthcare, 
            finance, education, and professional services. Our team includes SEO specialists with industry-specific 
            knowledge who understand the unique challenges and opportunities in different markets. We adapt our 
            strategies to meet the specific needs of your industry.
          </p>
        </div>
        
        <div 
          className={`faq-item ${visibleFaqs.includes(5) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.75s' }}
        >
          <h3>How often will I receive reports on my SEO campaign?</h3>
          <p>
            We provide comprehensive monthly reports detailing key metrics, progress, and insights. 
            These reports include rankings, traffic, conversions, and other KPIs relevant to your business goals. 
            Beyond the data, we explain what the numbers mean for your business and outline our next steps. 
            We're also available for regular check-in calls to discuss results and strategy.
          </p>
        </div>
      </div>
    </div>
    
    {/* Technical SEO FAQ Questions */}
    <div className={`faq-content ${activeFaqTab === 'technical' ? 'active' : ''}`}>
      <div className="faq-grid">
        <div 
          className={`faq-item ${visibleFaqs.includes(0) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.15s' }}
        >
          <h3>What technical SEO issues do you typically address?</h3>
          <p>
            Our technical SEO audits typically address site speed optimization, mobile-friendliness, 
            crawlability issues, indexation problems, URL structure, duplicate content, structured data 
            implementation, site architecture, and internal linking. We prioritize issues based on their 
            impact on search performance and user experience.
          </p>
        </div>
        
        <div 
          className={`faq-item ${visibleFaqs.includes(1) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.3s' }}
        >
          <h3>How do you approach site speed optimization?</h3>
          <p>
            We take a comprehensive approach to site speed optimization, starting with a detailed analysis 
            using tools like Google PageSpeed Insights, Lighthouse, and GTmetrix. We address issues such as image 
            optimization, browser caching, minification of CSS/JavaScript, reducing server response time, 
            implementing lazy loading, and optimizing critical rendering path. Our goal is to improve both 
            the actual and perceived loading times for better user experience and SEO performance.
          </p>
        </div>
        
        <div 
          className={`faq-item ${visibleFaqs.includes(2) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.45s' }}
        >
          <h3>Do you implement schema markup, and what benefits does it provide?</h3>
          <p>
            Yes, we implement appropriate schema markup (structured data) for your website. This helps search 
            engines better understand your content and can result in rich snippets in search results, such as 
            star ratings, FAQs, events, recipes, product information, and more. These enhanced search results 
            can improve click-through rates and visibility, driving more qualified traffic to your site.
          </p>
        </div>
        
        <div 
          className={`faq-item ${visibleFaqs.includes(3) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.6s' }}
        >
          <h3>How do you handle website migrations from an SEO perspective?</h3>
          <p>
            Website migrations require careful planning and execution to avoid SEO setbacks. Our approach 
            includes pre-migration analysis, comprehensive URL mapping, proper 301 redirect implementation, 
            preserving critical on-page SEO elements, updating internal links, maintaining structured data, 
            updating XML sitemaps, and post-migration monitoring. We work closely with your development team 
            to ensure SEO considerations are addressed throughout the process.
          </p>
        </div>
      </div>
    </div>
    
    {/* Content & Strategy FAQ Questions */}
    <div className={`faq-content ${activeFaqTab === 'content' ? 'active' : ''}`}>
      <div className="faq-grid">
        <div 
          className={`faq-item ${visibleFaqs.includes(0) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.15s' }}
        >
          <h3>How do you approach keyword research?</h3>
          <p>
            Our keyword research process begins with understanding your business goals, target audience, and 
            industry. We use advanced tools to identify high-value keywords based on search volume, competition, 
            relevance, and user intent. We look beyond obvious terms to find long-tail opportunities and semantic 
            variations. We then prioritize keywords based on their potential impact and organize them into 
            strategic clusters to guide content development.
          </p>
        </div>
        
        <div 
          className={`faq-item ${visibleFaqs.includes(1) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.3s' }}
        >
          <h3>What makes a good SEO content strategy?</h3>
          <p>
            A good SEO content strategy balances search engine requirements with user needs. It starts with 
            keyword research and competitive analysis to identify content gaps and opportunities. It includes 
            a content calendar with a mix of evergreen and timely content, addresses different stages of the 
            customer journey, and incorporates various content formats. The strategy should prioritize quality, 
            relevance, and user experience while maintaining consistent publishing and updating schedules.
          </p>
        </div>
        
        <div 
          className={`faq-item ${visibleFaqs.includes(2) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.45s' }}
        >
          <h3>How do you approach link building?</h3>
          <p>
            Our link building approach focuses on quality over quantity. We start by creating valuable, 
            link-worthy content. Then we identify relevant websites and build relationships with publishers 
            in your industry. Our strategies include digital PR, content partnerships, resource link building, 
            broken link building, and guest posting on authoritative sites. We avoid risky tactics that could 
            lead to penalties, focusing instead on sustainable methods that build your site's authority naturally.
          </p>
        </div>
        
        <div 
          className={`faq-item ${visibleFaqs.includes(3) ? 'visible' : ''}`} 
          style={{ transitionDelay: '0.6s' }}
        >
          <h3>How do you stay current with SEO best practices and algorithm updates?</h3>
          <p>
            Our team stays current through ongoing professional development, including industry certifications, 
            webinars, and conferences. We follow authoritative SEO publications, participate in professional 
            communities, and network with other SEO professionals. We closely monitor algorithm updates through 
            tools that track SERP fluctuations and official announcements from search engines. This allows us to 
            quickly adapt strategies when needed while maintaining focus on enduring SEO principles.
          </p>
        </div>
      </div>
    </div>
    
    <div className="faq-cta">
      <p>Have more questions? We're here to help!</p>
      <Link to="/contact" className="btn btn-primary">Contact Us</Link>
    </div>
  </div>
</section>

      {/* CTA Section with Particles */}
      <section className="section service-cta-section seo-cta">
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
        {/* <div className="container">
          <div className="service-cta-content">
            <h2>{ctaTitle}</h2>
            <p>{ctaDescription}</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div> */}
      </section>
    </>
  )
}

export default SEO