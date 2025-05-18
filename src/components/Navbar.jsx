import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">Altiora</span>
        </Link>

        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span className="dropdown-toggle">Services</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/seo" className={location.pathname === '/seo' ? 'active' : ''}>
                    SEO
                  </Link>
                </li>
                <li>
                  <Link to="/ppc" className={location.pathname === '/ppc' ? 'active' : ''}>
                    PPC Advertising
                  </Link>
                </li>
                <li>
                  <Link to="/web-development" className={location.pathname === '/web-development' ? 'active' : ''}>
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link to="/mobile-development" className={location.pathname === '/mobile-development' ? 'active' : ''}>
                    Mobile Development
                  </Link>
                </li>
                <li>
                  <Link to="/lead-generation" className={location.pathname === '/lead-generation' ? 'active' : ''}>
                    Lead Generation
                  </Link>
                </li>
                <li>
                  <Link to="/appointment-setting" className={location.pathname === '/appointment-setting' ? 'active' : ''}>
                    Appointment Setting
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                Contact
              </Link>
            </li>
          </ul>
          <Link to="/contact" className="btn btn-primary nav-cta">
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar