import React, { useEffect, useState } from 'react';
import api from '../../utils/api.js';
import LogoLoop from './LogoLoop.jsx';
// import { SiReact,  SiMongodb, SiExpress } from "react-icons/si";
// import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
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
  SiFigma
} from "react-icons/si";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await api.get('/skills');
        if (!isMounted) return;
        setSkills(data?.data || []);
      } catch (err) {
        setError('Failed to load skills');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

const techLogos = [
  { node: <SiReact className="text-[#61DBFB] " />, title: "React", href: "https://react.dev" },
  { node: <SiNodedotjs className="text-[#3C873A] " />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiExpress className="text-black " />, title: "Express.js", href: "https://expressjs.com" },
  { node: <SiMongodb className="text-[#47A248] " />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiTailwindcss className="text-[#06B6D4] " />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiBootstrap className="text-[#7952B3] " />, title: "Bootstrap", href: "https://getbootstrap.com" },
  { node: <SiPostgresql className="text-[#336791] " />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiGithub className="text-black " />, title: "GitHub", href: "https://github.com" },
  { node: <SiPython className="text-[#3776AB] " />, title: "Python", href: "https://www.python.org" },
  { node: <SiPostman className="text-[#FF6C37] " />, title: "Postman", href: "https://www.postman.com" },
  { node: <SiFigma className="text-[#F24E1E] dark:text-white" />, title: "Figma", href: "https://www.figma.com" },
];
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
            <span className="text-blue-600 mr-3 text-xl">04.</span> Skills
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading && <p className="col-span-full text-center text-gray-600 dark:text-gray-400">Loading skills…</p>}
          {error && !loading && <p className="col-span-full text-center text-red-600">{error}</p>}
          {!loading && !error && skills.length === 0 && <p className="col-span-full text-center text-gray-600 dark:text-gray-400">No skills yet.</p>}
          {!loading && !error && skills.map((skill) => (
            <div key={skill._id} className="flex flex-col items-center text-center bg-white dark:bg-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600">
              {skill.imageUrl && (
                <img alt={skill.name} className="w-20 h-20 object-cover rounded-lg mb-3" src={skill.imageUrl} />
              )}


              <div className="flex flex-col items-center">
                <h4 className="font-medium text-gray-800 dark:text-white">{skill.name}</h4>
                {skill.category && <p className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</p>}
                {skill.level && <p className="text-xs text-gray-500 dark:text-gray-400">{skill.level}</p>}
              </div>
            </div>
          ))}
        </div> */}
     
                <LogoLoop
                logos={techLogos}
                interval={2000}
                speed={100}
                logoHeight={48}
                className="w-20 h-20 mb-3"
                style={{ borderRadius: '0.5rem' }}
              />
        <div className="mt-8 flex justify-center">
          {/* <div className="relative w-48 h-48 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            <img
              alt="Explore my skills"
              className="w-full h-full object-cover"
              src="https://heroui.com/images/hero-card.jpeg"
            />
            <div className="absolute bottom-1 left-1 right-1 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-lg p-2 flex justify-between items-center">
              <p className="text-xs text-white/80">Explore my skills.</p>
              <button className="text-xs text-white bg-black/20 px-3 py-1 rounded-lg hover:bg-black/30 transition-colors duration-200">
                Notify me
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Skills;