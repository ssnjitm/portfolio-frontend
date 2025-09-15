
const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">02.</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </div>
        <div className="about-content">
          <div className="about-grid">
            {/* Profile Image */}
            <div className="profile-image-container">
              <div className="profile-image">
                <img
                  src="/profile.jpg"
                  alt="Sanjeet Mijar"
                  className="profile-img"
                />
              </div>
            </div>
            {/* About Content */}
            <div className="about-text">
              <p className="about-intro">
                Hello! I'm{" "}
                <span className="highlight-name">
                  Sanjeet Mijar
                </span>
                , a passionate full-stack developer focused on building efficient, scalable, and user-friendly applications.
              </p>
              <p className="about-description">
                I enjoy tackling complex problems and turning them into simple, elegant solutions. My goal is to build software that not only works flawlessly but also provides an exceptional user experience.
              </p>
              <p className="about-description">
                When I'm not coding, I explore new technologies, contribute to open-source, or share knowledge with tech communities.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">🌍 Location:</span>
                  <span className="contact-value">Bagdol, Lalitpur</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">📧 Email:</span>
                  <a
                    href="mailto:sanjeet.mijar@example.com"
                    className="contact-link"
                  >
                    sanjeet.mijar@example.com
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">🔗 LinkedIn:</span>
                  <a
                    href="https://linkedin.com/in/sanjeetmijar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    linkedin.com/in/sanjeetmijar
                  </a>
                </div>
              </div>
              <div className="skills-section">
                <span className="skills-label">Skills:</span>
                <div className="skills-container">
                  {[
                    "JavaScript",
                    "React",
                    "Node.js",
                    "TypeScript",
                    "Python",
                    "SQL",
                    "Docker",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag"
                    >
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