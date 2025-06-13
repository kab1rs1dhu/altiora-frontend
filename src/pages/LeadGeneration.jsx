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
  const [activeFaqTab, setActiveFaqTab] = useState('general')
  
  // Refs for scroll animations
  const processRef = useRef(null)
  const resultsRef = useRef(null)
  const faqRef = useRef(null)
  const channelsRef = useRef(null)
  
  // Animation states
  const [visibleProcessSteps, setVisibleProcessSteps] = useState([])
  const [visibleResults, setVisibleResults] = useState([])
  const [visibleFaqs, setVisibleFaqs] = useState([])
  const [visibleChannels, setVisibleChannels] = useState([])
  
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
      
      // Channels animation
      if (channelsRef.current) {
        const channelCards = channelsRef.current.querySelectorAll('.channel-card')
        channelCards.forEach((card, index) => {
          const rect = card.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8 && !visibleChannels.includes(index)) {
            setVisibleChannels(prev => [...prev, index])
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
  }, [visibleProcessSteps, visibleResults, visibleFaqs, visibleChannels])
  
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
  
  // Parse FAQ items from the API response, or use default FAQ items
  let faqItems = []
  try {
    faqItems = JSON.parse(getContentSection('lead-generation', 'faqItems', '[]'))
  } catch (err) {
    console.error('Error parsing FAQ items:', err)
    // Default FAQ items
    faqItems = [
      {
        question: 'How quickly will I see results from lead generation campaigns?',
        answer: 'The timeline for results varies depending on your industry, target audience, and chosen strategies. Some channels like paid search can generate leads immediately, while others like content marketing may take several weeks or months to build momentum. We focus on both quick wins and sustainable long-term results.'
      },
      {
        question: 'How do you measure the success of lead generation campaigns?',
        answer: 'We track key metrics including lead volume, lead quality, cost per lead, conversion rates, and ROI. We provide regular reports with these metrics and actionable insights. Our focus is always on the metrics that matter most to your specific business goals.'
      },
      {
        question: 'What makes a good lead generation strategy?',
        answer: 'Effective lead generation strategies are multi-channel, data-driven, and focused on attracting high-quality leads rather than just high quantities. They include compelling offers, clear calls to action, and systematic nurturing processes. Most importantly, they align with your specific business goals and target audience.'
      },
      {
        question: 'How do you ensure leads are qualified?',
        answer: 'We implement lead scoring systems that evaluate prospects based on demographic fit, engagement level, and buying signals. We also use targeted messaging and qualification questions in our lead capture forms to filter out prospects who aren\'t a good fit for your products or services.'
      }
    ]
  }

  // Additional FAQ items organized by category
  const technicalFaqs = [
    {
      question: 'What lead generation tools and technologies do you use?',
      answer: 'We utilize a suite of industry-leading tools including HubSpot, Marketo, Google Analytics, SEMrush, LinkedIn Sales Navigator, Unbounce for landing pages, and various automation platforms. Our tech stack is customized based on your specific needs and existing systems to ensure seamless integration and optimal results.'
    },
    {
      question: 'Can you integrate with our existing CRM or marketing automation platform?',
      answer: 'Yes, we can integrate with most major CRM and marketing automation platforms including Salesforce, HubSpot, Marketo, Pardot, and others. We ensure that lead data flows smoothly into your existing systems, maintaining proper tracking and attribution throughout the process.'
    },
    {
      question: 'How do you handle lead data privacy and compliance?',
      answer: 'We maintain strict compliance with data privacy regulations including GDPR, CCPA, and other relevant laws. Our lead generation practices include proper consent mechanisms, transparent data policies, and secure data handling procedures. We also help you ensure your lead collection and management processes are compliant with applicable regulations.'
    },
    {
      question: 'What types of lead magnets are most effective?',
      answer: 'The most effective lead magnets vary by industry and target audience. Common high-performing options include industry reports, how-to guides, templates, calculators, assessments, webinars, and free trials. We test different formats to identify what resonates best with your specific audience and drives the highest quality leads.'
    }
  ];

  const strategicFaqs = [
    {
      question: 'How do you determine which lead generation channels to use?',
      answer: 'We conduct thorough research to identify where your target audience spends their time online, analyze your competitors strategies, and assess previous campaign performance. We also consider your sales cycle, budget, and business goals to determine the optimal channel mix. Our approach is data-driven and continuously refined based on performance.'
    },
    {
      question: 'How many leads can I expect per month?',
      answer: 'Lead volume varies significantly based on factors like your industry, target audience, budget, and competition. During our initial consultation, we will establish realistic projections based on our experience with similar businesses. Our focus is not just on quantity but on generating high-quality leads that convert into customers.'
    },
    {
      question: 'How do you nurture leads that are not ready to buy?',
      answer: 'We develop targeted nurturing sequences using email, retargeting ads, and content marketing to keep your brand top-of-mind. These sequences deliver relevant information based on the prospects interests and stage in the buying journey. Our nurturing strategies are designed to build trust, address objections, and guide prospects toward a purchasing decision when they are ready.'
    },
    {
      question: 'What industries do you specialize in for lead generation?',
      answer: 'We have experience across B2B and B2C sectors including SaaS, professional services, healthcare, finance, manufacturing, e-commerce, education, and real estate. Our team includes specialists with industry-specific knowledge who understand the unique challenges and buying processes in different sectors.'
    }
  ];
  
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

      {/* Services Section */}
      <section className="section service-details-section lead-gen-services">
        <div className="service-blob blob-1"></div>
        <div className="service-blob blob-2"></div>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">How We Help</span>
            <h2 className="section-title">
              <span className="text-gradient">{servicesTitle}</span>
            </h2>
            <p className="section-description">
              Comprehensive lead generation solutions tailored to your business goals
            </p>
          </div>
          <div className="service-details-grid">
            {services.map((service, index) => (
              <div 
                className="service-detail-card" 
                key={index}
                style={{ 
                  '--card-color': `var(--lead-gen-color-${index % 5 + 1})`,
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
      <section className="section process-section lead-gen-process" ref={processRef}>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Methodology</span>
            <h2 className="section-title">
              <span className="text-gradient">{processTitle}</span>
            </h2>
            <p className="section-description">
              Our proven lead generation methodology delivers consistent results through a structured, data-driven approach
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
                    {index === 0 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Create detailed buyer personas based on your ideal customers</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Analyze competitor lead generation tactics and results</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Develop comprehensive lead generation goals and KPIs</span>
                        </div>
                      </>
                    )}
                    
                    {index === 1 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Select optimal channels based on where your audience is most active</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Set up tracking and attribution to measure performance</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Create campaign-specific targeting parameters and budgets</span>
                        </div>
                      </>
                    )}
                    
                    {index === 2 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Design high-value lead magnets that address audience pain points</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Develop optimized landing pages with clear value propositions</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Create compelling copy and creative assets for all campaign touchpoints</span>
                        </div>
                      </>
                    )}
                    
                    {index === 3 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Set up automated email sequences tailored to lead interests</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Implement lead scoring to identify when prospects are sales-ready</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Create personalized touchpoints based on lead behavior</span>
                        </div>
                      </>
                    )}
                    
                    {index === 4 && (
                      <>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Track key performance metrics across all campaigns and channels</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Conduct A/B testing to optimize conversion rates</span>
                        </div>
                        <div className="process-step-detail">
                          <i className="fa-solid fa-check"></i>
                          <span>Provide detailed reporting with actionable insights and recommendations</span>
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
            <p>Ready to start generating more qualified leads?</p>
            <Link to="/contact" className="btn btn-primary">Get a Customized Strategy</Link>
          </div>
        </div>
      </section>

      {/* Lead Generation Channels Section with Animation */}
      <section className="section channels-section lead-gen-channels" ref={channelsRef}>
        <div className="channel-blob blob-1"></div>
        <div className="channel-blob blob-2"></div>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Multi-Channel Approach</span>
            <h2 className="section-title">
              <span className="text-gradient">{channelsTitle}</span>
            </h2>
            <p className="section-description">
              {channelsDescription}
            </p>
          </div>
          
          <div className="channels-grid">
            {channels.map((channel, index) => (
              <div 
                className={`channel-card ${visibleChannels.includes(index) ? 'visible' : ''}`} 
                key={index}
                style={{ 
                  '--channel-color': `var(--lead-gen-color-${index % 5 + 1})`,
                  transitionDelay: `${index * 0.15}s` 
                }}
              >
                <div className="channel-icon">
                  <i className="icon">{channel.icon}</i>
                </div>
                <h3>{channel.title}</h3>
                <ul className="channel-list">
                  {channel.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section with Animation */}
      <section className="section lead-gen-results" ref={resultsRef}>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Driving Success</span>
            <h2 className="section-title">
              <span className="text-gradient">{resultsTitle}</span>
            </h2>
            <p className="section-description">
              Our data-driven lead generation strategies deliver measurable business outcomes
            </p>
          </div>
          
          <div className="results-grid">
            {results.map((result, index) => (
              <div 
                className={`result-card ${visibleResults.includes(index) ? 'visible' : ''}`} 
                key={index} 
                style={{ 
                  '--result-color': `var(--lead-gen-color-${index % 5 + 1})`,
                  transitionDelay: `${index * 0.15}s` 
                }}
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

      {/* Case Studies Section */}
      <section className="section lead-gen-case-studies">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Success Stories</span>
            <h2 className="section-title">
              <span className="text-gradient">Real-World Results</span>
            </h2>
            <p className="section-description">
              See how our lead generation strategies have transformed businesses like yours
            </p>
          </div>
          
          <div className="case-studies-grid">
            {caseStudies.map((study, index) => (
              <div className="case-study-card" key={index}>
                <div className="case-study-image">
                  <img src={study.image} alt={study.company} />
                  <div className="industry-badge">{study.industry}</div>
                </div>
                <div className="case-study-content">
                  <h3>{study.company}</h3>
                  
                  <div className="case-study-detail">
                    <h4>Challenge:</h4>
                    <p>{study.challenge}</p>
                  </div>
                  
                  <div className="case-study-detail">
                    <h4>Solution:</h4>
                    <p>{study.solution}</p>
                  </div>
                  
                  <div className="case-study-detail">
                    <h4>Results:</h4>
                    <p className="results-highlight">{study.results}</p>
                  </div>
                  
                  <Link to="/contact" className="case-study-link">
                    Get Similar Results <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
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
              className={`faq-tab ${activeFaqTab === 'strategic' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('strategic')}
            >
              Strategy & Results
            </button>
          </div>
          
          {/* General FAQ Questions */}
          <div className={`faq-content ${activeFaqTab === 'general' ? 'active' : ''}`}>
            <div className="faq-grid">
              {/* Original FAQ items */}
              {faqItems.map((item, index) => (
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
          
          {/* Strategic FAQ Questions */}
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
         