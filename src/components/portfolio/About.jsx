
const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-14 md:gap-20">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-8 md:mb-0">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-500/20 bg-gray-100 dark:bg-gray-800 transition-shadow duration-300 hover:shadow-2xl">
              {/* Replace src with your image path */}
              <img
                src="/profile.jpg"
                alt="Your Name"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* About Content */}
          <div className="flex-1 w-full">
            <div className="flex items-center mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg mr-2">01.</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mr-4">
                About Me
              </h2>
              <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="space-y-5 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Hello! I'm{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  John Doe
                </span>
                , a passionate full-stack developer focused on building efficient, scalable, and user-friendly applications.
              </p>
              <p>
                I enjoy tackling complex problems and turning them into simple, elegant solutions. My goal is to build software that not only works flawlessly but also provides an exceptional user experience.
              </p>
              <p>
                When I'm not coding, I explore new technologies, contribute to open-source, or share knowledge with tech communities.
              </p>
              <ul className="mt-6 space-y-1 text-base">
                <li>
                  <span className="font-semibold">🌍 Location:</span>{" "}
                  <span className="text-gray-900 dark:text-gray-100">Your City, Country</span>
                </li>
                <li>
                  <span className="font-semibold">📧 Email:</span>{" "}
                  <a
                    href="mailto:your.email@example.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    your.email@example.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold">🔗 LinkedIn:</span>{" "}
                  <a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    linkedin.com/in/yourprofile
                  </a>
                </li>
              </ul>
              <div className="mt-7">
                <span className="font-semibold">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
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
                      className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {/* Add more skills as needed */}
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