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
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title"><span className="section-number">03.</span> Projects</h2>
          <div className="section-line"></div>
        </div>
        <div className="projects-content grid gap-6 md:grid-cols-2">
          {loading && <p>Loading projects…</p>}
          {error && !loading && <p className="text-red-600">{error}</p>}
          {!loading && !error && projects.length === 0 && <p>No projects yet.</p>}
          {!loading && !error && projects.map((p) => (
            <div key={p._id} className="project-card border rounded p-4">
              {p.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt={p.title} className="w-full h-40 object-cover rounded mb-3" />
              )}
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{p.description}</p>
              <div className="text-sm space-x-3 mb-2">
                {p.githubLink && <a className="text-blue-600 underline" href={p.githubLink} target="_blank" rel="noreferrer">GitHub</a>}
                {p.liveLink && <a className="text-blue-600 underline" href={p.liveLink} target="_blank" rel="noreferrer">Live</a>}
              </div>
              {Array.isArray(p.tags) && p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>
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
