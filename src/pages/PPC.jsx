import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'

const PPC = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('ppc')
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
  const servicesTitle = getContentSection('ppc', 'servicesTitle', 'Our PPC Services')
  const processTitle = getContentSection('ppc', 'processTitle', 'Our PPC Management Process')
  const faqTitle = getContentSection('ppc', 'faqTitle', 'Frequently Asked Questions')
  const ctaTitle = getContentSection('ppc', 'ctaTitle', 'Ready to Accelerate Your Growth with PPC?')
  const ctaDescription = getContentSection('ppc', 'ctaDescription', 'Get a free PPC analysis and discover untapped opportunities for your business.')
  
  // Parse services from the API response, or use default services
  let services = []
  try {
    services = JSON.parse(getContentSection('ppc', 'services', '[]'))
  } catch (err) {
    console.error('Error parsing services:', err)
    // Default services
    services = [
      {
        icon: '🔍',
        title: 'Google Ads Management',
        description: 'We create and optimize campaigns across Google\'s search, display, shopping, and video networks to reach your target audience at every stage of the buying journey.'
      },
      {
        icon: '🏢',
        title: 'Microsoft Advertising',
        description: 'Expand your reach on Bing, Yahoo, and other Microsoft partner networks to capture valuable leads that your competitors might be missing.'
      },
      {
        icon: '📱',
        title: 'Social Media Advertising',
        description: 'We develop targeted campaigns on platforms like Facebook, Instagram, LinkedIn, and Twitter to reach your ideal audience based on demographics, interests, and behaviors.'
      },
      {
        icon: '🎯',
        title: 'Retargeting/Remarketing',
        description: 'Re-engage visitors who have previously interacted with your website but haven\'t converted, bringing them back to complete their journey.'
      },
      {
        icon: '🛍️',
        title: 'Shopping Campaigns',
        description: 'Showcase your products with visually-appealing shopping ads that drive qualified traffic and sales for e-commerce businesses.'
      },
      {
        icon: '📊',
        title: 'Performance Tracking & Analysis',
        description: 'We monitor campaign performance, provide comprehensive reporting, and continuously optimize your ads to maximize return on investment.'
      }
    ]
  }
  
  // Parse process steps from the API response, or use default steps
  let processSteps = []
  try {
    processSteps = JSON.parse(getContentSection('ppc', 'processSteps', '[]'))
  } catch (err) {
    console.error('Error parsing process steps:', err)
    // Default process steps
    processSteps = [
      {
        number: 1,
        title: 'Discovery & Research',
        description: 'We analyze your business, competitors, target audience, and industry trends to understand your unique challenges and opportunities.'
      },
      {
        number: 2,
        title: 'Campaign Strategy',
        description: 'We develop a custom PPC strategy with the right platforms, targeting options, ad formats, and budget allocation to meet your business goals.'
      },
      {
        number: 3,
        title: 'Campaign Setup',
        description: 'We build well-structured campaigns with compelling ad copy, relevant keywords, and targeted audience segments to drive qualified traffic.'
      },
      {
        number: 4,
        title: 'Optimization',
        description: 'We continuously monitor and refine your campaigns, adjusting bids, keywords, ad copy, and audience targeting to improve performance.'
      },
      {
        number: 5,
        title: 'Reporting & Analysis',
        description: 'We provide transparent, detailed reports on campaign performance and insights for continuous improvement.'
      }
    ]
  }
  
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
      {/* Hero Section */}
      <section className="service-hero">
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

export default PPC