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
  const location = useLocation();

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div className="fab-menu-root">
      {/* Overlay for closing menu */}
      {open && <div className="fab-menu-overlay" onClick={() => setOpen(false)} />}
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
          {services.map((s) => (
            <Link
              to={s.path}
              className="fab-action"
              key={s.name}
              title={s.name}
            >
              <span className="fab-dropdown-icon" role="img" aria-label={s.name}>{s.icon}</span>
              <span className="fab-label">{s.name}</span>
            </Link>
          ))}
          <Link to="/contact" className="fab-action" title="Contact">
            <span role="img" aria-label="Contact">✉️</span>
            <span className="fab-label">Contact</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FabMenu; 