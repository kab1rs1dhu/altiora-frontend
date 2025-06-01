import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define service links
  const serviceLinks = [
    { name: 'Search Engine Optimization', path: '/seo' },
    { name: 'PPC Advertising', path: '/ppc' },
    { name: 'Web Development', path: '/web-development' },
    { name: 'Mobile Development', path: '/mobile-development' },
    { name: 'Lead Generation', path: '/lead-generation' },
    { name: 'Appointment Setting', path: '/appointment-setting' }
  ];

  // Define company links
  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' }
  ];

  // Define social links
  const socialLinks = [
    { name: 'Facebook', icon: 'fa-brands fa-facebook-f', url: 'https://facebook.com' },
    { name: 'Twitter', icon: 'fa-brands fa-twitter', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://linkedin.com' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://instagram.com' }
  ];

  return (
    <footer className="footer futuristic-footer">
      {/* Glowing border effect */}
      <div className="footer-glow"></div>
      
      {/* Background decoration */}
      <div className="footer-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
        <div className="deco-line line-1"></div>
        <div className="deco-line line-2"></div>
      </div>
      
      <div className="container">
        <div className="footer-content">
          <div className="footer-branding">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0L32 8V24L16 32L0 24V8L16 0Z" fill="url(#paint0_linear)" />
                  <path d="M16 6L26 11V21L16 26L6 21V11L16 6Z" fill="url(#paint1_linear)" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1A73E8" />
                      <stop offset="1" stopColor="#4285F4" />
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFFFF" />
                      <stop offset="1" stopColor="#E8F0FE" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="logo-text">ALTIORA</span>
            </Link>
            
            <p className="company-description">
              Altiora helps businesses grow through digital marketing, web development, and lead generation services 
              tailored to your unique needs and goals.
            </p>
            
            <div className="newsletter-signup">
              <h4>Stay Updated</h4>
              <p>Subscribe to our newsletter for the latest industry insights.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button className="btn-subscribe">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
            
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.name}
                  className="social-link"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-link-group">
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-list">
                {serviceLinks.map((link, index) => (
                  <li key={index} className="footer-link-item">
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-group">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                {companyLinks.map((link, index) => (
                  <li key={index} className="footer-link-item">
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-group">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-list contact-list">
                <li className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p>123 Digital Avenue</p>
                    <p>Surrey, BC, Canada</p>
                  </div>
                </li>
                <li className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <a href="tel:+17789651284">+1 (778) 965-1284</a>
                    <a href="tel:+919501770159">+91 9501770159</a>
                  </div>
                </li>
                <li className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <a href="mailto:info@altiora.com">info@altiora.com</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} Altiora Marketing. All rights reserved.</p>
          </div>
          
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;