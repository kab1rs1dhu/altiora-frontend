import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'
import '../styles/LeadGeneration.css' // New custom CSS file

const LeadGeneration = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [expandedSteps, setExpandedSteps] = useState([])
  const [activeFaqTab, setActiveFaqTab] = useState('technical')
  
  // Refs for scroll animations
  const processRef = useRef(null)
  const resultsRef = useRef(null)
  const faqRef = useRef(null)
  const channelsRef = useRef(null)
  const servicesRef = useRef(null)
  
  // Animation states
  const [visibleProcessSteps, setVisibleProcessSteps] = useState([])
  const [visibleResults, setVisibleResults] = useState([])
  const [visibleFaqs, setVisibleFaqs] = useState([])
  const [visibleChannels, setVisibleChannels] = useState([])
  const [visibleServiceCards, setVisibleServiceCards] = useState([])
  
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
      const content = await fetchPageContent('lead-generation')
      setPageContent(content)
    }
    
    loadContent()
  }, [fetchPageContent])
  
  // Helper function for animating elements on scroll
  const animateElements = (elements, visibleArray, setVisibleFunc) => {
    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < windowHeight * 0.85 && !visibleArray.includes(index)) {
        setVisibleFunc(prev => [...prev, index])
      }
    })
  }
  
  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      // Process steps animation
      if (processRef.current) {
        animateElements(
          processRef.current.querySelectorAll('.process-card'),
          visibleProcessSteps,
          setVisibleProcessSteps
        )
      }
      
      // Results animation
      if (resultsRef.current) {
        animateElements(
          resultsRef.current.querySelectorAll('.result-card'),
          visibleResults,
          setVisibleResults
        )
      }
      
      // Channels animation
      if (channelsRef.current) {
        animateElements(
          channelsRef.current.querySelectorAll('.channel-card'),
          visibleChannels,
          setVisibleChannels
        )
      }
      
      // FAQ animation
      if (faqRef.current) {
        animateElements(
          faqRef.current.querySelectorAll('.faq-item'),
          visibleFaqs,
          setVisibleFaqs
        )
      }

      // Services animation
      if (servicesRef.current) {
        animateElements(
          servicesRef.current.querySelectorAll('.service-detail-card'),
          visibleServiceCards,
          setVisibleServiceCards
        )
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    // Initial check
    setTimeout(handleScroll, 500)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visibleProcessSteps, visibleResults, visibleFaqs, visibleChannels, visibleServiceCards])
  
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
        <button onClick={() => fetchPageContent('lead-generation')} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }
  
  // Use default content if API data not available yet
  const heroTitle = getContentSection('lead-generation', 'heroTitle', 'Lead Generation')
  const heroDescription = getContentSection('lead-generation', 'heroDescription', 'Capture high-quality leads with proven strategies that fill your sales pipeline.')
  const overviewTitle = getContentSection('lead-generation', 'overviewTitle', 'Turn Prospects Into Customers')
  const overviewContent = getContentSection('lead-generation', 'overviewContent', 'Generating high-quality leads is the lifeblood of any successful business. Our comprehensive lead generation services help you identify, attract, and convert potential customers who are genuinely interested in your products or services.\n\nAt Altiora, we don\'t just focus on quantity—we prioritize quality leads that have a higher probability of conversion. Our data-driven approach ensures that your sales team spends time on prospects with real potential rather than cold leads.')
  const servicesTitle = getContentSection('lead-generation', 'servicesTitle', 'Our Lead Generation Services')
  const processTitle = getContentSection('lead-generation', 'processTitle', 'Our Lead Generation Process')
  const channelsTitle = getContentSection('lead-generation', 'channelsTitle', 'Our Lead Generation Channels')
  const channelsDescription = getContentSection('lead-generation', 'channelsDescription', 'We leverage multiple channels to reach your ideal customers where they are most active')
  const resultsTitle = getContentSection('lead-generation', 'resultsTitle', 'Results You Can Expect')
  const faqTitle = getContentSection('lead-generation', 'faqTitle', 'Frequently Asked Questions')
  const ctaTitle = getContentSection('lead-generation', 'ctaTitle', 'Ready to Fill Your Sales Pipeline?')
  const ctaDescription = getContentSection('lead-generation', 'ctaDescription', 'Let\'s create a lead generation strategy that drives growth for your business.')
  
  // Parse services from the API response, or use default services
  let services = []
  try {
    services = JSON.parse(getContentSection('lead-generation', 'services', '[]'))
  } catch (err) {
    console.error('Error parsing services:', err)
    // Default services
    services = [
      {
        icon: '🔍',
        title: 'Search Engine Marketing',
        description: 'Capture leads actively searching for your products or services with targeted paid search campaigns on Google, Bing, and other search engines.'
      },
      {
        icon: '📱',
        title: 'Social Media Lead Generation',
        description: 'Leverage platforms like LinkedIn, Facebook, and Instagram to target potential customers based on demographics, interests, and behaviors.'
      },
      {
        icon: '📧',
        title: 'Email Marketing Campaigns',
        description: 'Develop targeted email sequences that nurture prospects, provide value, and guide them through your sales funnel.'
      },
      {
        icon: '📝',
        title: 'Content Marketing',
        description: 'Create valuable content that attracts and engages your target audience, establishing your expertise and building trust with potential customers.'
      },
      {
        icon: '🎯',
        title: 'Landing Page Optimization',
        description: 'Design and optimize conversion-focused landing pages that turn visitors into leads with compelling offers and clear calls to action.'
      },
      {
        icon: '📊',
        title: 'Lead Scoring & Qualification',
        description: 'Implement systems to evaluate and prioritize leads based on their demographics, behaviors, and engagement level to focus on the most promising prospects.'
      }
    ]
  }
  
  // Parse process steps from the API response, or use default steps
  let processSteps = []
  try {
    processSteps = JSON.parse(getContentSection('lead-generation', 'processSteps', '[]'))
  } catch (err) {
    console.error('Error parsing process steps:', err)
    // Default process steps
    processSteps = [
      {
        number: 1,
        title: 'Research & Strategy Development',
        description: 'We identify your ideal customer profiles, research your market, and develop a comprehensive lead generation strategy tailored to your business goals.'
      },
      {
        number: 2,
        title: 'Channel Selection & Campaign Setup',
        description: 'We identify the most effective channels for your target audience and create optimized campaigns to capture qualified leads.'
      },
      {
        number: 3,
        title: 'Content Creation & Offer Development',
        description: 'We develop compelling lead magnets, content, and offers that provide value to your prospects and incentivize them to share their contact information.'
      },
      {
        number: 4,
        title: 'Lead Nurturing',
        description: 'We implement automated sequences and personalized touchpoints to build relationships with leads and guide them toward a purchasing decision.'
      },
      {
        number: 5,
        title: 'Analysis & Optimization',
        description: 'We continuously monitor campaign performance, analyze results, and make data-driven adjustments to improve lead quality and conversion rates.'
      }
    ]
  }
  
  // Parse channels from the API response, or use default channels
  let channels = []
  try {
    channels = JSON.parse(getContentSection('lead-generation', 'channels', '[]'))
  } catch (err) {
    console.error('Error parsing channels:', err)
    // Default channels
    channels = [
      {
        icon: '🔍',
        title: 'Search',
        items: ['Google Ads', 'Bing Ads', 'SEO']
      },
      {
        icon: '📱',
        title: 'Social',
        items: ['LinkedIn', 'Facebook/Instagram', 'Twitter']
      },
      {
        icon: '📧',
        title: 'Email',
        items: ['Newsletters', 'Drip Campaigns', 'Cold Outreach']
      },
      {
        icon: '🖥️',
        title: 'Display',
        items: ['Programmatic Ads', 'Remarketing', 'Banner Ads']
      }
    ]
  }
  
  // Parse results from the API response, or use default results
  let results = []
  try {
    results = JSON.parse(getContentSection('lead-generation', 'results', '[]'))
  } catch (err) {
    console.error('Error parsing results:', err)
    // Default results with expanded descriptions
    results = [
      {
        icon: '📈',
        title: 'Increased Lead Volume',
        description: 'Generate more potential customers for your business with targeted campaigns that reach your ideal audience across multiple channels, significantly expanding your prospect pool.'
      },
      {
        icon: '⭐',
        title: 'Higher-Quality Leads',
        description: 'Attract prospects who are more likely to convert and become loyal customers through strategic targeting, qualifying questions, and personalized nurturing sequences.'
      },
      {
        icon: '💰',
        title: 'Improved ROI',
        description: 'Get more value from your marketing budget with efficient lead generation strategies that focus on channels and approaches with the highest return for your specific business.'
      },
      {
        icon: '🔄',
        title: 'Shortened Sales Cycle',
        description: 'Nurture leads effectively to reduce the time from initial contact to conversion, with educational content and targeted messaging that addresses objections and builds trust.'
      }
    ]
  }

  // New enhanced case studies
  const caseStudies = [
    {
      company: 'TechSolutions Inc.',
      industry: 'SaaS',
      challenge: 'Struggling to generate qualified B2B leads for their enterprise software solution',
      solution: 'Implemented a multi-channel approach with LinkedIn targeting, content marketing, and webinar series',
      results: '247% increase in qualified leads and 35% reduction in cost per acquisition',
      image: '/images/case-study-1.jpg'
    },
    {
      company: 'GreenHome Renovations',
      industry: 'Home Services',
      challenge: 'Needed to attract homeowners interested in eco-friendly renovations in specific geographic areas',
      solution: 'Developed targeted local SEO and PPC campaigns with custom landing pages and lead magnets',
      results: '189% increase in consultation requests and 42% improvement in lead quality',
      image: '/images/case-study-2.jpg'
    },
    {
      company: 'HealthFit',
      industry: 'Fitness',
      challenge: 'Wanted to generate leads for their new online fitness program during competitive market conditions',
      solution: 'Created a comprehensive social media strategy with free challenge campaigns and email nurturing',
      results: '315% increase in email subscribers and 28% conversion rate to paid memberships',
      image: '/images/case-study-3.jpg'
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "Altiora transformed our lead generation approach completely. Within just 3 months, we saw a 215% increase in qualified leads and a significant improvement in our sales conversion rates.",
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechSolutions Inc.",
      avatar: "/images/testimonial-1.jpg"
    },
    {
      quote: "Working with Altiora has been game-changing for our business. Their data-driven approach to lead generation helped us target the right prospects and build a consistent pipeline of opportunities.",
      name: "Michael Chen",
      position: "CEO",
      company: "GrowthHub",
      avatar: "/images/testimonial-2.jpg"
    },
    {
      quote: "The team at Altiora truly understands lead generation. They not only increased our lead volume but also implemented qualification processes that ensured our sales team focused on the most promising prospects.",
      name: "Emily Rodriguez",
      position: "Sales Director",
      company: "Innovate Digital",
      avatar: "/images/testimonial-3.jpg"
    }
  ];
  
  // Default FAQ items
  const defaultFaqItems = [
    {
      question: 'How long does it take to see results from lead generation efforts?',
      answer: 'While some paid channels (e.g., search or social ads) can start producing leads within days, sustainable results typically emerge over 4–8 weeks as campaigns are optimized and nurturing sequences kick in.'
    },
    {
      question: 'What budget do I need for an effective lead generation program?',
      answer: 'Budgets vary by industry and goals, but most companies start seeing meaningful impact with a combined media and management spend of at least $3k–$5k per month. We tailor strategies to maximise ROI at your budget level.'
    },
    {
      question: 'How do you qualify and score leads?',
      answer: 'We build a custom lead-scoring model based on demographic fit (company size, role, industry) and behavioural signals (content engagement, site visits). Scores sync to your CRM so sales can focus on the hottest prospects.'
    },
    {
      question: 'Do you provide ongoing optimisation and reporting?',
      answer: 'Yes. We continuously A/B test ads, landing pages, and email sequences, providing transparent weekly or monthly reports that highlight performance, insights, and next-step recommendations.'
    }
  ]

  // Parse FAQ items from the API response, or use default FAQ items
  let faqItems = []
  try {
    faqItems = JSON.parse(getContentSection('lead-generation', 'faqItems', '[]'))
  } catch (err) {
    console.error('Error parsing FAQ items:', err)
  }

  if (faqItems.length === 0) {
    faqItems = defaultFaqItems
  }

  // Additional FAQ items organized by category
  const technicalFaqs = faqItems.length ? faqItems : defaultFaqItems
  
  const simpleProcessSteps = [
    {
      number: 1,
      title: 'Research & Targeting',
      description: 'We analyze your market and ideal customer profiles to lay a data-driven foundation for success.'
    },
    {
      number: 2,
      title: 'Campaign Build',
      description: 'Compelling offers, landing pages and creative assets are crafted to attract and capture qualified prospects.'
    },
    {
      number: 3,
      title: 'Launch & Optimization',
      description: 'Multi-channel campaigns go live and are continually optimized for maximum conversions.'
    },
    {
      number: 4,
      title: 'Qualification & Handoff',
      description: 'Leads are scored, nurtured, and seamlessly handed to your sales team when they are purchase-ready.'
    }
  ]
  
  const strategicFaqs = [
    {
      question: 'How do you determine which lead generation channels to use?',
      answer: 'We conduct thorough research to identify where your target audience spends their time online, analyze your competitors\' strategies, and assess previous campaign performance. We then select and continuously refine the optimal channel mix.'
    },
    {
      question: 'How many leads can I expect per month?',
      answer: 'Lead volume depends on factors like industry, target audience, budget, and competition. After an initial consultation, we provide realistic projections based on data from similar campaigns.'
    },
    {
      question: 'How do you nurture leads that aren\'t ready to buy?',
      answer: 'We build multi-touch nurturing sequences using email, retargeting ads, and personalised content to keep your brand top-of-mind and guide prospects toward a purchasing decision.'
    },
    {
      question: 'What industries do you specialise in?',
      answer: 'Our team has experience across SaaS, professional services, healthcare, finance, manufacturing, e-commerce, education, and real estate, adapting strategies to each sector\'s buying processes.'
    }
  ]
  
  return (
    <>
      {/* Hero Section with Particles */}
      <section className="service-hero lead-gen-hero">
        <div className="lead-gen-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="lead-gen-particle"
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
            <span className="hero-badge">Lead Generation Solutions</span>
            <h1>{heroTitle}</h1>
            <p className="service-hero-description">
              {heroDescription}
            </p>
            <Link to="/contact" className="btn btn-primary btn-lead-gen">Get a Lead Generation Strategy</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section lead-gen-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>{overviewTitle}</h2>
              {overviewContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <div className="overview-stats">
                <div className="stat">
                  <h3>61%</h3>
                  <p>of marketers rank lead generation as their top challenge</p>
                </div>
                <div className="stat">
                  <h3>79%</h3>
                  <p>of leads never convert without proper nurturing</p>
                </div>
                <div className="stat">
                  <h3>10x</h3>
                  <p>higher ROI with targeted lead generation campaigns</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <div className="image-wrapper">
                <img src="/images/leadgeneration.webp" alt="Lead Generation" />
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

      {/* Our Process – simplified 4-step overview */}
      <section className="section leadgen-process-simple" ref={processRef}>
        <div className="container">
          <div className="section-heading" style={{ textAlign: 'center' }}>
            <span className="section-subtitle">How We Work</span>
            <h2 className="section-title">
              <span className="text-gradient">Our Process</span>
            </h2>
            <p className="section-description" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '20px' }}>
              We follow a proven methodology to generate quality leads that convert into customers
            </p>
          </div>

          <div className="process-card-grid">
            {simpleProcessSteps.map((step, index) => (
              <div 
                className={`process-card ${visibleProcessSteps.includes(index) ? 'visible' : ''}`} 
                key={index} 
                style={{ 
                  transitionDelay: `${index * 0.15}s`,
                  opacity: visibleProcessSteps.includes(index) ? 1 : 0,
                  transform: visibleProcessSteps.includes(index) ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="process-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section lead-gen-testimonials">
        <div className="testimonial-blob blob-1"></div>
        <div className="testimonial-blob blob-2"></div>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Client Success Stories</span>
            <h2 className="section-title">
              <span className="text-gradient">What Our Clients Say</span>
            </h2>
            <p className="section-description">
              Hear from businesses that have transformed their lead generation with our services
            </p>
          </div>
          
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

      {/* Enhanced FAQ Section with Tabs */}
      <section className="section faq-section lead-gen-faq" ref={faqRef}>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Got Questions?</span>
            <h2 className="section-title">
              <span className="text-gradient">{faqTitle}</span>
            </h2>
            <p className="section-description">
              Find answers to common questions about our lead generation services and approach
            </p>
          </div>
          
          <div className="faq-tabs">
            <button 
              className={`faq-tab ${activeFaqTab === 'technical' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('technical')}
            >
              General Questions
            </button>
            <button 
              className={`faq-tab ${activeFaqTab === 'strategic' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('strategic')}
            >
              Strategy & Results
            </button>
          </div>
          
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
          
          <div className={`faq-content ${activeFaqTab === 'strategic' ? 'active' : ''}`}>
            <div className="faq-grid">
              {strategicFaqs.map((item, index) => (
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
      <section className="section service-cta-section lead-gen-cta">
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
            <Link to="/contact" className="btn btn-primary btn-glow btn-large">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default LeadGeneration