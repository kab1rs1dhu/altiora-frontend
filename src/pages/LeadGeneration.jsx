import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'

const LeadGeneration = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('lead-generation')
      setPageContent(content)
    }
    
    loadContent()
  }, [fetchPageContent])
  
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
    // Default results
    results = [
      {
        icon: '📈',
        title: 'Increased Lead Volume',
        description: 'Generate more potential customers for your business with targeted campaigns.'
      },
      {
        icon: '⭐',
        title: 'Higher-Quality Leads',
        description: 'Attract prospects who are more likely to convert and become loyal customers.'
      },
      {
        icon: '💰',
        title: 'Improved ROI',
        description: 'Get more value from your marketing budget with efficient lead generation strategies.'
      },
      {
        icon: '🔄',
        title: 'Shortened Sales Cycle',
        description: 'Nurture leads effectively to reduce the time from initial contact to conversion.'
      }
    ]
  }
  
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
  
  return (
    <>
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1>{heroTitle}</h1>
            <p className="service-hero-description">
              {heroDescription}
            </p>
            <Link to="/contact" className="btn btn-primary">Get a Lead Generation Strategy</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section">
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
              <img src="/images/lead-generation-overview.svg" alt="Lead Generation" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-details-section">
        <div className="container">
          <h2 className="section-title text-center">{servicesTitle}</h2>
          <div className="service-details-grid">
            {services.map((service, index) => (
              <div className="service-detail-card" key={index}>
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

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <h2 className="section-title text-center">{processTitle}</h2>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div className="process-step" key={index}>
                <div className="process-step-number">{step.number}</div>
                <div className="process-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Generation Channels Section */}
      <section className="section channels-section">
        <div className="container">
          <h2 className="section-title text-center">{channelsTitle}</h2>
          <p className="section-description text-center">
            {channelsDescription}
          </p>
          
          <div className="channels-grid">
            {channels.map((channel, index) => (
              <div className="channel-card" key={index}>
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

      {/* Results Section */}
      <section className="section results-section">
        <div className="container">
          <h2 className="section-title text-center">{resultsTitle}</h2>
          
          <div className="results-grid">
            {results.map((result, index) => (
              <div className="result-card" key={index}>
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

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title text-center">{faqTitle}</h2>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div className="faq-item" key={index}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section service-cta-section">
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

export default LeadGeneration