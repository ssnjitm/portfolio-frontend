import { useEffect } from "react";
import useContactStore from "../../store/useContactStore";
import useContactMessageStore from "../../store/useContactMessageStore";
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp, FaViber } from "react-icons/fa";
import { SiUpwork, SiFiverr } from "react-icons/si";

const SOCIALS = [
  { name: "LinkedIn", icon: <FaLinkedin className="text-[#0A66C2]" />,  href: "https://www.linkedin.com/in/sanjeet-mijar/" },
  { name: "Viber",    icon: <FaViber className="text-[#7360f2]" />,     href: "viber://chat?number=+9779849727262" },
  { name: "WhatsApp", icon: <FaWhatsapp className="text-[#25D366]" />,  href: "https://wa.me/+9779849727262" },
  { name: "Facebook", icon: <FaFacebook className="text-[#1877F2]" />,  href: "https://www.facebook.com/sanjit.mangrati.92/" },
  { name: "Upwork",   icon: <SiUpwork className="text-[#6fda44]" />,    href: "https://www.upwork.com/freelancers/~018cd45dd166ce3cf8?mp_source=share" },
  { name: "Fiverr",   icon: <SiFiverr className="text-[#1DBF73]" />,    href: "https://www.fiverr.com/yourusername" },
  { name: "GitHub",   icon: <FaGithub className="text-gray-700 dark:text-white" />, href: "https://github.com/ssnjitm" },
];

const Contact = () => {
  const { fetchContactInfo } = useContactStore();
  const { submitMessage, loading, error, success } = useContactMessageStore();

  useEffect(() => { fetchContactInfo(); }, [fetchContactInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target).entries());
    await submitMessage(payload);
    if (!error) e.target.reset();
  };

  return (
    <section id="contact" className="section py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="contact-content max-w-lg mx-auto">
          {/* Social Links */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Contact me through</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 hover:scale-110 transform transition-all duration-300 shadow-sm dark:shadow-lg"
                >
                  <span className="text-2xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form space-y-4 mt-12" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-5 text-center flex items-center justify-center text-gray-900 dark:text-white">
              <span className="text-green-500 dark:text-green-400 font-mono mr-2">➜</span>
              Send a Direct Message
            </h2>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono">const</span> name = "
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="text-gray-400 dark:text-gray-500 font-mono text-sm">";</span>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono">const</span> email = "
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="text-gray-400 dark:text-gray-500 font-mono text-sm">";</span>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono">const</span> message = `
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Your message here..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
              <span className="text-gray-400 dark:text-gray-500 font-mono text-sm">`;</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
                loading
                  ? "bg-gray-600 cursor-not-allowed text-gray-400"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/25"
              }`}
            >
              {loading ? (
                <span className="font-mono">Sending...</span>
              ) : (
                <span className="font-mono">submit()</span>
              )}
            </button>

            {success && (
              <p className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 font-mono text-sm text-center">
                ✓ {success}
              </p>
            )}
            {error && (
              <p className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 font-mono text-sm text-center">
                ✗ {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
