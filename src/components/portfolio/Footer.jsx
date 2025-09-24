import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / About */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            SANJEET MIJAR
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            Full Stack Developer passionate about building modern, scalable and
            user-friendly applications.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><a href="#home" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</a></li>
            <li><a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</a></li>
            <li><a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Skills</a></li>
            <li><a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Connect
          </h3>
          <div className="flex gap-5">
            <a href="https://github.com/sanjeetmijar" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-2xl text-gray-700 dark:text-gray-300 hover:text-black transition">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/sanjeetmijar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-2xl text-[#0A66C2] hover:opacity-80 transition">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
              className="text-2xl text-[#1DA1F2] hover:opacity-80 transition">
              <FaTwitter />
            </a>
            <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="text-2xl text-[#1877F2] hover:opacity-80 transition">
              <FaFacebook />
            </a>
            <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="text-2xl text-[#E4405F] hover:opacity-80 transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-4">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            SANJEET MIJAR
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
