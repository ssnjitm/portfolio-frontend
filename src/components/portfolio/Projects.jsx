import React, { useEffect } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import useProjectStore from "../../store/useProjectStore.js";

const Projects = () => {
  const { fetchProjects, projects, error, loading } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section
      id="projects"
      className="section py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header mb-12 text-center">
          <h2 className="inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
            Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {loading && (
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
              Loading projects…
            </p>
          )}
          {error && !loading && (
            <p className="text-red-600 text-center col-span-full">{error}</p>
          )}
          {!loading && !error && projects.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
              No projects yet.
            </p>
          )}

          {!loading &&
            !error &&
            projects.map((p) => (
              <div
                key={p._id}
                className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Project Image */}
                {p.imageUrl && (
                  <div className="overflow-hidden relative">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Tech Stack */}
                  {Array.isArray(p.teckstack) && p.teckstack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.teckstack.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="mt-auto flex gap-4">
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-gray-800 text-white dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <FaExternalLinkAlt /> Live Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
