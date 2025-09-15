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
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <span className="section-number">01.</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line"></div>
        </div>
        <div>
          {loading && <p>Loading experience…</p>}
          {error && !loading && <p className="text-red-600">{error}</p>}
          {!loading && !error && items.length === 0 && <p>No experience yet.</p>}
          {!loading && !error && items.map((exp) => (
            <div key={exp._id} className="experience-item" style={{marginBottom: "2rem"}}>
              <h3 style={{marginBottom: "0.25rem"}}>
                {exp.role} <span style={{color: "var(--accent-primary)"}}>@ {exp.companyName}</span>
              </h3>
              <div style={{color: "var(--text-tertiary)", fontSize: "0.95rem", marginBottom: "0.5rem"}}>
                {exp.from ? new Date(exp.from).toLocaleDateString() : ''} - {exp.current ? 'Present' : (exp.to ? new Date(exp.to).toLocaleDateString() : '—')}
              </div>
              <p style={{color: "var(--text-secondary)"}}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}