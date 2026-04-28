import { useEffect } from "react";
import useWebContentStore from "../../store/useWebContentStore";

const About = () => {
  const { webContent, fetchWebContent, error, loading } = useWebContentStore();

  useEffect(() => { fetchWebContent(); }, [fetchWebContent]);

  if (loading) return null;
  if (error || !webContent) return null;

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
                <img
                  src={webContent.aboutMeImage}
                  alt="Sanjeet Mijar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-mono text-xs font-bold">JS</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-5 leading-relaxed">
              Hello! I'm{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Sanjeet Mijar</span>,
              a passionate full-stack developer focused on building efficient,
              scalable, and user-friendly applications.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-4 leading-relaxed">
              I enjoy tackling complex problems and turning them into simple, elegant solutions.
              My goal is to build software that not only works flawlessly but also provides an
              exceptional user experience.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-10 leading-relaxed">
              When I'm not coding, I explore new technologies, contribute to open-source,
              or share knowledge with tech communities.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "3+", label: "Years Exp.", color: "text-blue-600 dark:text-blue-400" },
                { value: "20+", label: "Projects", color: "text-purple-600 dark:text-purple-400" },
                { value: "10+", label: "Clients", color: "text-green-600 dark:text-green-400" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center shadow-sm"
                >
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
