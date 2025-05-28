import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'

const AppointmentSetting = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('appointment-setting')
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
  const whyChooseTitle = getContentSection('appointment-setting', 'whyChooseTitle', 'Why Choose Our Appointment Setting Services')
  const industriesTitle = getContentSection('appointment-setting', 'industriesTitle', 'Industries We Serve')
  const industriesDescription = getContentSection('appointment-setting', 'industriesDescription', 'Our appointment setting services are customized for various industries')
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
  
  // Parse why choose us items from the API response, or use default items
  let whyChooseItems = []
  try {
    whyChooseItems = JSON.parse(getContentSection('appointment-setting', 'whyChooseItems', '[]'))
  } catch (err) {
    console.error('Error parsing why choose us items:', err)
    // Default why choose us items
    whyChooseItems = [
      {
        icon: '⭐',
        title: 'Quality-Focused Approach',
        description: 'We prioritize appointment quality over quantity, ensuring your sales team meets with genuinely interested and qualified prospects.'
      },
      {
        icon: '🤝',
        title: 'Professional Representation',
        description: 'Our appointment setters act as an extension of your team, representing your brand with professionalism and expertise.'
      },
      {
        icon: '📱',
        title: 'Multi-Channel Approach',
        description: 'We leverage multiple communication channels to reach prospects where they\'re most responsive.'
      },
      {
        icon: '🔄',
        title: 'Consistent Follow-Up',
        description: 'We implement persistent but respectful follow-up strategies that convert more prospects into appointments without being pushy.'
      },
      {
        icon: '📊',
        title: 'Data-Driven Optimization',
        description: 'We continuously analyze performance data to refine messaging, targeting, and outreach strategies for optimal results.'
      },
      {
        icon: '⚙️',
        title: 'Seamless Integration',
        description: 'We integrate with your existing CRM and sales processes to ensure smooth information flow and appointment handoff.'
      }
    ]
  }
  
  // Parse industries from the API response, or use default industries
  let industries = []
  try {
    industries = JSON.parse(getContentSection('appointment-setting', 'industries', '[]'))
  } catch (err) {
    console.error('Error parsing industries:', err)
    // Default industries
    industries = [
      {
        icon: '💻',
        title: 'Technology & SaaS'
      },
      {
        icon: '📊',
        title: 'Financial Services'
      },
      {
        icon: '🏥',
        title: 'Healthcare'
      },
      {
        icon: '🏭',
        title: 'Manufacturing'
      },
      {
        icon: '🏢',
        title: 'Professional Services'
      },
      {
        icon: '🛒',
        title: 'Retail & E-commerce'
      },
      {
        icon: '🏗️',
        title: 'Construction'
      },
      {
        icon: '🎓',
        title: 'Education'
      }
    ]
  }
  
  // Parse FAQ items from the API response, or use default FAQ items
  let faqItems = []
  try {
    faqItems = JSON.parse(getContentSection('appointment-setting', 'faqItems', '[]'))
  } catch (err) {
    console.error('Error parsing FAQ items:', err)
    // Default FAQ items
    faqItems = [
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
            <Link to="/contact" className="btn btn-primary">Get More Appointments</Link>
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
              <img src="/images/appointment-setting-overview.svg" alt="Appointment Setting" />
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
                  <i className={service.icon}></i>
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

      {/* Why Choose Us Section */}
      <section className="section why-choose-section">
        <div className="container">
          <h2 className="section-title text-center">{whyChooseTitle}</h2>
          
          <div className="why-choose-grid">
            {whyChooseItems.map((item, index) => (
              <div className="why-choose-card" key={index}>
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

      {/* Industries Section */}
      <section className="section industries-section">
        <div className="container">
          <h2 className="section-title text-center">{industriesTitle}</h2>
          <p className="section-description text-center">
            {industriesDescription}
          </p>
          
          <div className="industries-grid">
            {industries.map((industry, index) => (
              <div className="industry-card" key={index}>
                <div className="industry-icon">
                  <i className="icon">{industry.icon}</i>
                </div>
                <h3>{industry.title}</h3>
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

export default AppointmentSetting