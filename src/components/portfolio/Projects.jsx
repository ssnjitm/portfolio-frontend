import React, { useEffect, useState } from 'react';
import api from '../../utils/api.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await api.get('/projects');
        if (!isMounted) return;
        setProjects(data?.data || []);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="projects" className="section py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header mb-12 text-center">
          <h2 className="section-title inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
            <span className="section-number text-blue-600 mr-3 text-xl">03.</span> Projects
          </h2>
          <div className="section-line w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>
        <div className="projects-content grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading && <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">Loading projects…</p>}
          {error && !loading && <p className="text-red-600 text-center col-span-full">{error}</p>}
          {!loading && !error && projects.length === 0 && <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">No projects yet.</p>}
          {!loading && !error && projects.map((p) => (
            <div key={p._id} className="project-card bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {p.imageUrl && (
                <img src={p.imageUrl} alt={p.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              )}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{p.description}</p>
              <div className="text-sm space-x-4 mb-4">
                {p.githubLink && <a className="text-blue-600 hover:underline" href={p.githubLink} target="_blank" rel="noreferrer">GitHub</a>}
                {p.liveLink && <a className="text-blue-600 hover:underline" href={p.liveLink} target="_blank" rel="noreferrer">Live</a>}
              </div>
              {Array.isArray(p.tags) && p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t, i) => (
                    <span key={i} className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;