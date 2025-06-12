import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/FabMenu.css';

const services = [
  { name: 'SEO', path: '/seo', icon: '🔍' },
  { name: 'PPC Advertising', path: '/ppc', icon: '💸' },
  { name: 'Web Development', path: '/web-development', icon: '💻' },
  { name: 'Mobile Development', path: '/mobile-development', icon: '📱' },
  { name: 'Lead Generation', path: '/lead-generation', icon: '🎯' },
  { name: 'Appointment Setting', path: '/appointment-setting', icon: '📅' },
];

const FabMenu = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  // Close all on route change
  React.useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <div className="fab-menu-root">
      {/* Overlay for closing menu */}
      {open && <div className="fab-menu-overlay" onClick={() => { setOpen(false); setServicesOpen(false); }} />}
      <div className={`fab-menu${open ? ' open' : ''}`}>
        <button
          className="fab-main"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
        <div className="fab-actions">
          <Link to="/" className="fab-action" title="Home">
            <span role="img" aria-label="Home">🏠</span>
            <span className="fab-label">Home</span>
          </Link>
          <button
            className="fab-action"
            onClick={() => setServicesOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={servicesOpen}
            title="Services"
          >
            <span role="img" aria-label="Services">🛠️</span>
            <span className="fab-label">Services</span>
            <span className="fab-caret">▼</span>
          </button>
          {servicesOpen && (
            <div className="fab-dropdown">
              {services.map((s) => (
                <Link
                  to={s.path}
                  className="fab-dropdown-item"
                  key={s.name}
                >
                  <span className="fab-dropdown-icon">{s.icon}</span>
                  {s.name}
                </Link>
              ))}
            </div>
          )}
          <Link to="/contact" className="fab-action" title="Contact">
            <span role="img" aria-label="Contact">✉️</span>
            <span className="fab-label">Contact</span>
          </Link>
          <Link to="/contact" className="fab-action fab-cta" title="Get Started">
            <span role="img" aria-label="Get Started">🚀</span>
            <span className="fab-label">Get Started</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FabMenu; 