import React, { useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = React.useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.05)]' : 'bg-transparent shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.05)]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-4">
          <div className="logo flex items-center space-x-1 cursor-pointer">
            <span className="text-2xl font-bold text-blue-600">{`{`}</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">SANJEET MIJAR</span>
            <span className="text-2xl font-bold text-blue-600">{`}`}</span>
          </div>

          <div className="nav-links hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
                onClick={(e) => {
                  e.target.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                    e.target.style.transform = 'scale(1)';
                  }, 100);
                }}
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Theme toggle switch */}
          <div className="theme-switch-wrapper relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="theme-switch"
              checked={darkMode}
              onChange={toggleTheme}
              className="sr-only peer"
            />
            <label
              htmlFor="theme-switch"
              className="theme-switch relative inline-flex items-center w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 ease-in-out peer-checked:bg-blue-600 peer-checked:dark:bg-blue-500 transform hover:scale-105 active:scale-95 transition-transform"
            >
              <i className="fas fa-sun absolute left-1.5 top-1.5 text-xs text-yellow-400 peer-checked:opacity-0 transition-opacity duration-300"></i>
              <i className="fas fa-moon absolute right-1.5 top-1.5 text-xs text-blue-600 peer-checked:opacity-100 opacity-0 transition-opacity duration-300"></i>
              <span className="switch-ball absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out peer-checked:translate-x-6"></span>
            </label>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;