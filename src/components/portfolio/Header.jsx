// src/components/Header.jsx (or wherever it is)
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = ["Home", "About", "Experience", "Projects", "Skills", "Contact"];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.05)]"
          : "bg-transparent shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.05)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="logo flex items-center space-x-1 cursor-pointer">
            <span className="text-2xl font-bold text-blue-600">{`{`}</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              SANJEET MIJAR
            </span>
            <span className="text-2xl font-bold text-blue-600">{`}`}</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
                onClick={(e) => {
                  e.target.style.transform = "scale(0.95)";
                  setTimeout(() => {
                    e.target.style.transform = "scale(1)";
                  }, 100);
                }}
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Side: Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative flex items-center w-14 h-8 rounded-full transition-colors duration-300 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
              aria-label="Toggle theme"
            >
              <FaSun
                className={`absolute left-1.5 text-yellow-500 text-sm transition-opacity duration-300 ${
                  darkMode ? "opacity-50" : "opacity-100"
                }`}
              />
              <FaMoon
                className={`absolute right-1.5 text-yellow-800 dark:text-white text-sm transition-opacity duration-300 ${
                  darkMode ? "opacity-100" : "opacity-50"
                }`}
              />
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  darkMode ? "translate-x-6" : ""
                }`}
              />
            </button>

            {/* Mobile Menu Button (visible only on mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown (Slide Down) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
                  onClick={() => setMobileMenuOpen(false)} // Close menu on click
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Optional: Overlay when mobile menu open (for better UX) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-30 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

     
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;