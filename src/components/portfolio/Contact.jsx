import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section py-20 bg-white dark:bg-gray-900">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header mb-12 text-center">
          <h2 className="section-title inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
            <span className="section-number text-blue-600 mr-3 text-xl">05.</span> Contact
          </h2>
          <div className="section-line w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>
        <div className="contact-content max-w-md mx-auto">
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 text-lg">
            Feel free to reach out for collaborations, project inquiries, or just to say hello!
          </p>
          <form className="contact-form space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" id="email" name="email" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea id="message" name="message" rows="5" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;