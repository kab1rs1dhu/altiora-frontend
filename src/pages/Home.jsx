import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import '../styles/Home.css'
import '../styles/LoadingStates.css'

const Home = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('home')
      setPageContent(content)
    }
    
    loadContent()
  }, [fetchPageContent])

  // Default testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO",
      image: "/images/testimonial-1.jpg",
      text: "Altiora transformed our online presence completely. Their SEO strategies increased our organic traffic by 300% in just 6 months. The team is professional, responsive, and truly understands digital marketing."
    },
    {
      name: "Michael Chen", 
      company: "GrowthCorp",
      role: "Marketing Director",
      image: "/images/testimonial-2.jpg",
      text: "Working with Altiora has been a game-changer for our business. Their PPC campaigns generated a 400% ROI, and their strategic guidance helped us scale efficiently. Highly recommended!"
    },
    {
      name: "Emily Rodriguez",
      company: "InnovateNow",
      role: "Founder",
      image: "/images/testimonial-3.jpg",
      text: "The team at Altiora doesn't just deliver results - they become true partners in your success. Their personalized approach and expertise helped us achieve goals we never thought possible."
    },
    {
      name: "David Thompson",
      company: "NextGen Enterprises",
      role: "VP of Sales",
      image: "/images/testimonial-4.jpg",
      text: "Altiora's lead generation services filled our sales pipeline consistently. Their appointment setting team is professional and delivered high-quality prospects that converted into loyal customers."
    },
    {
      name: "Lisa Anderson",
      company: "Digital Dynamics",
      role: "CMO",
      image: "/images/testimonial-5.jpg",
      text: "From web development to mobile apps, Altiora delivered exceptional quality. Their technical expertise combined with marketing insights created solutions that truly drive business growth."
    }
  ]

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Services data
  const services = [
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

  // Partnership benefits
  const partnershipBenefits = [
    {
      icon: 'fa-solid fa-lightbulb',
      title: 'Strategic Guidance & Expertise',
      description: 'Get access to our team of seasoned marketing professionals who bring years of industry experience and proven strategies. We provide strategic insights that help you make informed decisions and stay ahead of market trends.'
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'Personalized Growth Strategies',
      description: 'Every business is unique, and so should be your marketing approach. We develop customized growth strategies tailored specifically to your industry, target audience, and business objectives to maximize your success potential.'
    },
    {
      icon: 'fa-solid fa-dollar-sign',
      title: 'Cost-Effective Solutions',
      description: 'Maximize your marketing ROI with our efficient, results-driven approach. We help you allocate your budget wisely across channels that deliver the highest returns, ensuring every dollar spent contributes to your growth.'
    },
    {
      icon: 'fa-solid fa-handshake',
      title: 'Collaborative Success',
      description: 'We believe in true partnership. Our collaborative approach means we work closely with your team, sharing knowledge, insights, and strategies to ensure long-term success and sustainable growth for your business.'
    }
  ]
  
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
    {/* Partner Brands Section */}
<section className="partner-brands-section">
  <div className="container">
    <p className="trusted-by-text">Trusted by leading brands worldwide</p>
    <div className="brand-logos">
      <div className="brand-logo">
        <img src="/images/brands/athos.png" alt="Athos" />
      </div>
      <div className="brand-logo">
        <img src="/images/brands/b2.webp" alt="Core" />
      </div>
      <div className="brand-logo">
        <img src="/images/brands/b4.webp" alt="Eikon" />
      </div>
      <div className="brand-logo">
        <img src="/images/brands/b5.webp" alt="Onward Resources" />
      </div>
      <div className="brand-logo">
        <img src="/images/brands/b6.webp" alt="United" />
      </div>
    </div>
  </div>
</section>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Altiora Marketing</h1>
            <p className="hero-subtitle">
              At Altiora Marketing, we specialize in transforming businesses through innovative digital marketing strategies, 
              cutting-edge web development, and data-driven solutions. Our expert team is dedicated to helping your business 
              reach new heights in the digital landscape, delivering measurable results that drive growth and success.
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-primary">Request a Quote</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero-illustration.jpg" alt="Altiora Marketing" />
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="section partnership-section">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">Exclusive Partnership Benefits</h2>
            <p className="section-description">
              When you partner with Altiora Marketing, you gain access to exclusive benefits designed to accelerate 
              your business growth and maximize your success in the digital marketplace.
            </p>
          </div>

          <div className="benefits-grid">
            {partnershipBenefits.map((benefit, index) => (
              <div className="benefit-card" key={index}>
                <div className="benefit-icon">
                  <i className={benefit.icon}></i>
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">Our Services</h2>
            <p className="section-description">
              Comprehensive digital marketing solutions tailored to your business needs
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
                <Link to={service.link} className="service-link">
                  Learn More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Altiora Section */}
<section className="section why-choose-section">
  <div className="container">
    <div className="section-heading">
      <h2 className="section-title">Why Choose Altiora</h2>
      <p className="section-description">
        We combine technical excellence with strategic thinking to deliver exceptional results
      </p>
    </div>

    <div className="why-choose-content">
      <div className="why-choose-grid">
        <div className="why-choose-card">
          <div className="why-choose-icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <h3>Custom Development</h3>
          <p>No templates or cookie-cutter solutions. We build tailored digital assets aligned perfectly with your brand and business objectives.</p>
        </div>

        <div className="why-choose-card">
          <div className="why-choose-icon">
            <i className="fa-solid fa-gauge-high"></i>
          </div>
          <h3>Performance Optimization</h3>
          <p>Our websites achieve 90+ PageSpeed scores with optimized core web vitals, ensuring fast loading times and excellent user experiences.</p>
        </div>

        <div className="why-choose-card">
          <div className="why-choose-icon">
            <i className="fa-solid fa-mobile-screen"></i>
          </div>
          <h3>Mobile-First Approach</h3>
          <p>We prioritize responsive design from the ground up, ensuring flawless experiences across all devices and screen sizes.</p>
        </div>

        <div className="why-choose-card">
          <div className="why-choose-icon">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h3>Security Focus</h3>
          <p>We implement robust security measures including SSL, regular updates, vulnerability scanning, and secure coding practices.</p>
        </div>
      </div>

      {/* Admin Dashboard Feature */}
      <div className="dashboard-feature">
        <div className="dashboard-content">
          <h3>Exclusive Client Dashboard</h3>
          <p>Every Altiora client receives access to our proprietary analytics and management dashboard.</p>
          
          <ul className="dashboard-features-list">
            <li>
              <i className="fa-solid fa-chart-line"></i>
              <div>
                <h4>Real-time Analytics</h4>
                <p>Monitor website traffic, user behavior, and conversion metrics with intuitive visualizations updated in real-time.</p>
              </div>
            </li>
            <li>
              <i className="fa-solid fa-bullseye"></i>
              <div>
                <h4>Performance Tracking</h4>
                <p>Track key performance indicators including page load times, bounce rates, and engagement metrics across devices.</p>
              </div>
            </li>
            <li>
              <i className="fa-solid fa-pen-to-square"></i>
              <div>
                <h4>Content Management</h4>
                <p>Make quick updates to your website content, images, and promotions without technical knowledge or developer assistance.</p>
              </div>
            </li>
            <li>
              <i className="fa-solid fa-lightbulb"></i>
              <div>
                <h4>AI-Powered Insights</h4>
                <p>Receive automated recommendations to improve SEO, user experience, and conversion rates based on your site's performance data.</p>
              </div>
            </li>
          </ul>
          
          <div className="dashboard-cta">
            <Link to="/contact" className="btn btn-primary">Request Dashboard Demo</Link>
          </div>
        </div>
        <div className="dashboard-image">
          <img src="/images/admin-dashboard.png" alt="Altiora Admin Dashboard" />
        </div>
      </div>

      {/* Technical Excellence Section */}
      <div className="technical-excellence">
        <h3>Technical Excellence</h3>
        <div className="tech-grid">
          <div className="tech-card">
            <h4>Modern Tech Stack</h4>
            <p>We leverage Next.js, React, and headless CMS solutions for blazing-fast, scalable applications with excellent developer experience.</p>
          </div>
          <div className="tech-card">
            <h4>API-First Architecture</h4>
            <p>Our applications are built with RESTful and GraphQL APIs, enabling seamless integration with your existing systems and third-party services.</p>
          </div>
          <div className="tech-card">
            <h4>CI/CD Implementation</h4>
            <p>Automated testing and deployment pipelines ensure code quality and enable rapid, risk-free updates to your digital platforms.</p>
          </div>
          <div className="tech-card">
            <h4>Microservices Approach</h4>
            <p>We build scalable, maintainable systems using microservices architecture that can grow with your business needs.</p>
          </div>
          <div className="tech-card">
            <h4>Progressive Web Apps</h4>
            <p>Deliver app-like experiences with offline capabilities, push notifications, and home screen installation for maximum user engagement.</p>
          </div>
          <div className="tech-card">
            <h4>Serverless Computing</h4>
            <p>Utilize AWS Lambda and Azure Functions for cost-effective, automatically scaling backend solutions without server management overhead.</p>
          </div>
          <div className="tech-card">
            <h4>Advanced Analytics Integration</h4>
            <p>Implement Google Analytics 4, heatmapping, and conversion tracking with custom event monitoring for comprehensive data insights.</p>
          </div>
          <div className="tech-card">
            <h4>Infrastructure as Code</h4>
            <p>Deploy and manage your infrastructure using Terraform and AWS CloudFormation for consistent, version-controlled environments.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-description">
              Don't just take our word for it - hear from businesses that have transformed their success with Altiora Marketing
            </p>
          </div>

          <div className="testimonials-container">
            <div className="testimonial-slider">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`testimonial-slide ${index === currentTestimonial ? 'active' : ''}`}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-text">
                      <i className="fa-solid fa-quote-left quote-icon"></i>
                      <p>"{testimonial.text}"</p>
                    </div>
                    <div className="testimonial-author">
                      <div className="author-image">
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                      <div className="author-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                        <span>{testimonial.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                ></button>
              ))}
            </div>

            {/* Navigation arrows */}
            <button 
              className="testimonial-arrow prev"
              onClick={() => setCurrentTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              className="testimonial-arrow next"
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
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