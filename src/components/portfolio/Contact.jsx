import React, { useEffect } from "react";
import TypingEffect from "./TypingEffect";
import useContactStore from "../../store/useContactStore";
import useContactMessageStore from "../../store/useContactMessageStore";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaViber,
} from "react-icons/fa";
import { SiUpwork, SiFiverr } from "react-icons/si";



const Contact = () => {
  
  const {fetchContactInfo,contactInfo}=useContactStore();
  useEffect(() => {
      fetchContactInfo();
    }, [fetchContactInfo]);

   const { submitMessage, loading, error, success } = useContactMessageStore();

  


  return (
    <section id="contact" className="section py-20 bg-white dark:bg-gray-900">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-header mb-12 text-center">
          <h2 className="section-title inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
            <span className="section-number text-blue-600 mr-3 text-xl"></span>{" "}
            Contact
          </h2>
          <div className="section-line w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>

        {/* Typing Effect */}
        <div className="contact-content max-w-md mx-auto">
          <TypingEffect
            text={[
              "Feel free to reach out for collaborations, project inquiries, or just to say hello!",
              " You can also connect with me on social media platforms like LinkedIn, GitHub, Facebook, upwork ,whatsapp,viber and fiver",
            ]}
            as="p"
            className="text-3xl mb-8 max-w-2xl mx-auto lg:mx-0"
            typingSpeed={30}
            cursorCharacter="|"
            cursorBlinkDuration={0.5}
            textColors={["#0e35e4ff"]}
            variableSpeed={{ min: 50, max: 150 }}
            onSentenceComplete={(sentence, index) => {
              console.log(`Completed: ${sentence} (Index: ${index})`);
            }}
            startOnVisible={true}
            reverseMode={false}
          />

         

         {/* Social Links */}
{/* Social Links */}
<div className="mt-20 text-center">
  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-10">
    Contact me through
  </h3>
  <div className="flex flex-wrap justify-center gap-10">
    {[
      { name: "LinkedIn", icon: <FaLinkedin className="text-[#0A66C2]" />, href: "https://www.linkedin.com/in/sanjeet-mijar/", bg: "bg-white" },
      // { name: "Twitter", icon: <FaTwitter className="text-[#1DA1F2]" />, href: "https://twitter.com/yourusername", bg: "bg-white" },
      { name: "Viber", icon: <FaViber className="text-[#7360f2]" />, href: "viber://chat?number=+9779849727262", bg: "bg-white" },
      { name: "WhatsApp", icon: <FaWhatsapp className="text-[#25D366]" />, href: "https://wa.me/+9779849727262", bg: "bg-white" },
      { name: "Facebook", icon: <FaFacebook className="text-[#1877F2]" />, href: "https://www.facebook.com/sanjit.mangrati.92/", bg: "bg-white" },
      // { name: "Instagram", icon: <FaInstagram className="text-[#E1306C]" />, href: "https://instagram.com/yourusername", bg: "bg-white" },
      { name: "Upwork", icon: <SiUpwork className="text-[#6fda44]" />, href: "https://www.upwork.com/freelancers/~018cd45dd166ce3cf8?mp_source=share", bg: "bg-white" },
      { name: "Fiverr", icon: <SiFiverr className="text-[#1DBF73]" />, href: "https://www.fiverr.com/yourusername", bg: "bg-white" },

       { name: "GitHub", icon: <FaGithub className="text-black" />, href: "https://github.com/ssnjitm", bg: "bg-white" },
    ].map((social, i) => (
      <a
        key={i}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        className={`flex items-center justify-center w-16 h-16 rounded-full 
                   ${social.bg} shadow-md hover:scale-110 transform transition-transform duration-300`}
      >
        <span className="text-4xl">{social.icon}</span>
      </a>
    ))}
  </div>
</div>

{/* Contact Form */}
<form
  className="contact-form space-y-4"
  onSubmit={async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    await submitMessage(payload); // Call store action

    if (!error) {
      e.target.reset(); // Clear form on success
    }
  }}
>
  <div>
    <h1 className="text-bold text-2xl mb-5 mt-16 ml-20 flex items-center dark:text-white">
      Direct Message From Mail
    </h1>
    <label
      htmlFor="name"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      required
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div>
    <label
      htmlFor="message"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      Message
    </label>
    <textarea
      id="message"
      name="message"
      rows="5"
      required
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    />
  </div>
  <button
    type="submit"
    disabled={loading}
    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
  >
    {loading ? "Sending..." : "Send Message"}
  </button>

  {/* Feedback Messages */}
  {success && (
    <p className="mt-4 p-3 bg-green-100 text-green-800 rounded dark:bg-green-900 dark:text-green-200">
      {success}
    </p>
  )}
  {error && (
    <p className="mt-4 p-3 bg-red-100 text-red-800 rounded dark:bg-red-900 dark:text-red-200">
      {error}
    </p>
  )}
</form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
