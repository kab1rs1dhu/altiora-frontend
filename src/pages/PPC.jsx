import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'
import '../styles/PPC.css' // Import our new CSS file

const PPC = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [expandedSteps, setExpandedSteps] = useState([])
  const [activeFaqTab, setActiveFaqTab] = useState('general')
  
  // Refs for scroll animations
  const resultsRef = useRef(null)
  const faqRef = useRef(null)
  
  // Animation states
  const [visibleResults, setVisibleResults] = useState([])
  const [visibleFaqs, setVisibleFaqs] = useState([])
  
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
      const content = await fetchPageContent('ppc')
      setPageContent(content)
    }
    
    loadContent()
  }, [fetchPageContent])
  
  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
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
  }, [visibleResults, visibleFaqs])
  
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
        <button onClick={() => fetchPageContent('ppc')} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }
  
  // Use default content if API data not available yet
  const heroTitle = getContentSection('ppc', 'heroTitle', 'PPC Advertising')
  const heroDescription = getContentSection('ppc', 'heroDescription', 'Drive targeted traffic and generate immediate results with our data-driven pay-per-click campaigns.')
  const overviewTitle = getContentSection('ppc', 'overviewTitle', 'Drive Immediate Results with Targeted PPC')
  const overviewContent = getContentSection('ppc', 'overviewContent', 'In today\'s competitive digital landscape, pay-per-click (PPC) advertising offers an immediate way to reach your target audience and drive qualified traffic to your website. Our expert PPC management services ensure your ads appear in front of the right people at the right time.\n\nAt Altiora, we develop and manage high-performing paid advertising campaigns across Google Ads, Bing Ads, social media platforms, and more. Our data-driven approach focuses on maximizing your return on ad spend (ROAS) while minimizing costs.')
  const resultsTitle = getContentSection('ppc', 'resultsTitle', 'Results You Can Expect')
  const faqTitle = getContentSection('ppc', 'faqTitle', 'Frequently Asked Questions')
  const ctaTitle = getContentSection('ppc', 'ctaTitle', 'Ready to Accelerate Your Growth with PPC?')
  const ctaDescription = getContentSection('ppc', 'ctaDescription', 'Get a free PPC analysis and discover untapped opportunities for your business.')
  
  // Results data
  const results = [
    {
      icon: '📈',
      title: 'Immediate Visibility',
      description: 'Start generating traffic and leads right away without waiting for organic rankings to improve.'
    },
    {
      icon: '🎯',
      title: 'Precise Targeting',
      description: 'Reach your ideal customers based on demographics, interests, behaviors, and search intent.'
    },
    {
      icon: '💰',
      title: 'Measurable ROI',
      description: 'Track every dollar spent and see exactly how your advertising budget translates to results.'
    },
    {
      icon: '⚙️',
      title: 'Continuous Optimization',
      description: 'Improve performance over time through data-driven adjustments and strategic refinements.'
    }
  ]
  
  // Testimonials data
  const testimonials = [
    {
      quote: "Altiora's PPC expertise helped us reduce our cost per acquisition by 40% while increasing conversions by 60%. Their data-driven approach and constant optimization have truly transformed our paid advertising strategy.",
      name: "Michael Reynolds",
      position: "Marketing Director",
      company: "TechNova Solutions",
      avatar: "/images/testimonial-1.jpg"
    },
    {
      quote: "Working with Altiora's PPC team has been a game-changer. They manage our Google Ads and social media campaigns with precision, delivering measurable ROI and transparent reporting that makes proving the value of our marketing budget simple.",
      name: "Sarah Chen",
      position: "CEO",
      company: "GrowthFirst",
      avatar: "/images/testimonial-2.jpg"
    },
    {
      quote: "The PPC specialists at Altiora quickly identified opportunities in our campaigns that our previous agency had missed. Within three months, we saw a 72% increase in leads and a significant improvement in lead quality.",
      name: "Jason Miller",
      position: "CMO",
      company: "Elevate Digital",
      avatar: "/images/testimonial-3.jpg"
    }
  ]
  
  // Parse FAQ items from the API response, or use default FAQ items
  let faqItems = []
  try {
    faqItems = JSON.parse(getContentSection('ppc', 'faqItems', '[]'))
  } catch (err) {
    console.error('Error parsing FAQ items:', err)
    // Default FAQ items
    faqItems = [
      {
        question: 'How much should I budget for PPC advertising?',
        answer: 'PPC budgets vary widely based on industry, competition, and goals. We recommend starting with a test budget that allows for statistically significant data collection. After analyzing initial results, we can provide recommendations for optimal budget allocation based on your ROI targets.'
      },
      {
        question: 'How quickly will I see results from PPC campaigns?',
        answer: 'Unlike SEO, PPC can generate immediate traffic and leads. However, campaign optimization takes time. Initial results are typically visible within days, but expect 2-4 weeks of optimization to achieve peak performance as we gather data and refine the campaigns.'
      },
      {
        question: 'What platforms should I advertise on?',
        answer: 'The best platforms depend on your business type, target audience, and goals. Google Ads works well for most businesses, while social platforms like Facebook, Instagram, or LinkedIn might be more effective for specific industries or B2B companies. We\'ll recommend the optimal mix based on your specific situation.'
      },
      {
        question: 'How do you measure PPC success?',
        answer: 'We track conversions, cost-per-acquisition (CPA), return on ad spend (ROAS), click-through rate (CTR), quality score, and other relevant metrics. Most importantly, we focus on the KPIs that directly impact your business goals, whether that\'s lead generation, sales, or brand awareness.'
      }
    ]
  }
  
  return (
    <>
      {/* Hero Section with Particles */}
      <section className="service-hero ppc-hero">
        <div className="ppc-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="ppc-particle"
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
            <Link to="/contact" className="btn btn-primary">Get a Free PPC Analysis</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section ppc-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>{overviewTitle}</h2>
              {overviewContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <div className="overview-stats">
                <div className="stat">
                  <h3>80%</h3>
                  <p>of businesses run PPC campaigns for brand exposure</p>
                </div>
                <div className="stat">
                  <h3>200%</h3>
                  <p>average ROI for Google Ads campaigns</p>
                </div>
                <div className="stat">
                  <h3>65%</h3>
                  <p>of clicks go to ads for high-commercial intent searches</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/ppc-overview.svg" alt="PPC Advertising" />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section ppc-results" ref={resultsRef}>
        <div className="container">
          <h2 className="section-title text-center">{resultsTitle || 'Results You Can Expect'}</h2>
          <p className="section-description text-center">
            Our data-driven PPC strategies deliver measurable business outcomes
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

      {/* Testimonials Section */}
      <section className="section ppc-testimonials">
        <div className="container">
          <h2 className="section-title text-center">What Our Clients Say</h2>
          <p className="section-description text-center">
            Hear from businesses that have transformed their digital advertising with our PPC services
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
      <section className="section faq-section ppc-faq" ref={faqRef}>
        <div className="container">
          <h2 className="section-title text-center">{faqTitle}</h2>
          <p className="section-description text-center">
            Find answers to common questions about our PPC services and approach
          </p>
          
          <div className="faq-tabs">
            <button 
              className={`faq-tab ${activeFaqTab === 'general' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('general')}
            >
              General Questions
            </button>
            <button 
              className={`faq-tab ${activeFaqTab === 'google' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('google')}
            >
              Google Ads
            </button>
            <button 
              className={`faq-tab ${activeFaqTab === 'social' ? 'active' : ''}`} 
              onClick={() => setActiveFaqTab('social')}
            >
              Social Media Ads
            </button>
          </div>
          
          {/* General FAQ Questions */}
          <div className={`faq-content ${activeFaqTab === 'general' ? 'active' : ''}`}>
            <div className="faq-grid">
              {faqItems.concat([
                {
                  question: 'How long does it take to see meaningful PPC results?',
                  answer: 'You will start getting traffic immediately after launch, but meaningful optimised results usually take 2-4 weeks as campaigns collect data and we fine-tune bids, ads and keywords.'
                },
                {
                  question: 'Do you provide transparent reporting?',
                  answer: 'Yes. You will receive a detailed monthly report that covers spend, conversions, CPA, ROAS and our optimisation actions so you always know where your budget is going.'
                }
              ]).map((item, index) => (
                <div
                  className="faq-item visible"
                  key={index}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Google Ads FAQ Questions */}
          <div className={`faq-content ${activeFaqTab === 'google' ? 'active' : ''}`}>
            <div className="faq-grid">
              <div 
                className={`faq-item ${visibleFaqs.includes(0) ? 'visible' : ''}`} 
                style={{ transitionDelay: '0.15s' }}
              >
                <h3>What's the difference between search and display ads?</h3>
                <p>
                  Search ads appear when someone searches for specific keywords on Google, targeting users actively looking for products or services. Display ads are visual advertisements shown on websites within the Google Display Network, reaching users while they browse other content. Search ads typically have higher intent and conversion rates, while display ads offer broader reach and are excellent for brand awareness and remarketing.
                </p>
              </div>
              
              <div 
                className={`faq-item ${visibleFaqs.includes(1) ? 'visible' : ''}`} 
                style={{ transitionDelay: '0.3s' }}
              >
                <h3>How do you improve Quality Score in Google Ads?</h3>
                <p>
                  We improve Quality Score by focusing on relevance across all campaign elements. This includes creating tightly themed ad groups with focused keywords, writing compelling ad copy that incorporates those keywords, developing relevant landing pages that deliver on ad promises, and optimizing for user experience and page load speed. We also monitor click-through rates and make continuous adjustments to improve campaign performance.
                </p>
              </div>
              
              <div 
                className={`faq-item ${visibleFaqs.includes(2) ? 'visible' : ''}`} 
                style={{ transitionDelay: '0.45s' }}
              >
                <h3>Should I use broad match, phrase match, or exact match keywords?</h3>
                <p>
                  We typically use a strategic mix of match types based on your goals and campaign maturity. Exact match delivers the highest relevance but lowest volume, while broad match offers higher volume but less precision. We often start campaigns with phrase match and exact match keywords to establish baseline performance, then strategically expand with modified broad match terms while implementing strong negative keyword lists to control relevance.
                </p>
              </div>
              
              <div 
                className={`faq-item ${visibleFaqs.includes(3) ? 'visible' : ''}`} 
                style={{ transitionDelay: '0.6s' }}
              >
                <h3>How do you optimize for mobile devices in PPC campaigns?</h3>
                <p>
                  We optimize for mobile devices by ensuring your ads are mobile-friendly, using responsive ad formats, and implementing mobile-specific targeting options. We also monitor mobile performance metrics such as mobile click-through rate, mobile conversion rate, and mobile bounce rate to make data-driven adjustments.
                </p>
              </div>
            </div>
          </div>
          
          {/* Social Media Ads FAQ Questions */}
          <div className={`faq-content ${activeFaqTab === 'social' ? 'active' : ''}`}>
            <div className="faq-grid">
              <div 
                className={`faq-item ${visibleFaqs.includes(0) ? 'visible' : ''}`} 
                style={{ transitionDelay: '0.15s' }}
              >
                <h3>Which social media platforms are best for PPC advertising?</h3>
                <p>
                  The best social media platforms for PPC advertising depend on your business type, target audience, and goals. Popular platforms include Facebook, Instagram, LinkedIn, Twitter, and Pinterest. We'll recommend the optimal mix based on your specific situation.
                </p>
              </div>
              
              <div 
                className={`faq-item ${visibleFaqs.includes(1) ? 'visible' : ''}`} 
                style={{ transitionDelay: '0.3s' }}
              >
                <h3>How do you target specific demographics on social media platforms?</h3>
                <p>
                  We target specific demographics on social media platforms using various targeting options such as age, gender, location, interests, behaviors, and custom audiences. We'll create custom targeting segments based on your business goals and target audience.
                </p>
              </div>
              
              <div 
                className={`faq-item ${visibleFaqs.includes(2) ? 'visible' : ''}`} 
                style={{ transitionDelay: '0.45s' }}
              >
                <h3>What types of social media ads are available?</h3>
                <p>
                  Social media platforms offer various ad formats such as image ads, video ads, carousel ads, collection ads, lead generation ads, and more. We'll recommend the optimal ad formats based on your business goals and target audience.
                </p>
              </div>
              
              <div 
                className={`faq-item ${visibleFaqs.includes(3) ? 'visible' : ''}`} 
                style={{ transitionDelay: '0.6s' }}
              >
                <h3>How do you measure the success of social media ads?</h3>
                <p>
                  We measure the success of social media ads using metrics such as impressions, clicks, click-through rate, cost per click, cost per conversion, conversion rate, and return on ad spend. Most importantly, we focus on the KPIs that directly impact your business goals, whether that's lead generation, sales, or brand awareness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PPC