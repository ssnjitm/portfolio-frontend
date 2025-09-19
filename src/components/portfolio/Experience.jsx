import { useEffect, useState } from 'react';
import api from '../../utils/api.js';

export default function ExperienceSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await api.get('/experiences');
        if (!isMounted) return;
        setItems(data?.data || []);
      } catch (err) {
        setError('Failed to load experience');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
            <span className="text-blue-600 mr-3 text-xl">01.</span> Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>
        <div className="space-y-8">
          {loading && <p className="text-center text-gray-600 dark:text-gray-400">Loading experience…</p>}
          {error && !loading && <p className="text-red-600 text-center">{error}</p>}
          {!loading && !error && items.length === 0 && <p className="text-center text-gray-600 dark:text-gray-400">No experience yet.</p>}
          {!loading && !error && items.map((exp) => (
            <div key={exp._id} className="experience-item">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                {exp.role} <span className="text-blue-600">@ {exp.companyName}</span>
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {exp.from ? new Date(exp.from).toLocaleDateString() : ''} - {exp.current ? 'Present' : (exp.to ? new Date(exp.to).toLocaleDateString() : '—')}
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}