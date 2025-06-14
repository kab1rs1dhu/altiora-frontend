import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import '../styles/Home.css';
import '../styles/LoadingStates.css';

const Home = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent();
  const [pageContent, setPageContent] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [animatedServices, setAnimatedServices] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const partnershipsRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const heroImageRef = useRef(null);
  
  // Testimonials data
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
  ];
  
  // Simple navigation functions
  const goToPrevTestimonial = () => {
    const newIndex = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
    setCurrentTestimonial(newIndex);
  };
  
  const goToNextTestimonial = () => {
    const newIndex = (currentTestimonial + 1) % testimonials.length;
    setCurrentTestimonial(newIndex);
  };
  
  // Mouse move effect for hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      };
      
      if (heroImageRef.current) {
        const strength = 20;
        const rotateX = mouseRef.current.y * strength;
        const rotateY = mouseRef.current.x * strength;
        
        heroImageRef.current.style.transform = `
          perspective(1000px) 
          rotateX(${-rotateX}deg) 
          rotateY(${rotateY}deg)
          translateZ(10px)
          scale3d(1.05, 1.05, 1.05)
        `;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Animate services on scroll
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          const serviceElements = servicesRef.current.querySelectorAll('.service-card');
          const newAnimatedServices = [];
          
          serviceElements.forEach((el, index) => {
            setTimeout(() => {
              newAnimatedServices.push(index);
              setAnimatedServices([...newAnimatedServices]);
            }, 150 * index);
          });
        }
      }
      
      // Always keep hero visible
      setIsHeroVisible(true);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Reveal hero section on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Load content from API
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('home');
      setPageContent(content);
    };
    
    loadContent();
  }, [fetchPageContent]);
  
  // Auto-slide testimonials - disabled for better user control
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  */

  // Services data
  const services = [
    {
      icon: 'fa-solid fa-magnifying-glass',
      title: 'Search Engine Optimization',
      description: 'Improve your online visibility and drive organic traffic with our data-driven SEO strategies.',
      link: '/seo',
      color: '#6C63FF'
    },
    {
      icon: 'fa-solid fa-rectangle-ad',
      title: 'PPC Advertising',
      description: 'Generate immediate results with targeted pay-per-click campaigns optimized for ROI.',
      link: '/ppc',
      color: '#4285F4'
    },
    {
      icon: 'fa-solid fa-laptop-code',
      title: 'Web Development',
      description: 'Create stunning, high-performing websites that convert visitors into customers.',
      link: '/web-development',
      color: '#0D47A1'
    },
    {
      icon: 'fa-solid fa-mobile-screen',
      title: 'Mobile App Development',
      description: 'Build innovative mobile applications that engage users and drive business growth.',
      link: '/mobile-development',
      color: '#1A73E8'
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'Lead Generation',
      description: 'Capture high-quality leads with proven strategies that fill your sales pipeline.',
      link: '/lead-generation',
      color: '#34A853'
    },
    {
      icon: 'fa-solid fa-calendar-check',
      title: 'Appointment Setting',
      description: 'Fill your calendar with qualified prospects through our appointment setting services.',
      link: '/appointment-setting',
      color: '#EA4335'
    }
  ];

  // Partnership benefits
  const partnershipBenefits = [
    {
      icon: 'fa-solid fa-lightbulb',
      title: 'Strategic Guidance & Expertise',
      description: 'Get access to our team of seasoned marketing professionals who bring years of industry experience and proven strategies.',
      color: '#FBBC05'
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'Personalized Growth Strategies',
      description: 'Every business is unique, and so should be your marketing approach. We develop customized growth strategies tailored specifically to your industry.',
      color: '#34A853'
    },
    {
      icon: 'fa-solid fa-dollar-sign',
      title: 'Cost-Effective Solutions',
      description: 'Maximize your marketing ROI with our efficient, results-driven approach. We help you allocate your budget wisely across channels.',
      color: '#4285F4'
    },
    {
      icon: 'fa-solid fa-handshake',
      title: 'Collaborative Success',
      description: 'We believe in true partnership. Our collaborative approach means we work closely with your team, sharing knowledge and insights.',
      color: '#EA4335'
    }
  ];
  
  // Loading spinner if needed
  if (loading && !pageContent && services.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading content...</p>
      </div>
    );
  }

  // Parallax calculations
  const heroParallax = scrollPosition * 0.5;
  const partnershipsParallax = (scrollPosition - 800) * 0.2;
  
  return (
    <>
      {/* Floating UI Elements - Interactive Decoration */}
      <div className="floating-elements">
        <div className="floating-element el-1"></div>
        <div className="floating-element el-2"></div>
        <div className="floating-element el-3"></div>
        <div className="floating-element el-4"></div>
        <div className="floating-element el-5"></div>
      </div>
      
      {/* Hero Section with Futuristic Design */}
      <section className={`hero futuristic-hero ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
        
        <div className="hero-gradient-overlay"></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Next-Gen Digital Marketing</span>
            </div>
            <h1 className="hero-title futuristic-title">
              <span className="text-gradient">Altiora Marketing</span>
              <span className="title-accent"></span>
            </h1>
            <p className="hero-subtitle">
              We specialize in transforming businesses through innovative digital marketing strategies, 
              cutting-edge web development, and data-driven solutions that deliver measurable results.
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-primary btn-glow">
                <span>Request a Quote</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/services" className="btn btn-outline btn-outline-modern">
                <span>Explore Services</span>
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number"><span className="counter">500</span>+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number"><span className="counter">97</span>%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-number"><span className="counter">10</span>+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="image-wrapper" ref={heroImageRef}>
              <img src="/images/hero-illustration.jpg" alt="Altiora Marketing" />
              <div className="image-glow"></div>
            </div>
            <div className="image-decoration">
              <div className="deco-circle circle-1"></div>
              <div className="deco-circle circle-2"></div>
              <div className="deco-line line-1"></div>
              <div className="deco-line line-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Brands with Smooth Scroll */}
      <section className="partner-brands-section">
        <div className="brands-blur-overlay"></div>
        <div className="container">
          <p className="trusted-by-text">Trusted by leading brands worldwide</p>
          <div className="brand-logos-container">
            <div className="brand-logos scrolling">
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
              
              {/* Duplicate logos for infinite scroll effect */}
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
        </div>
      </section>

      {/* Services Section with Interactive Cards */}
      <section className="section services-section futuristic-section" ref={servicesRef}
        style={{ transform: `translateY(${Math.min(scrollPosition * 0.05, 30)}px)` }}>
        <div className="services-blob blob-1"></div>
        <div className="services-blob blob-2"></div>
        
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">What We Offer</span>
            <h2 className="section-title">
              <span className="text-gradient">Our Services</span>
            </h2>
            <p className="section-description">
              Comprehensive digital marketing solutions tailored to your business needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div className={`service-card futuristic-card ${animatedServices.includes(index) ? 'animated' : ''}`} 
                key={index}
                style={{ 
                  '--card-color': service.color,
                  transitionDelay: `${index * 0.1}s`
                }}>
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
                <div className="card-glow"></div>
                <div className="card-border"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits with Parallax */}
      <section className="section partnership-section futuristic-section" ref={partnershipsRef}
        style={{ backgroundPosition: `50% ${partnershipsParallax}px` }}>
        <div className="partnership-blob blob-1"></div>
        <div className="partnership-blob blob-2"></div>
        
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Why Work With Us</span>
            <h2 className="section-title">
              <span className="text-gradient">Exclusive Partnership Benefits</span>
            </h2>
            <p className="section-description">
              When you partner with Altiora Marketing, you gain access to exclusive benefits designed to accelerate 
              your business growth and maximize your success in the digital marketplace.
            </p>
          </div>

          <div className="benefits-grid">
            {partnershipBenefits.map((benefit, index) => (
              <div 
                className="benefit-card futuristic-card" 
                key={index}
                style={{ '--card-color': benefit.color }}
              >
                <div className="benefit-icon" style={{ backgroundColor: `${benefit.color}20` }}>
                  <i className={benefit.icon} style={{ color: benefit.color }}></i>
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
                <div className="card-border"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Altiora with Interactive Elements */}
      <section className="section why-choose-section futuristic-section">
        <div className="why-choose-blob blob-1"></div>
        <div className="why-choose-blob blob-2"></div>
        
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Difference</span>
            <h2 className="section-title">
              <span className="text-gradient">Why Choose Altiora</span>
            </h2>
            <p className="section-description">
              We combine technical excellence with strategic thinking to deliver exceptional results
            </p>
          </div>

          <div className="why-choose-content">
            {/* Dashboard Feature with Interactive Hover */}
            <div className="dashboard-feature futuristic-feature">
              <div className="dashboard-content">
                <div className="feature-badge">
                  <span>Exclusive Access</span>
                </div>
                <h3>Exclusive Client Dashboard</h3>
                <p>Every Altiora client receives access to our proprietary analytics and management dashboard.</p>
                
                <ul className="dashboard-features-list">
                  <li className="feature-item">
                    <div className="feature-icon">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                      <h4>Real-time Analytics</h4>
                      <p>Monitor website traffic, user behavior, and conversion metrics with intuitive visualizations updated in real-time.</p>
                    </div>
                  </li>
                  <li className="feature-item">
                    <div className="feature-icon">
                      <i className="fa-solid fa-bullseye"></i>
                    </div>
                    <div>
                      <h4>Performance Tracking</h4>
                      <p>Track key performance indicators including page load times, bounce rates, and engagement metrics across devices.</p>
                    </div>
                  </li>
                  <li className="feature-item">
                    <div className="feature-icon">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div>
                      <h4>Content Management</h4>
                      <p>Make quick updates to your website content, images, and promotions without technical knowledge or developer assistance.</p>
                    </div>
                  </li>
                  <li className="feature-item">
                    <div className="feature-icon">
                      <i className="fa-solid fa-lightbulb"></i>
                    </div>
                    <div>
                      <h4>AI-Powered Insights</h4>
                      <p>Receive automated recommendations to improve SEO, user experience, and conversion rates based on your site's performance data.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="dashboard-cta">
                  <Link to="/contact" className="btn btn-primary btn-glow">
                    <span>Request Dashboard Demo</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div className="dashboard-image">
                <img src="/images/admin-dashboard.png" alt="Altiora Admin Dashboard" />
                <div className="image-overlay"></div>
                <div className="interactive-hotspots">
                  <div className="hotspot hotspot-1">
                    <div className="hotspot-dot"></div>
                    <div className="hotspot-tooltip">Real-time analytics and performance metrics</div>
                  </div>
                  <div className="hotspot hotspot-2">
                    <div className="hotspot-dot"></div>
                    <div className="hotspot-tooltip">Customizable reporting dashboard</div>
                  </div>
                  <div className="hotspot hotspot-3">
                    <div className="hotspot-dot"></div>
                    <div className="hotspot-tooltip">User behavior visualization</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with 3D Effect */}
      <section className="section testimonials-section futuristic-section">
        <div className="testimonial-blob blob-1"></div>
        <div className="testimonial-blob blob-2"></div>
        
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Client Success Stories</span>
            <h2 className="section-title">
              <span className="text-gradient">What Our Clients Say</span>
            </h2>
            <p className="section-description">
              Don't just take our word for it - hear from businesses that have transformed their success with Altiora Marketing
            </p>
          </div>

          <div className="testimonials-container">
            <div className="testimonial-slider">
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <div className="quote-icon">
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                  <p>"{testimonials[currentTestimonial].text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonials[currentTestimonial].name}</h4>
                    <p>{testimonials[currentTestimonial].role}</p>
                    <span>{testimonials[currentTestimonial].company}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Navigation arrows */}
            <button 
              className="testimonial-arrow prev"
              onClick={goToPrevTestimonial}
              aria-label="Previous testimonial"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              className="testimonial-arrow next"
              onClick={goToNextTestimonial}
              aria-label="Next testimonial"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="section process-section futuristic-section" id="process-section">
        <div className="process-blob blob-1"></div>
        <div className="process-blob blob-2"></div>
        
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">How We Work</span>
            <h2 className="section-title">
              <span className="text-gradient">Our Proven Process</span>
            </h2>
            <p className="section-description">
              We follow a structured approach to ensure consistent results and transparent communication
            </p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <div className="step-icon">
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <h3>Discovery & Analysis</h3>
                <p>We begin by thoroughly understanding your business, goals, target audience, and current digital presence to identify opportunities.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <div className="step-icon">
                  <i className="fa-solid fa-sitemap"></i>
                </div>
                <h3>Strategic Planning</h3>
                <p>Based on our analysis, we develop a customized strategy that aligns with your business objectives and maximizes your ROI.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <div className="step-icon">
                  <i className="fa-solid fa-rocket"></i>
                </div>
                <h3>Implementation</h3>
                <p>Our expert team executes the strategy with precision, leveraging cutting-edge tools and best practices to deliver exceptional results.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <div className="step-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h3>Monitoring & Optimization</h3>
                <p>We continuously track performance, analyze data, and make data-driven adjustments to optimize your campaigns for maximum impact.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <div className="step-icon">
                  <i className="fa-solid fa-arrows-spin"></i>
                </div>
                <h3>Reporting & Refinement</h3>
                <p>Regular detailed reports keep you informed of progress, while we refine strategies based on insights and changing market conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Animated Background */}
      <section className="cta-section futuristic-cta">
        <div className="cta-background">
          <div className="cta-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="cta-particle"></div>
            ))}
          </div>
        </div>
        
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Digital Presence?</h2>
            <p>Let's discuss how our innovative strategies and solutions can help your business reach new heights.</p>
            <Link to="/contact" className="btn btn-primary btn-glow btn-large">
              <span>Start Your Journey</span>
              <i className="fa-solid fa-rocket"></i>
            </Link>
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
  );
};

export default Home;