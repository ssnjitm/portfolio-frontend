import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <nav>
          <div className="logo">
            <span className="logo-bracket">{'{'}</span>
            <span className="logo-text">SANJEET MIJAR</span>
            <span className="logo-bracket">{'}'}</span>
          </div>

          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          {/* toggele switch */}

          <div className="theme-switch-wrapper">
  <input
    type="checkbox"
    id="theme-switch"
    checked={!darkMode}
    onChange={toggleTheme}
  />
  <label htmlFor="theme-switch" className="theme-switch">
    <i className="fas fa-sun"></i>
    <i className="fas fa-moon"></i>
    <span className="switch-ball"></span>
  </label>
</div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
