import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BrandNavbar.css';

const BrandNavbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-container">
          <img 
            src="/images/logo.jpg" 
            alt="Altiora" 
            className="navbar-logo" 
          />
        </Link>
        <div className="navbar-title">
          <span className="navbar-name">ALTIORA</span>
        </div>
      </div>
    </header>
  );
};

export default BrandNavbar; 