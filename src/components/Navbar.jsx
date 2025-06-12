import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Toggle mobile menu with proper scroll handling
  const toggleMobileMenu = () => {
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    
    // Toggle body scrolling
    if (newMenuState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
      // Reset any active dropdowns when closing menu
      setActiveDropdown(null);
    }
  };

  // Handle dropdown toggle
  const toggleDropdown = (name, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setActiveDropdown(prevActive => prevActive === name ? null : name);
  };

  useEffect(() => {
    // Handle scroll detection for navbar appearance
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    // Close dropdowns when clicking outside
    const handleClickOutside = (e) => {
      if (activeDropdown && !e.target.closest('.dropdown-menu') && 
          !e.target.closest('.dropdown-toggle')) {
        setActiveDropdown(null);
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
      // Reset body state
      document.body.classList.remove('menu-open');
    };
  }, [activeDropdown]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    document.body.classList.remove('menu-open');
  }, [location]);

  // Navigation items
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
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">Altiora</span>
        </Link>

        {/* Mobile menu toggle button */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          aria-label="Toggle mobile menu"
          onClick={toggleMobileMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Mobile navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="mobile-nav-item">
                {item.dropdown ? (
                  <div className="mobile-dropdown">
                    <button 
                      className={`mobile-dropdown-toggle ${activeDropdown === item.name ? 'active' : ''}`}
                      onClick={(e) => toggleDropdown(item.name, e)}
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
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setActiveDropdown(null);
                              document.body.classList.remove('menu-open');
                            }}
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
                    onClick={() => {
                      setMobileMenuOpen(false);
                      document.body.classList.remove('menu-open');
                    }}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="mobile-cta-container">
            <Link 
              to="/contact" 
              className="mobile-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                document.body.classList.remove('menu-open');
              }}
            >
              Get Started <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="desktop-nav">
          <ul className="desktop-nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="desktop-nav-item">
                {item.dropdown ? (
                  <div className="desktop-dropdown">
                    <button 
                      className={`desktop-dropdown-toggle ${activeDropdown === item.name ? 'active' : ''}`}
                      onClick={(e) => toggleDropdown(item.name, e)}
                    >
                      {item.name}
                      <span className="dropdown-arrow">▾</span>
                    </button>
                    <ul className={`desktop-dropdown-menu ${activeDropdown === item.name ? 'active' : ''}`}>
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="desktop-dropdown-item">
                          <Link 
                            to={subItem.path}
                            className={location.pathname === subItem.path ? 'active' : ''}
                            onClick={() => setActiveDropdown(null)}
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