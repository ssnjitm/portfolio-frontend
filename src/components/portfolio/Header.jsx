import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="logo flex items-center space-x-1 cursor-pointer">
            <span className="text-2xl font-bold text-blue-600">{`{`}</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              SANJEET MIJAR
            </span>
            <span className="text-2xl font-bold text-blue-600">{`}`}</span>
          </div>

          <div className="nav-links hidden md:flex items-center space-x-8">
            {["Home", "About", "Experience", "Projects", "Skills", "Contact"].map(
              (item) => (
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
              )
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`relative flex items-center w-14 h-8 rounded-full transition-colors duration-300 ${
              darkMode ? "bg-black-500" : "bg-gray-100"
            }`}
          >
            {/* Sun Icon */}
            <FaSun
              className={`absolute left-1.5 text-yellow-500 text-sm transition-opacity duration-300 ${
                darkMode ? "opacity-50" : "opacity-100"
              }`}
            />

            {/* Moon Icon */}
            <FaMoon
              className={`absolute right-1.5 text-yellow-800 dark:text-white text-sm transition-opacity duration-300 ${
                darkMode ? "opacity-100" : "opacity-50"
              }`}
            />

            {/* Switch Ball */}
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? "translate-x-6" : ""
              }`}
            />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
