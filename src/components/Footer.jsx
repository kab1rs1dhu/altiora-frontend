import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-company">
            <Link to="/" className="footer-logo">
              <span className="logo-text">ALTIORA</span>
            </Link>
            <p className="company-description">
              Altiora helps businesses grow through digital marketing, web development, and lead generation services tailored to your needs.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-link-group">
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-list">
                <li>
                  <Link to="/seo">Search Engine Optimization</Link>
                </li>
                <li>
                  <Link to="/ppc">PPC Advertising</Link>
                </li>
                <li>
                  <Link to="/web-development">Web Development</Link>
                </li>
                <li>
                  <Link to="/mobile-development">Mobile Development</Link>
                </li>
                <li>
                  <Link to="/lead-generation">Lead Generation</Link>
                </li>
                <li>
                  <Link to="/appointment-setting">Appointment Setting</Link>
                </li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/case-studies">Case Studies</Link>
                </li>
                <li>
                  <Link to="/testimonials">Testimonials</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-list contact-list">
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <div className="contact-numbers">
                    <div><a href="tel:+7789651284">+1 (778) 965-1284</a></div>
                    <div><a href="tel:+9501770159">+91 9501770159</a></div>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  <span><a href="mailto:info@altiora.com">info@altiora.com</a></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} Altiora. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer