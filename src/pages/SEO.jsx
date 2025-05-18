import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'

const SEO = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('seo')
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
            <Link to="/contact" className="btn btn-primary">Get a Free SEO Audit</Link>
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
              <img src="/images/seo-overview.svg" alt="SEO Strategy" />
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

export default SEO