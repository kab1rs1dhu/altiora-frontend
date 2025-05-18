import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'

const WebDevelopment = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('web-development')
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
        <button onClick={() => fetchPageContent('web-development')} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }
  
  // Use default content if API data not available yet
  const heroTitle = getContentSection('web-development', 'heroTitle', 'Web Development')
  const heroDescription = getContentSection('web-development', 'heroDescription', 'Create stunning, high-performing websites that convert visitors into customers.')
  const overviewTitle = getContentSection('web-development', 'overviewTitle', 'Custom Web Solutions for Your Business')
  const overviewContent = getContentSection('web-development', 'overviewContent', 'In today\'s digital world, your website is often the first interaction customers have with your brand. Our web development services ensure that this first impression is not just good, but exceptional.\n\nAt Altiora, we build custom websites that are designed with both users and search engines in mind. From sleek marketing sites to robust e-commerce platforms, we create digital experiences that drive results.')
  const servicesTitle = getContentSection('web-development', 'servicesTitle', 'Our Web Development Services')
  const processTitle = getContentSection('web-development', 'processTitle', 'Our Web Development Process')
  const technologiesTitle = getContentSection('web-development', 'technologiesTitle', 'Technologies We Work With')
  const technologiesDescription = getContentSection('web-development', 'technologiesDescription', 'We use the latest technologies and frameworks to build modern, scalable web applications')
  const whyChooseTitle = getContentSection('web-development', 'whyChooseTitle', 'Why Choose Us for Web Development')
  const faqTitle = getContentSection('web-development', 'faqTitle', 'Frequently Asked Questions')
  const ctaTitle = getContentSection('web-development', 'ctaTitle', 'Ready to Build Your Dream Website?')
  const ctaDescription = getContentSection('web-development', 'ctaDescription', 'Let\'s discuss how we can create a website that drives results for your business.')
  
  // Parse services from the API response, or use default services
  let services = []
  try {
    services = JSON.parse(getContentSection('web-development', 'services', '[]'))
  } catch (err) {
    console.error('Error parsing services:', err)
    // Default services
    services = [
      {
        icon: '💻',
        title: 'Custom Website Development',
        description: 'We build tailored websites from scratch that align with your brand, business goals, and user needs.'
      },
      {
        icon: '🛒',
        title: 'E-commerce Development',
        description: 'Create powerful online stores with secure payment processing, inventory management, and a seamless shopping experience.'
      },
      {
        icon: '🎨',
        title: 'UI/UX Design',
        description: 'Craft intuitive, engaging user experiences with thoughtful information architecture and visually appealing designs.'
      },
      {
        icon: '📱',
        title: 'Responsive Web Design',
        description: 'Ensure your website looks and performs perfectly on all devices, from desktops to smartphones.'
      },
      {
        icon: '⚡',
        title: 'Web Performance Optimization',
        description: 'Improve page load times, optimize images, and enhance server response for a faster, smoother user experience.'
      },
      {
        icon: '⚙️',
        title: 'CMS Integration',
        description: 'Implement user-friendly content management systems like WordPress that make it easy to update your website.'
      }
    ]
  }
  
  // Parse process steps from the API response, or use default steps
  let processSteps = []
  try {
    processSteps = JSON.parse(getContentSection('web-development', 'processSteps', '[]'))
  } catch (err) {
    console.error('Error parsing process steps:', err)
    // Default process steps
    processSteps = [
      {
        number: 1,
        title: 'Discovery & Planning',
        description: 'We analyze your business goals, target audience, and competition to develop a strategic website plan.'
      },
      {
        number: 2,
        title: 'Design & Wireframing',
        description: 'We create wireframes and visual designs that focus on user experience, aesthetics, and conversion optimization.'
      },
      {
        number: 3,
        title: 'Development',
        description: 'Our developers bring the designs to life with clean, efficient code and modern development practices.'
      },
      {
        number: 4,
        title: 'Testing & Quality Assurance',
        description: 'We thoroughly test your website across devices and browsers to ensure everything works flawlessly.'
      },
      {
        number: 5,
        title: 'Launch & Maintenance',
        description: 'After launch, we provide ongoing support, updates, and performance monitoring to keep your site running smoothly.'
      }
    ]
  }
  
  // Other content parsing would follow a similar pattern...
  
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
            <Link to="/contact" className="btn btn-primary">Get a Free Consultation</Link>
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
                  <h3>94%</h3>
                  <p>of first impressions are design-related</p>
                </div>
                <div className="stat">
                  <h3>3s</h3>
                  <p>or less is the optimal page load time</p>
                </div>
                <div className="stat">
                  <h3>67%</h3>
                  <p>of users prefer a well-designed website</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/web-development-overview.svg" alt="Web Development" />
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

      {/* Technology Section */}
      <section className="section technology-section">
        <div className="container">
          <h2 className="section-title text-center">{technologiesTitle}</h2>
          <p className="section-description text-center">
            {technologiesDescription}
          </p>
          
          <div className="technology-grid">
            <div className="technology-category">
              <h3>Frontend</h3>
              <ul className="technology-list">
                <li>HTML5 / CSS3</li>
                <li>JavaScript (ES6+)</li>
                <li>React</li>
                <li>Angular</li>
                <li>Vue.js</li>
                <li>TypeScript</li>
              </ul>
            </div>
            
            <div className="technology-category">
              <h3>Backend</h3>
              <ul className="technology-list">
                <li>Node.js</li>
                <li>Java Spring Boot</li>
                <li>Python (Django, Flask)</li>
                <li>PHP (Laravel)</li>
                <li>.NET</li>
                <li>Ruby on Rails</li>
              </ul>
            </div>
            
            <div className="technology-category">
              <h3>Database</h3>
              <ul className="technology-list">
                <li>MySQL</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>Redis</li>
                <li>Firebase</li>
                <li>Elasticsearch</li>
              </ul>
            </div>
            
            <div className="technology-category">
              <h3>CMS</h3>
              <ul className="technology-list">
                <li>WordPress</li>
                <li>Drupal</li>
                <li>Shopify</li>
                <li>Contentful</li>
                <li>Strapi</li>
                <li>Sanity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-section">
        <div className="container">
          <h2 className="section-title text-center">{whyChooseTitle}</h2>
          
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">🎯</i>
              </div>
              <h3>Strategic Approach</h3>
              <p>
                We don't just build websites; we create strategic digital assets designed to achieve your business goals.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">👥</i>
              </div>
              <h3>User-Centered Design</h3>
              <p>
                We place your users at the center of the design process, creating intuitive experiences that convert.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">🔍</i>
              </div>
              <h3>SEO-Friendly Development</h3>
              <p>
                Our websites are built with search engines in mind, helping you rank higher and attract more organic traffic.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">📱</i>
              </div>
              <h3>Mobile-First Approach</h3>
              <p>
                We ensure your website delivers an excellent experience across all devices, especially mobile.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">⚡</i>
              </div>
              <h3>Performance Optimization</h3>
              <p>
                We build fast-loading websites that provide a smooth user experience and better search rankings.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">🔒</i>
              </div>
              <h3>Security Focus</h3>
              <p>
                We implement robust security measures to protect your website and your users' data from threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title text-center">{faqTitle}</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How long does it take to develop a website?</h3>
              <p>
                The timeline varies based on complexity. A simple informational website might take 4-6 weeks, 
                while a complex e-commerce platform could take 3-4 months. We'll provide a detailed timeline 
                during the planning phase of your project.
              </p>
            </div>

            <div className="faq-item">
              <h3>How much does a website cost?</h3>
              <p>
                Website costs depend on your specific requirements, features, and complexity. We provide 
                custom quotes based on your needs after an initial consultation. We're transparent about 
                pricing and work within various budgets.
              </p>
            </div>

            <div className="faq-item">
              <h3>Will my website be mobile-friendly?</h3>
              <p>
                Absolutely! All our websites are built with responsive design principles, ensuring they look 
                and function perfectly on all devices, from desktop computers to tablets and smartphones.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you provide website maintenance?</h3>
              <p>
                Yes, we offer ongoing maintenance packages to keep your website secure, up-to-date, and 
                performing optimally. This includes regular updates, security monitoring, backup, and 
                technical support.
              </p>
            </div>
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

export default WebDevelopment