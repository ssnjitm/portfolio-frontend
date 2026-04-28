import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white font-mono">
            <span className="text-blue-600 dark:text-blue-400">{`{`}</span>
            SANJEET MIJAR
            <span className="text-blue-600 dark:text-blue-400">{`}`}</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center md:text-left leading-relaxed">
            Full Stack Developer<br />
            passionate about building<br />
            modern, scalable applications
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["home", "about", "skills", "projects", "contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize"
                >
                  {link}
                </a>
              </li>
            ))}
            <li>
              <a href="/admin" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Admin
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">Connect</h3>
          <div className="flex gap-4">
            {[
              { href: "https://github.com/ssnjitm",           icon: <FaGithub />,    cls: "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" },
              { href: "https://linkedin.com/in/sanjeetmijar", icon: <FaLinkedin />,  cls: "text-[#0A66C2] hover:opacity-80" },
              { href: "https://twitter.com/yourusername",     icon: <FaTwitter />,   cls: "text-[#1DA1F2] hover:opacity-80" },
              { href: "https://facebook.com/yourusername",    icon: <FaFacebook />,  cls: "text-[#1877F2] hover:opacity-80" },
              { href: "https://instagram.com/yourusername",   icon: <FaInstagram />, cls: "text-[#E4405F] hover:opacity-80" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xl transition hover:scale-110 transform ${s.cls}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 py-4">
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Sanjeet Mijar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
