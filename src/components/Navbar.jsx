import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    dropdown: true,
    items: [
      { name: 'SEO', path: '/seo' },
      { name: 'PPC Advertising', path: '/ppc' },
      { name: 'Web Development', path: '/web-development' },
      { name: 'Mobile Development', path: '/mobile-development' },
      { name: 'Lead Generation', path: '/lead-generation' },
      { name: 'Appointment Setting', path: '/appointment-setting' },
    ],
  },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [servicesDropdownMobile, setServicesDropdownMobile] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdownMobile(false);
    setDropdownOpen(false);
  }, [location]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="navbar-new">
      <div className="navbar-container-new">
        <Link to="/" className="navbar-logo">🚀 Altiora</Link>
        {/* Hamburger for mobile */}
        <button
          className={`navbar-hamburger${mobileOpen ? ' open' : ''}`}
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
        {/* Desktop nav */}
        <nav className="navbar-links">
          {navLinks.map((link, idx) =>
            link.dropdown ? (
              <div
                className="navbar-dropdown"
                key={link.name}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={`navbar-link${dropdownOpen ? ' active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((v) => !v)}
                  type="button"
                >
                  {link.name} <span className="navbar-caret">▼</span>
                </button>
                <div className={`navbar-dropdown-menu${dropdownOpen ? ' show' : ''}`}>
                  {link.items.map((item) => (
                    <Link
                      to={item.path}
                      key={item.name}
                      className={location.pathname === item.path ? 'active' : ''}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                to={link.path}
                key={link.name}
                className={`navbar-link${location.pathname === link.path ? ' active' : ''}`}
              >
                {link.name}
              </Link>
            )
          )}
          <Link to="/contact" className="navbar-cta">Get Started →</Link>
        </nav>
        {/* Mobile nav */}
        <nav className={`navbar-mobile${mobileOpen ? ' open' : ''}`}> 
          <ul>
            {navLinks.map((link) =>
              link.dropdown ? (
                <li key={link.name}>
                  <button
                    className={`navbar-link${servicesDropdownMobile ? ' active' : ''}`}
                    onClick={() => setServicesDropdownMobile((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={servicesDropdownMobile}
                  >
                    {link.name} <span className="navbar-caret">▼</span>
                  </button>
                  <ul className={`navbar-dropdown-mobile${servicesDropdownMobile ? ' show' : ''}`}>
                    {link.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className={location.pathname === item.path ? 'active' : ''}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={location.pathname === link.path ? 'active' : ''}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            )}
            <li>
              <Link to="/contact" className="navbar-cta" onClick={() => setMobileOpen(false)}>
                Get Started →
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 