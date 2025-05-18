import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Elevate Your Business with Strategic Digital Marketing</h1>
            <p className="hero-subtitle">
              Altiora helps businesses grow through custom digital strategies, innovative development, and data-driven marketing solutions.
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-primary">Get A Free Consultation</Link>
              <Link to="/services" className="btn btn-outline">Explore Services</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/logo.jpeg" alt="Digital Marketing Strategy" />
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
            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 className="service-title">Search Engine Optimization</h3>
              <p className="service-description">
                Improve your online visibility and drive organic traffic with our data-driven SEO strategies.
              </p>
              <Link to="/seo" className="service-link">Learn More <i className="fa-solid fa-arrow-right"></i></Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-rectangle-ad"></i>
              </div>
              <h3 className="service-title">PPC Advertising</h3>
              <p className="service-description">
                Generate immediate results with targeted pay-per-click campaigns optimized for ROI.
              </p>
              <Link to="/ppc" className="service-link">Learn More <i className="fa-solid fa-arrow-right"></i></Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3 className="service-title">Web Development</h3>
              <p className="service-description">
                Create stunning, high-performing websites that convert visitors into customers.
              </p>
              <Link to="/web-development" className="service-link">Learn More <i className="fa-solid fa-arrow-right"></i></Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-mobile-screen"></i>
              </div>
              <h3 className="service-title">Mobile App Development</h3>
              <p className="service-description">
                Build innovative mobile applications that engage users and drive business growth.
              </p>
              <Link to="/mobile-development" className="service-link">Learn More <i className="fa-solid fa-arrow-right"></i></Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 className="service-title">Lead Generation</h3>
              <p className="service-description">
                Capture high-quality leads with proven strategies that fill your sales pipeline.
              </p>
              <Link to="/lead-generation" className="service-link">Learn More <i className="fa-solid fa-arrow-right"></i></Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <h3 className="service-title">Appointment Setting</h3>
              <p className="service-description">
                Fill your calendar with qualified prospects through our appointment setting services.
              </p>
              <Link to="/appointment-setting" className="service-link">Learn More <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-section">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">Why Choose Altiora</h2>
            <p className="section-description">
              We deliver measurable results with a client-centered approach
            </p>
          </div>

          <div className="why-choose-content">
            <div className="why-choose-image">
              <img src="/images/why-choose-us.svg" alt="Why Choose Altiora" />
            </div>
            
            <div className="why-choose-points">
              <div className="point">
                <div className="point-icon">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div className="point-content">
                  <h3>Data-Driven Strategies</h3>
                  <p>We base all our marketing decisions on analytics and performance data to ensure optimal results.</p>
                </div>
              </div>
              
              <div className="point">
                <div className="point-icon">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="point-content">
                  <h3>Expert Team</h3>
                  <p>Our seasoned professionals have years of experience across various industries and digital platforms.</p>
                </div>
              </div>
              
              <div className="point">
                <div className="point-icon">
                  <i className="fa-solid fa-handshake"></i>
                </div>
                <div className="point-content">
                  <h3>Customized Solutions</h3>
                  <p>We don't believe in one-size-fits-all. Every strategy is tailored to your specific business goals.</p>
                </div>
              </div>
              
              <div className="point">
                <div className="point-icon">
                  <i className="fa-solid fa-chart-simple"></i>
                </div>
                <div className="point-content">
                  <h3>Transparent Reporting</h3>
                  <p>Get regular insights into your campaign performance with easy-to-understand reports.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Grow Your Business?</h2>
            <p>Schedule a free consultation with our digital marketing experts today.</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home