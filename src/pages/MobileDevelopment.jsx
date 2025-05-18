import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/ServicePage.css'
import '../styles/LoadingStates.css'

const MobileDevelopment = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('mobile-development')
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
        <button onClick={() => fetchPageContent('mobile-development')} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }
  
  // Use default content if API data not available yet
  const heroTitle = getContentSection('mobile-development', 'heroTitle', 'Mobile App Development')
  const heroDescription = getContentSection('mobile-development', 'heroDescription', 'Build innovative mobile applications that engage users and drive business growth.')
  const overviewTitle = getContentSection('mobile-development', 'overviewTitle', 'Turn Your Ideas Into Powerful Mobile Experiences')
  const overviewContent = getContentSection('mobile-development', 'overviewContent', 'In today\'s mobile-first world, a well-designed mobile app can be transformative for your business. Our expert development team creates custom mobile applications that deliver exceptional user experiences while meeting your specific business objectives.\n\nWhether you need a native iOS or Android app, a cross-platform solution, or a progressive web app, we have the expertise to develop a mobile solution that engages your users and drives results.')
  const servicesTitle = getContentSection('mobile-development', 'servicesTitle', 'Our Mobile Development Services')
  const processTitle = getContentSection('mobile-development', 'processTitle', 'Our Mobile App Development Process')
  const technologiesTitle = getContentSection('mobile-development', 'technologiesTitle', 'Technologies We Use')
  const technologiesDescription = getContentSection('mobile-development', 'technologiesDescription', 'We leverage the latest mobile technologies to build powerful, scalable applications')
  const faqTitle = getContentSection('mobile-development', 'faqTitle', 'Frequently Asked Questions')
  const ctaTitle = getContentSection('mobile-development', 'ctaTitle', 'Ready to Build Your Mobile App?')
  const ctaDescription = getContentSection('mobile-development', 'ctaDescription', 'Let\'s discuss how we can create a mobile solution that drives results for your business.')
  
  // Parse services from the API response, or use default services
  let services = []
  try {
    services = JSON.parse(getContentSection('mobile-development', 'services', '[]'))
  } catch (err) {
    console.error('Error parsing services:', err)
    // Default services
    services = [
      {
        icon: '📱',
        title: 'Native iOS Development',
        description: 'We build high-performance iOS apps using Swift and SwiftUI that fully leverage Apple\'s platform capabilities and design guidelines.'
      },
      {
        icon: '🤖',
        title: 'Native Android Development',
        description: 'Our team creates powerful Android applications using Kotlin that provide exceptional performance and user experience across the Android ecosystem.'
      },
      {
        icon: '🔄',
        title: 'Cross-Platform Development',
        description: 'We use React Native and Flutter to build cost-effective apps that work seamlessly across multiple platforms while maintaining a native feel.'
      },
      {
        icon: '🌐',
        title: 'Progressive Web Apps',
        description: 'We develop progressive web apps that combine the best of web and mobile apps, offering offline functionality and app-like experiences.'
      },
      {
        icon: '🎨',
        title: 'UI/UX Design for Mobile',
        description: 'Our designers create intuitive, engaging mobile interfaces that follow platform-specific design principles and deliver exceptional user experiences.'
      },
      {
        icon: '🔌',
        title: 'API Development & Integration',
        description: 'We build robust APIs and integrate with third-party services to ensure your mobile app connects seamlessly with your existing systems.'
      }
    ]
  }
  
  // Parse process steps from the API response, or use default steps
  let processSteps = []
  try {
    processSteps = JSON.parse(getContentSection('mobile-development', 'processSteps', '[]'))
  } catch (err) {
    console.error('Error parsing process steps:', err)
    // Default process steps
    processSteps = [
      {
        number: 1,
        title: 'Discovery & Planning',
        description: 'We analyze your business goals, target audience, and competition to create a comprehensive mobile strategy and detailed project roadmap.'
      },
      {
        number: 2,
        title: 'UI/UX Design',
        description: 'Our designers create intuitive wireframes, user flows, and interactive prototypes to visualize the app before development begins.'
      },
      {
        number: 3,
        title: 'Development',
        description: 'Our development team builds your application using agile methodologies, with regular updates and demos throughout the process.'
      },
      {
        number: 4,
        title: 'Testing & QA',
        description: 'We conduct thorough testing across devices and operating systems to ensure your app works flawlessly for all users.'
      },
      {
        number: 5,
        title: 'Deployment & Ongoing Support',
        description: 'After launch, we provide ongoing maintenance, updates, and performance monitoring to ensure your app\'s continued success.'
      }
    ]
  }
  
  // Parse technologies from the API response, or use default technologies
  let technologies = []
  try {
    technologies = JSON.parse(getContentSection('mobile-development', 'technologies', '[]'))
  } catch (err) {
    console.error('Error parsing technologies:', err)
    // Default technologies
    technologies = [
      {
        category: 'iOS Development',
        items: ['Swift', 'SwiftUI', 'Objective-C', 'Xcode', 'Core Data', 'ARKit']
      },
      {
        category: 'Android Development',
        items: ['Kotlin', 'Java', 'Android Studio', 'Jetpack Compose', 'Room Database', 'Android NDK']
      },
      {
        category: 'Cross-Platform',
        items: ['React Native', 'Flutter', 'Ionic', 'Xamarin', 'Capacitor', 'Cordova']
      },
      {
        category: 'Backend & APIs',
        items: ['Node.js', 'Firebase', 'AWS Mobile', 'GraphQL', 'REST APIs', 'MongoDB']
      }
    ]
  }
  
  // Parse FAQ items from the API response, or use default FAQ items
  let faqItems = []
  try {
    faqItems = JSON.parse(getContentSection('mobile-development', 'faqItems', '[]'))
  } catch (err) {
    console.error('Error parsing FAQ items:', err)
    // Default FAQ items
    faqItems = [
      {
        question: 'How long does it take to develop a mobile app?',
        answer: 'Development timelines vary based on complexity. A simple app might take 2-3 months, while a complex application could take 4-6 months or more. We\'ll provide a detailed timeline during our initial planning phase.'
      },
      {
        question: 'Should I build a native app or a cross-platform app?',
        answer: 'It depends on your specific requirements. Native apps offer the best performance and access to platform features, while cross-platform apps can be more cost-effective with faster time-to-market. We\'ll help you decide which approach best meets your business goals and budget.'
      },
      {
        question: 'How much does it cost to develop a mobile app?',
        answer: 'App development costs vary widely based on complexity, features, and platforms. We provide custom quotes after understanding your specific requirements. We\'re transparent about pricing and offer flexible engagement models to accommodate different budgets.'
      },
      {
        question: 'Do you provide app maintenance and updates?',
        answer: 'Yes, we offer ongoing maintenance and support to keep your app running smoothly. This includes regular updates, bug fixes, performance monitoring, and feature enhancements to ensure your app remains compatible with the latest OS versions and devices.'
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
                  <h3>6.5b</h3>
                  <p>smartphone users worldwide</p>
                </div>
                <div className="stat">
                  <h3>90%</h3>
                  <p>of mobile time spent in apps</p>
                </div>
                <div className="stat">
                  <h3>230b</h3>
                  <p>mobile app downloads annually</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/mobile-development-overview.svg" alt="Mobile App Development" />
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
            {technologies.map((tech, index) => (
              <div className="technology-category" key={index}>
                <h3>{tech.category}</h3>
                <ul className="technology-list">
                  {tech.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
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

export default MobileDevelopment