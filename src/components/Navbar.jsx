import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, onToggleAdmin, isAdminMode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll height to apply compact shadow style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'staff', label: 'Staff' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
  };

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="#home" className="logo" onClick={() => handleLinkClick('home')}>
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Sadhana Salon Logo" className="logo-img" />
            <div className="logo-text-wrapper">
              <span>Sadhana</span>
              <span className="logo-sub">Luxury Salon</span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id && !isAdminMode ? 'active' : ''} ${item.id === 'contact' ? 'contact-btn' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </a>
            ))}

            {/* Admin Dashboard Navigation Toggle */}
            <a
              href="#dashboard"
              className={`nav-link ${isAdminMode ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onToggleAdmin();
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <User size={16} />
              Dashboard
            </a>
          </nav>

        </div>
      </header>
    </>
  );
}
