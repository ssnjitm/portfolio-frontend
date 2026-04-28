import { useEffect } from "react";
import useSkillStore from "../../store/useSkillStore.js";
import LogoLoop from "./LogoLoop.jsx";
import { FaLaptopCode, FaMobileAlt, FaCode, FaPaintBrush, FaBullhorn, FaMobile } from "react-icons/fa";
import {
  SiReact, SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress,
  SiMongodb, SiPostgresql, SiGithub, SiPython, SiPostman, SiFigma,
} from "react-icons/si";
import { FaFlutter } from "react-icons/fa6";

const SERVICES = [
  { title: "Web Development",    desc: "Building modern, responsive websites and web apps with cutting-edge technologies.", icon: <FaLaptopCode />, color: "text-blue-500" },
  { title: "Full-Stack Solutions",desc: "End-to-end development from database design to frontend implementation.",           icon: <FaCode />,       color: "text-purple-500" },
  { title: "API Development",    desc: "Creating robust and scalable RESTful APIs for seamless integration.",               icon: <FaMobileAlt />,  color: "text-green-500" },
  { title: "UI/UX Design",       desc: "Crafting intuitive and visually appealing user interfaces.",                        icon: <FaPaintBrush />, color: "text-pink-500" },
  { title: "Mobile Apps",        desc: "Cross-platform mobile apps with Flutter for Android and iOS.",                      icon: <FaMobile />,     color: "text-cyan-500" },
  { title: "Consulting",         desc: "Technical guidance and architecture planning for your projects.",                   icon: <FaBullhorn />,   color: "text-amber-500" },
];

const Skills = () => {
  const { fetchSkills } = useSkillStore();

  useEffect(() => { fetchSkills(); }, [fetchSkills]);

  const techLogos = [
    { node: <SiReact className="text-[#61DBFB]" />,      title: "React",       href: "https://react.dev" },
    { node: <SiNodedotjs className="text-[#3C873A]" />,  title: "Node.js",     href: "https://nodejs.org" },
    { node: <SiExpress className="text-gray-700 dark:text-gray-300" />, title: "Express.js", href: "https://expressjs.com" },
    { node: <SiMongodb className="text-[#47A248]" />,    title: "MongoDB",     href: "https://www.mongodb.com" },
    { node: <SiTailwindcss className="text-[#06B6D4]" />,title: "Tailwind",    href: "https://tailwindcss.com" },
    { node: <SiBootstrap className="text-[#7952B3]" />,  title: "Bootstrap",   href: "https://getbootstrap.com" },
    { node: <SiPostgresql className="text-[#336791]" />, title: "PostgreSQL",  href: "https://www.postgresql.org" },
    { node: <SiGithub className="text-gray-800 dark:text-white" />, title: "GitHub", href: "https://github.com" },
    { node: <SiPython className="text-[#3776AB]" />,     title: "Python",      href: "https://www.python.org" },
    { node: <SiPostman className="text-[#FF6C37]" />,    title: "Postman",     href: "https://www.postman.com" },
    { node: <SiFigma className="text-[#F24E1E]" />,      title: "Figma",       href: "https://www.figma.com" },
    { node: <FaFlutter className="text-[#54C5F8]" />,    title: "Flutter",     href: "https://flutter.dev" },
  ];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Technologies I work with to build modern, scalable applications
          </p>
        </div>

        {/* Logo Loop */}
        <LogoLoop
          logos={techLogos}
          interval={2000}
          speed={100}
          logoHeight={48}
          className="w-20 h-20 mb-3"
          style={{ borderRadius: "0.5rem" }}
        />

        {/* Services */}
        <div className="mt-20">
          <h3 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-12">What I Do</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 flex items-center justify-center mb-4 rounded-xl bg-white dark:bg-gray-700 shadow-sm group-hover:scale-110 transition-transform duration-300 text-2xl ${service.color}`}>
                  {service.icon}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
