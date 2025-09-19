const About = () => {
  return (
    <section id="about" className="section py-20 bg-white dark:bg-gray-900">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header mb-12 text-center">
          <h2 className="section-title inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
            <span className="section-number text-blue-600 mr-3 text-xl">02.</span> About Me
          </h2>
          <div className="section-line w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>
        <div className="about-content">
          <div className="about-grid grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="profile-image-container flex justify-center md:justify-end">
              <div className="profile-image w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-blue-600/20">
                <img
                  src="/profile.jpg"
                  alt="Sanjeet Mijar"
                  className="profile-img w-full h-full object-cover"
                />
              </div>
            </div>
            {/* About Content */}
            <div className="about-text">
              <p className="about-intro text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                Hello! I'm{' '}
                <span className="highlight-name text-blue-600 font-semibold">Sanjeet Mijar</span>
                , a passionate full-stack developer focused on building efficient, scalable, and user-friendly applications.
              </p>
              <p className="about-description text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                I enjoy tackling complex problems and turning them into simple, elegant solutions. My goal is to build software that not only works flawlessly but also provides an exceptional user experience.
              </p>
              <p className="about-description text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                When I'm not coding, I explore new technologies, contribute to open-source, or share knowledge with tech communities.
              </p>
              <div className="contact-info space-y-4 mb-8">
                <div className="contact-item flex items-center">
                  <span className="contact-label text-gray-500 dark:text-gray-400 w-16">🌍 Location:</span>
                  <span className="contact-value text-gray-700 dark:text-gray-300">Bagdol, Lalitpur</span>
                </div>
                <div className="contact-item flex items-center">
                  <span className="contact-label text-gray-500 dark:text-gray-400 w-16">📧 Email:</span>
                  <a href="mailto:sanjeet.mijar@example.com" className="contact-link text-blue-600 hover:underline">
                    sanjeet.mijar@example.com
                  </a>
                </div>
                <div className="contact-item flex items-center">
                  <span className="contact-label text-gray-500 dark:text-gray-400 w-16">🔗 LinkedIn:</span>
                  <a href="https://linkedin.com/in/sanjeetmijar" target="_blank" rel="noopener noreferrer" className="contact-link text-blue-600 hover:underline">
                    linkedin.com/in/sanjeetmijar
                  </a>
                </div>
              </div>
              <div className="skills-section">
                <span className="skills-label text-gray-700 dark:text-gray-300 font-semibold block mb-3">Skills:</span>
                <div className="skills-container flex flex-wrap gap-2">
                  {[
                    "JavaScript", "React", "Node.js", "TypeScript", "Python", "SQL", "Docker",
                  ].map((skill) => (
                    <span key={skill} className="skill-tag inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;