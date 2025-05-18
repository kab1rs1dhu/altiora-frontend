import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/Home.css'
import '../styles/LoadingStates.css'

const Home = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('home')
      setPageContent(content)
    }
    
    loadContent()
  }, [fetchPageContent])
  
  // Use default content if API data not available yet
  const heroTitle = getContentSection('home', 'heroTitle', 'Elevate Your Business with Strategic Digital Marketing')
  const heroSubtitle = getContentSection('home', 'heroSubtitle', 'Altiora helps businesses grow through custom digital strategies, innovative development, and data-driven marketing solutions.')
  const servicesTitle = getContentSection('home', 'servicesTitle', 'Our Services')
  const servicesDescription = getContentSection('home', 'servicesDescription', 'Comprehensive digital marketing solutions tailored to your business needs')
  const whyChooseTitle = getContentSection('home', 'whyChooseTitle', 'Why Choose Altiora')
  const whyChooseDescription = getContentSection('home', 'whyChooseDescription', 'We deliver measurable results with a client-centered approach')
  const ctaTitle = getContentSection('home', 'ctaTitle', 'Ready to Grow Your Business?')
  const ctaDescription = getContentSection('home', 'ctaDescription', 'Schedule a free consultation with our digital marketing experts today.')
  
  // Parse services from the API response, or use default services
  let services = []
  try {
    services = JSON.parse(getContentSection('home', 'services', '[]'))
  } catch (err) {
    console.error('Error parsing services:', err)
    // Default services
    services = [
      {
        icon: 'fa-solid fa-magnifying-glass',
        title: 'Search Engine Optimization',
        description: 'Improve your online visibility and drive organic traffic with our data-driven SEO strategies.',
        link: '/seo'
      },
      {
        icon: 'fa-solid fa-rectangle-ad',
        title: 'PPC Advertising',
        description: 'Generate immediate results with targeted pay-per-click campaigns optimized for ROI.',
        link: '/ppc'
      },
      {
        icon: 'fa-solid fa-laptop-code',
        title: 'Web Development',
        description: 'Create stunning, high-performing websites that convert visitors into customers.',
        link: '/web-development'
      },
      {
        icon: 'fa-solid fa-mobile-screen',
        title: 'Mobile App Development',
        description: 'Build innovative mobile applications that engage users and drive business growth.',
        link: '/mobile-development'
      },
      {
        icon: 'fa-solid fa-chart-line',
        title: 'Lead Generation',
        description: 'Capture high-quality leads with proven strategies that fill your sales pipeline.',
        link: '/lead-generation'
      },
      {
        icon: 'fa-solid fa-calendar-check',
        title: 'Appointment Setting',
        description: 'Fill your calendar with qualified prospects through our appointment setting services.',
        link: '/appointment-setting'
      }
    ]
  }
  
  // Parse why choose points from the API response, or use default points
  let whyChoosePoints = []
  try {
    whyChoosePoints = JSON.parse(getContentSection('home', 'whyChoosePoints', '[]'))
  } catch (err) {
    console.error('Error parsing why choose points:', err)
    // Default why choose points
    whyChoosePoints = [
      {
        icon: 'fa-solid fa-bullseye',
        title: 'Data-Driven Strategies',
        description: 'We base all our marketing decisions on analytics and performance data to ensure optimal results.'
      },
      {
        icon: 'fa-solid fa-users',
        title: 'Expert Team',
        description: 'Our seasoned professionals have years of experience across various industries and digital platforms.'
      },
      {
        icon: 'fa-solid fa-handshake',
        title: 'Customized Solutions',
        description: 'We don\'t believe in one-size-fits-all. Every strategy is tailored to your specific business goals.'
      },
      {
        icon: 'fa-solid fa-chart-simple',
        title: 'Transparent Reporting',
        description: 'Get regular insights into your campaign performance with easy-to-understand reports.'
      }
    ]
  }
  
  // If we're still loading initial content and have no backup data yet, show a loading spinner
  if (loading && !pageContent && services.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading content...</p>
      </div>
    )
  }
  
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">{heroTitle}</h1>
            <p className="hero-subtitle">
              {heroSubtitle}
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-primary">Get A Free Consultation</Link>
              <Link to="/services" className="btn btn-outline">Explore Services</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero-illustration.svg" alt="Digital Marketing Strategy" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">{servicesTitle}</h2>
            <p className="section-description">
              {servicesDescription}
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">
                  {service.description}
                </p>
                <Link to={service.link} className="service-link">Learn More <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-section">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">{whyChooseTitle}</h2>
            <p className="section-description">
              {whyChooseDescription}
            </p>
          </div>

          <div className="why-choose-content">
            <div className="why-choose-image">
              <img src="/images/why-choose-us.svg" alt="Why Choose Altiora" />
            </div>
            
            <div className="why-choose-points">
              {whyChoosePoints.map((point, index) => (
                <div className="point" key={index}>
                  <div className="point-icon">
                    <i className={point.icon}></i>
                  </div>
                  <div className="point-content">
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{ctaTitle}</h2>
            <p>{ctaDescription}</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
      
      {/* Error message if content loading failed */}
      {error && (
        <div className="error-message">
          <p>Some content could not be loaded. Please refresh the page or try again later.</p>
        </div>
      )}
    </>
  )
}

export default Home