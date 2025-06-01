import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Reset active dropdown when closing menu
    if (mobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  // Function to specifically handle mobile dropdown toggle
  const handleDropdownClick = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle dropdown:', name, 'Current state:', activeDropdown === name ? 'active' : 'inactive');
    setActiveDropdown(activeDropdown === name ? null : name);
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
    setActiveDropdown(null);
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
      <div className="container navbar-container">
        <Link to="/" className="futuristic-logo">
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

        {/* Mobile menu toggle button */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Mobile navigation menu */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav-container">
            <ul className="mobile-nav-list">
              {navItems.map((item, index) => (
                <li key={index} className="mobile-nav-item">
                  {item.dropdown ? (
                    <div className="mobile-dropdown">
                      <button 
                        className={`mobile-dropdown-toggle ${activeDropdown === item.name ? 'active' : ''}`}
                        onClick={(e) => handleDropdownClick(e, item.name)}
                      >
                        {item.name}
                        <span className="dropdown-arrow">▾</span>
                      </button>
                      
                      <ul className={`mobile-dropdown-menu ${activeDropdown === item.name ? 'active' : ''}`}>
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex} className="mobile-dropdown-item">
                            <Link 
                              to={subItem.path}
                              className={location.pathname === subItem.path ? 'active' : ''}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link 
                      to={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            <div className="mobile-cta-container">
              <Link to="/contact" className="mobile-cta" onClick={() => setMobileMenuOpen(false)}>
                Get Started <span className="arrow">→</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Desktop navigation menu - hidden on mobile */}
        <nav className="desktop-nav">
          <ul className="desktop-nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="desktop-nav-item">
                {item.dropdown ? (
                  <div className="desktop-dropdown">
                    <button className="desktop-dropdown-toggle">
                      {item.name}
                      <span className="dropdown-arrow">▾</span>
                    </button>
                    <ul className="desktop-dropdown-menu">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="desktop-dropdown-item">
                          <Link 
                            to={subItem.path}
                            className={location.pathname === subItem.path ? 'active' : ''}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link 
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <Link to="/contact" className="desktop-cta">
            Get Started <span className="arrow">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;