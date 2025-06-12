import React from 'react';
import '../styles/BrandNavbar.css';

const BrandNavbar = () => (
  <header className="brand-navbar">
    <div className="brand-navbar-container">
      <img src="/images/logo.png" alt="Altiora Logo" className="brand-logo-img" />
      <span className="brand-name">ALTIORA</span>
    </div>
  </header>
);

export default BrandNavbar; 