// src/components/sections/Skills.jsx
import React, { useEffect } from "react";
import useSkillStore from "../../store/useSkillStore.js";
import LogoLoop from "./LogoLoop.jsx";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaCode,
  FaPaintBrush,
  FaEye,
  FaBullhorn,
  FaMobile,
} from "react-icons/fa";

import {
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGithub,
  SiPython,
  SiPostman,
  SiFigma,
} from "react-icons/si";

const Skills = () => {
  const { skills, loading, error, fetchSkills } = useSkillStore();

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const techLogos = [
    { node: <SiReact className="text-[#61DBFB]" />, title: "React", href: "https://react.dev" },
    { node: <SiNodedotjs className="text-[#3C873A]" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiExpress className="text-black" />, title: "Express.js", href: "https://expressjs.com" },
    { node: <SiMongodb className="text-[#47A248]" />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiBootstrap className="text-[#7952B3]" />, title: "Bootstrap", href: "https://getbootstrap.com" },
    { node: <SiPostgresql className="text-[#336791]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiGithub className="text-black" />, title: "GitHub", href: "https://github.com" },
    { node: <SiPython className="text-[#3776AB]" />, title: "Python", href: "https://www.python.org" },
    { node: <SiPostman className="text-[#FF6C37]" />, title: "Postman", href: "https://www.postman.com" },
    { node: <SiFigma className="text-[#F24E1E] dark:text-white" />, title: "Figma", href: "https://www.figma.com" },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
            Skills
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>

        {/* Dynamic Skills Grid
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading && (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
              Loading skills…
            </p>
          )}
          {error && !loading && (
            <p className="col-span-full text-center text-red-600">{error}</p>
          )}
          {!loading && !error && skills.length === 0 && (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
              No skills yet.
            </p>
          )}
          {!loading &&
            !error &&
            skills.map((skill) => (
              <div
                key={skill._id}
                className="flex flex-col items-center text-center bg-white dark:bg-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600"
              >
                {skill.imageUrl && (
                  <img
                    alt={skill.name}
                    className="w-20 h-20 object-cover rounded-lg mb-3"
                    src={skill.imageUrl}
                  />
                )}
                <div className="flex flex-col items-center">
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {skill.name}
                  </h4>
                  {skill.category && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {skill.category}
                    </p>
                  )}
                  {skill.level && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {skill.level}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div> */}

        {/* Logo Loop */}
        <LogoLoop
          logos={techLogos}
          interval={2000}
          speed={100}
          logoHeight={48}
          className="w-20 h-20 mb-3"
          style={{ borderRadius: "0.5rem" }}
        />

        {/* Services Section */}
        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-10">
            Services Provided By Me
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Web Design",
                desc: "Crafting visually appealing and user-friendly websites.",
                icon: <FaLaptopCode className="text-blue-600 text-2xl" />,
              },
              {
                title: "Fully Responsive",
                desc: "Ensuring seamless experiences on all devices.",
                icon: <FaMobileAlt className="text-blue-600 text-2xl" />,
              },
              {
                title: "Development",
                desc: "Building robust, scalable, and secure applications.",
                icon: <FaCode className="text-blue-600 text-2xl" />,
              },
              {
                title: "Creative Design",
                desc: "Designs that blend creativity with functionality.",
                icon: <FaPaintBrush className="text-blue-600 text-2xl" />,
              },
              {
                title: "Android & iOS App Development",
                desc: "Cross-platform mobile apps with Flutter for Android and iOS.",
                icon: <FaMobile className="text-blue-600 text-2xl" />,
              },
              {
                title: "Branding",
                desc: "Helping brands stand out with strong digital presence.",
                icon: <FaBullhorn className="text-blue-600 text-2xl" />,
              },
            ].map((service, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-full bg-blue-100 dark:bg-blue-900">
                  {service.icon}
                </div>
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
