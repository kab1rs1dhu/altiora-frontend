import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Define navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Services',
      path: '#',
      dropdown: true,
      items: [
        { name: 'SEO', path: '/seo' },
        { name: 'PPC Advertising', path: '/ppc' },
        { name: 'Web Development', path: '/web-development' },
        { name: 'Mobile Development', path: '/mobile-development' },
        { name: 'Lead Generation', path: '/lead-generation' },
        { name: 'Appointment Setting', path: '/appointment-setting' }
      ]
    },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`navbar futuristic-navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Background glow effect */}
      <div className="navbar-glow"></div>
      
      <div className="container navbar-container">
        <Link to="/" className="logo futuristic-logo">
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
            {navItems.map((item, index) => (
              <li 
                key={index} 
                className={`nav-item ${item.dropdown ? 'dropdown' : ''}`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.dropdown ? (
                  <>
                    <span className="dropdown-toggle">
                      {item.name}
                      <i className="dropdown-icon"></i>
                    </span>
                    <ul className={`dropdown-menu ${hoveredItem === item.name ? 'hovered' : ''}`}>
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="dropdown-item">
                          <Link 
                            to={subItem.path} 
                            className={location.pathname === subItem.path ? 'active' : ''}
                          >
                            {subItem.name}
                            <span className="hover-indicator"></span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link 
                    to={item.path} 
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    {item.name}
                    <span className="hover-indicator"></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-primary nav-cta">
            <span>Get Started</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;