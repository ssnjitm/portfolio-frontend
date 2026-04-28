import { useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
  SiBootstrap, SiPython, SiTypescript, SiJavascript, SiHtml5,
  SiCss3, SiFirebase, SiVercel, SiNetlify, SiPostgresql,
} from "react-icons/si";
import { FaFlutter } from "react-icons/fa6";
import useProjectStore from "../../store/useProjectStore.js";

const TECH_MAP = {
  react:         { icon: <SiReact />,        light: "bg-cyan-50 text-cyan-700 border-cyan-200",        dark: "dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20" },
  "react.js":    { icon: <SiReact />,        light: "bg-cyan-50 text-cyan-700 border-cyan-200",        dark: "dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20" },
  node:          { icon: <SiNodedotjs />,    light: "bg-green-50 text-green-700 border-green-200",     dark: "dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20" },
  "node.js":     { icon: <SiNodedotjs />,    light: "bg-green-50 text-green-700 border-green-200",     dark: "dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20" },
  express:       { icon: <SiExpress />,      light: "bg-gray-100 text-gray-700 border-gray-300",       dark: "dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600" },
  "express.js":  { icon: <SiExpress />,      light: "bg-gray-100 text-gray-700 border-gray-300",       dark: "dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600" },
  mongodb:       { icon: <SiMongodb />,      light: "bg-green-50 text-green-700 border-green-200",     dark: "dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20" },
  mongo:         { icon: <SiMongodb />,      light: "bg-green-50 text-green-700 border-green-200",     dark: "dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20" },
  tailwind:      { icon: <SiTailwindcss />,  light: "bg-cyan-50 text-cyan-700 border-cyan-200",        dark: "dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20" },
  "tailwind css":{ icon: <SiTailwindcss />,  light: "bg-cyan-50 text-cyan-700 border-cyan-200",        dark: "dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20" },
  bootstrap:     { icon: <SiBootstrap />,    light: "bg-purple-50 text-purple-700 border-purple-200",  dark: "dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20" },
  python:        { icon: <SiPython />,       light: "bg-yellow-50 text-yellow-700 border-yellow-200",  dark: "dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20" },
  typescript:    { icon: <SiTypescript />,   light: "bg-blue-50 text-blue-700 border-blue-200",        dark: "dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20" },
  javascript:    { icon: <SiJavascript />,   light: "bg-yellow-50 text-yellow-700 border-yellow-200",  dark: "dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20" },
  js:            { icon: <SiJavascript />,   light: "bg-yellow-50 text-yellow-700 border-yellow-200",  dark: "dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20" },
  html:          { icon: <SiHtml5 />,        light: "bg-orange-50 text-orange-700 border-orange-200",  dark: "dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20" },
  html5:         { icon: <SiHtml5 />,        light: "bg-orange-50 text-orange-700 border-orange-200",  dark: "dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20" },
  css:           { icon: <SiCss3 />,         light: "bg-blue-50 text-blue-700 border-blue-200",        dark: "dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20" },
  css3:          { icon: <SiCss3 />,         light: "bg-blue-50 text-blue-700 border-blue-200",        dark: "dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20" },
  firebase:      { icon: <SiFirebase />,     light: "bg-amber-50 text-amber-700 border-amber-200",     dark: "dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" },
  vercel:        { icon: <SiVercel />,       light: "bg-gray-100 text-gray-700 border-gray-300",       dark: "dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600" },
  netlify:       { icon: <SiNetlify />,      light: "bg-teal-50 text-teal-700 border-teal-200",        dark: "dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20" },
  postgresql:    { icon: <SiPostgresql />,   light: "bg-blue-50 text-blue-700 border-blue-200",        dark: "dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20" },
  flutter:       { icon: <FaFlutter />,      light: "bg-sky-50 text-sky-700 border-sky-200",           dark: "dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20" },
};

const DEFAULT_BADGE = {
  icon: <FaCode />,
  light: "bg-blue-50 text-blue-700 border-blue-200",
  dark: "dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
};

function TechBadge({ tech }) {
  const entry = TECH_MAP[tech.toLowerCase()] || DEFAULT_BADGE;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg font-medium border ${entry.light} ${entry.dark}`}>
      <span className="text-sm leading-none">{entry.icon}</span>
      {tech}
    </span>
  );
}

// handles both field names (techstack = new, teckstack = old typo) and string/array
function parseTechstack(p) {
  const raw = p.techstack ?? p.teckstack;
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === "string" && raw.trim())
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

const Projects = () => {
  const { fetchProjects, projects, error, loading } = useProjectStore();

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  return (
    <section
      id="projects"
      className="section py-24 bg-slate-100 dark:bg-gray-950 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in building modern, scalable applications
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading && (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ))
          )}
          {error && !loading && (
            <p className="text-red-500 dark:text-red-400 text-center col-span-full font-mono">Error: {error}</p>
          )}
          {!loading && !error && projects.length === 0 && (
            <p className="text-center text-gray-400 dark:text-gray-500 col-span-full font-mono">// No projects to display yet</p>
          )}

          {!loading && !error && projects.map((p) => {
            const techItems = parseTechstack(p);
            return (
              <div
                key={p._id}
                className="group relative flex flex-col bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Image */}
                {p.imageUrl && (
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-mono text-blue-400 border border-blue-500/30">
                        {p.category || "Web App"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col relative z-10">
                  {/* Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-500 dark:text-green-400 font-mono text-sm">➜</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Tech Stack Badges */}
                  {techItems.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mb-2">// tech stack</p>
                      <div className="flex flex-wrap gap-2">
                        {techItems.map((t, i) => <TechBadge key={i} tech={t} />)}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="mt-auto flex gap-3">
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-800 dark:text-white px-4 py-2.5 rounded-lg text-sm font-mono transition-all duration-300 group/btn"
                      >
                        <FaGithub className="text-lg" />
                        <span className="text-gray-500 dark:text-gray-400 group-hover/btn:text-gray-800 dark:group-hover/btn:text-white">GitHub</span>
                        <span className="text-green-500 dark:text-green-400 opacity-0 group-hover/btn:opacity-100 transition-opacity">↗</span>
                      </a>
                    )}
                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 group/btn"
                      >
                        <FaExternalLinkAlt className="text-sm" />
                        Live Demo
                        <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity">↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-px h-8 bg-gradient-to-t from-blue-500 to-transparent" />
                  <div className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-blue-500 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 dark:text-gray-500 font-mono text-sm">// more projects coming soon</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
