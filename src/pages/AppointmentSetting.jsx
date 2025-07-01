import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'
import '../styles/AppointmentSetting.css'

const AppointmentSetting = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  const [activeFaqTab, setActiveFaqTab] = useState('general')
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  
  // Refs for scroll animations
  const processRef = useRef(null)
  const faqRef = useRef(null)
  
  // Animation states
  const [visibleProcessSteps, setVisibleProcessSteps] = useState([])
  const [visibleFaqs, setVisibleFaqs] = useState([])
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('appointment-setting')
      setPageContent(content)
    }
    
    loadContent()
  }, [fetchPageContent])
  
  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      // Process steps animation
      if (processRef.current) {
        const processCards = processRef.current.querySelectorAll('.process-card')
        processCards.forEach((card, index) => {
          const rect = card.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8 && !visibleProcessSteps.includes(index)) {
            setVisibleProcessSteps(prev => [...prev, index])
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
  }, [visibleProcessSteps, visibleFaqs])
  
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
        <button onClick={() => fetchPageContent('appointment-setting')} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }
  
  // Use default content if API data not available yet
  const heroTitle = getContentSection('appointment-setting', 'heroTitle', 'Appointment Setting')
  const heroDescription = getContentSection('appointment-setting', 'heroDescription', 'Fill your calendar with qualified prospects through our professional appointment setting services.')
  const overviewTitle = getContentSection('appointment-setting', 'overviewTitle', 'Book More Meetings with Decision-Makers')
  const overviewContent = getContentSection('appointment-setting', 'overviewContent', 'Appointment setting is often the most challenging part of the sales process. Our professional appointment setting services remove this burden from your sales team, allowing them to focus on what they do best—closing deals.\n\nAt Altiora, we connect your business with qualified decision-makers who are genuinely interested in your products or services. Our experienced team uses proven strategies to engage prospects, overcome objections, and secure quality appointments for your sales team.')
  const servicesTitle = getContentSection('appointment-setting', 'servicesTitle', 'Our Appointment Setting Services')
  const processTitle = getContentSection('appointment-setting', 'processTitle', 'Our Appointment Setting Process')
  const faqTitle = getContentSection('appointment-setting', 'faqTitle', 'Frequently Asked Questions')
  const ctaTitle = getContentSection('appointment-setting', 'ctaTitle', 'Ready to Fill Your Calendar?')
  const ctaDescription = getContentSection('appointment-setting', 'ctaDescription', 'Let\'s discuss how our appointment setting services can connect you with qualified prospects.')
  
  // Parse services from the API response, or use default services
  let services = []
  try {
    services = JSON.parse(getContentSection('appointment-setting', 'services', '[]'))
  } catch (err) {
    console.error('Error parsing services:', err)
    // Default services
    services = [
      {
        icon: '📞',
        title: 'B2B Appointment Setting',
        description: 'We connect your business with qualified decision-makers at target companies through personalized outreach and relationship building.'
      },
      {
        icon: '📧',
        title: 'Email Appointment Campaigns',
        description: 'We develop and execute strategic email sequences designed to engage prospects and convert them into scheduled appointments.'
      },
      {
        icon: '🔄',
        title: 'Follow-Up Management',
        description: 'We implement consistent follow-up processes to nurture leads and increase appointment conversion rates over time.'
      },
      {
        icon: '🎯',
        title: 'Target Account Prospecting',
        description: 'We identify and engage high-value accounts that match your ideal customer profile through specialized outreach strategies.'
      },
      {
        icon: '📅',
        title: 'Calendar Management',
        description: 'We handle scheduling logistics, confirmations, and reminders to ensure appointments go smoothly and reduce no-shows.'
      },
      {
        icon: '📊',
        title: 'Performance Tracking & Reporting',
        description: 'We provide detailed reports on outreach activities, conversion rates, and appointment quality to continuously improve results.'
      }
    ]
  }
  
  // Parse process steps from the API response, or use default steps
  let processSteps = []
  try {
    processSteps = JSON.parse(getContentSection('appointment-setting', 'processSteps', '[]'))
  } catch (err) {
    console.error('Error parsing process steps:', err)
    // Default process steps
    processSteps = [
      {
        number: 1,
        title: 'Ideal Customer Profiling',
        description: 'We work with you to define your ideal customer profile, including industry, company size, decision-maker roles, and qualifying criteria.'
      },
      {
        number: 2,
        title: 'Message Development',
        description: 'We create compelling scripts and messaging tailored to your target audience, highlighting your unique value proposition and relevant pain points.'
      },
      {
        number: 3,
        title: 'Prospect Identification',
        description: 'We research and identify qualified prospects that match your ideal customer profile and build targeted outreach lists.'
      },
      {
        number: 4,
        title: 'Multi-Channel Outreach',
        description: 'We engage prospects through multiple channels including calls, emails, and social media to maximize response rates.'
      },
      {
        number: 5,
        title: 'Appointment Scheduling & Handoff',
        description: 'We schedule qualified appointments and provide your sales team with detailed prospect information to ensure productive meetings.'
      }
    ]
  }
  
  // Testimonials data
  const testimonials = [
    {
      quote: "Altiora's appointment setting services have been a game-changer for our sales team. They consistently deliver high-quality meetings with decision-makers who are genuinely interested in our solutions.",
      name: "David Thompson",
      position: "Sales Director",
      company: "TechSolutions Inc.",
      avatar: "/images/testimonial-1.jpg"
    },
    {
      quote: "Since working with Altiora, our sales team has been able to focus on what they do best—closing deals. The quality of appointments they secure for us has increased our conversion rates dramatically.",
      name: "Sarah Williams",
      position: "VP of Sales",
      company: "Innovative Systems",
      avatar: "/images/testimonial-2.jpg"
    },
    {
      quote: "The team at Altiora takes the time to truly understand our business and target audience. Their tailored approach to appointment setting has helped us enter new markets and grow our customer base.",
      name: "Michael Chen",
      position: "CEO",
      company: "GlobalTech Solutions",
      avatar: "/images/testimonial-3.jpg"
    }
  ];
  
  // Parse FAQ items from the API response, or use default FAQ items
  let faqItems = []
  try {
    faqItems = JSON.parse(getContentSection('appointment-setting', 'faqItems', '[]'))
  } catch (err) {
    console.error('Error parsing FAQ items:', err)
  }

  // Default FAQs if none are available from API
  const generalFaqs = faqItems.length ? faqItems : [
    {
      question: 'How many appointments can I expect each month?',
      answer: 'The number of appointments varies based on factors like your industry, target audience, and the complexity of your offering. During our initial consultation, we\'ll discuss realistic expectations based on your specific situation and establish clear targets for your campaign.'
    },
    {
      question: 'How do you ensure appointment quality?',
      answer: 'We use detailed qualification criteria developed in collaboration with your team to ensure we\'re booking appointments with the right prospects. We gather key information during our conversations with prospects and only schedule appointments with those who demonstrate genuine interest and fit your ideal customer profile.'
    },
    {
      question: 'How quickly can you start setting appointments?',
      answer: 'After our initial consultation and strategy development, we can typically begin outreach within 1-2 weeks. The time to first appointments varies by industry and targeting, but most clients start seeing appointments within the first month of active outreach.'
    },
    {
      question: 'Do we need to provide contact lists?',
      answer: 'While we can work with your existing contact lists, we also have extensive research capabilities to build targeted prospect lists based on your ideal customer profile. This combined approach typically yields the best results, leveraging both your existing network and our ability to identify new opportunities.'
    }
  ]

  const technicalFaqs = [
    {
      question: 'What technologies do you use for appointment setting?',
      answer: 'We utilize industry-leading technologies including CRM systems (Salesforce, HubSpot), outreach platforms (Outreach.io, SalesLoft), email verification tools, social selling platforms (LinkedIn Sales Navigator), scheduling tools (Calendly, HubSpot Meetings), and call tracking software to optimize every aspect of the appointment setting process.'
    },
    {
      question: 'How do you integrate with our existing sales tools?',
      answer: 'Our team works seamlessly with your existing tech stack. We can integrate with most major CRM systems, scheduling tools, and communication platforms. We\'ll establish clear processes for appointment handoffs and data sharing to ensure a smooth workflow between our appointment setters and your sales team.'
    },
    {
      question: 'What reporting and analytics do you provide?',
      answer: 'We provide comprehensive weekly and monthly reports covering key metrics like calls made, emails sent, conversations held, appointment set rates, show rates, and conversion to opportunity. Our custom dashboards allow you to track ROI and monitor campaign performance in real-time.'
    },
    {
      question: 'How do you handle no-shows and rescheduling?',
      answer: 'We implement a proactive confirmation and follow-up process that achieves a typical show rate of 85-95%. When no-shows occur, we handle the rescheduling process and keep your sales team informed. We also analyze patterns to continuously improve our confirmation strategy.'
    }
  ]
  
  return (
    <>
      {/* Hero Section with Particles */}
      <section className="service-hero appointment-hero">
        <div className="appointment-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="appointment-particle"
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
            <span className="hero-badge">Appointment Setting Solutions</span>
            <h1>{heroTitle}</h1>
            <p className="service-hero-description">
              {heroDescription}
            </p>
            <Link to="/contact" className="btn btn-primary btn-appointment">Get More Appointments</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section appointment-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>{overviewTitle}</h2>
              {overviewContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <div className="overview-stats">
                <div className="stat">
                  <h3>48%</h3>
                  <p>of sales professionals say prospecting is the most challenging part of sales</p>
                </div>
                <div className="stat">
                  <h3>75%</h3>
                  <p>increase in selling time when outsourcing appointment setting</p>
                </div>
                <div className="stat">
                  <h3>35%</h3>
                  <p>higher close rates with pre-qualified appointments</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <div className="image-wrapper">
                <img src="/images/apt-setting.jpg" alt="Appointment Setting" />
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
      <section className="section service-details-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Services</span>
            <h2 className="section-title">
              <span className="text-gradient">{servicesTitle}</span>
            </h2>
            <p className="section-description">
              We offer comprehensive appointment setting solutions designed to connect your business with qualified decision-makers and drive your sales pipeline forward
            </p>
          </div>
          
          <div className="services-intro">
            <div className="services-intro-content">
              <h3>What Sets Us Apart</h3>
              <p>At Altiora, we combine proven methodologies with cutting-edge technology to deliver high-quality appointments that convert. Our team of expert appointment setters understands the nuances of business development across industries and works as an extension of your sales team.</p>
              <ul className="services-benefits">
                <li><span>✓</span> Targeted outreach to decision-makers</li>
                <li><span>✓</span> Multi-channel approach for maximum engagement</li>
                <li><span>✓</span> Quality over quantity focus</li>
                <li><span>✓</span> Detailed prospect qualification</li>
              </ul>
            </div>
            <div className="services-intro-stats">
              <div className="intro-stat">
                <h4>80%</h4>
                <p>Faster path to qualified meetings</p>
              </div>
              <div className="intro-stat">
                <h4>3x</h4>
                <p>More qualified appointments</p>
              </div>
              <div className="intro-stat">
                <h4>25%</h4>
                <p>Higher conversion rates</p>
              </div>
            </div>
          </div>
          
          <div className="service-details-grid">
            {services.map((service, index) => (
              <div className="service-detail-card" key={index}>
                <div className="service-detail-icon">
                  <span className="icon">{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-features">
                  {index === 0 && <span className="service-tag">Most Popular</span>}
                  {index === 1 && <span className="service-tag">High ROI</span>}
                  {index === 2 && <span className="service-tag">Essential</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="service-bottom-cta">
            <p>Looking for a custom solution? We can tailor our appointment setting services to meet your specific needs.</p>
            <Link to="/contact" className="btn btn-outline-primary">Discuss Your Requirements</Link>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="section appointment-process" ref={processRef}>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">How We Work</span>
            <h2 className="section-title">
              <span className="text-gradient">{processTitle}</span>
            </h2>
            <p className="section-description">
              Our proven 5-step methodology ensures consistent, high-quality appointments with decision-makers who are ready to engage with your sales team
            </p>
          </div>
          
          <div className="process-intro">
            <div className="process-intro-graphic">
              <div className="process-path">
                <div className="path-line"></div>
                <div className="path-start">
                  <span>Start</span>
                </div>
                <div className="path-end">
                  <span>Appointments</span>
                </div>
              </div>
            </div>
            <div className="process-intro-text">
              <p>Our systematic approach transforms cold prospects into warm leads and qualified appointments. We focus on building relationships and providing value at each touchpoint, ensuring that when we hand off an appointment to your sales team, the prospect is genuinely interested in learning more.</p>
              <div className="process-highlights">
                <div className="highlight">
                  <span className="highlight-icon">⏱️</span>
                  <div className="highlight-text">
                    <h4>Save Time</h4>
                    <p>Focus on closing while we handle the prospecting</p>
                  </div>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">📈</span>
                  <div className="highlight-text">
                    <h4>Increase Pipeline</h4>
                    <p>Consistent flow of qualified opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="process-card-grid">
            {processSteps.map((step, index) => (
              <div className={`process-card ${visibleProcessSteps.includes(index) ? 'visible' : ''}`} key={index} style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="process-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index === 0 && <div className="process-card-badge">First Step</div>}
                {index === processSteps.length - 1 && <div className="process-card-badge success">Final Step</div>}
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
              Hear from businesses that have transformed their sales process with our appointment setting services
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
      <section className="section faq-section appointment-faq" ref={faqRef}>
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Got Questions?</span>
            <h2 className="section-title">
              <span className="text-gradient">{faqTitle}</span>
            </h2>
            <p className="section-description">
              Find answers to common questions about our appointment setting services and approach
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
          </div>
          
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
          
          <div className="faq-cta">
            <p>Have more questions? We're here to help!</p>
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Particles */}
      <section className="section service-cta-section appointment-cta">
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

export default AppointmentSetting