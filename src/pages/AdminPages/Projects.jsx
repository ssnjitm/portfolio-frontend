import { useEffect, useState } from 'react';
import api from '../../utils/api.js';

const emptyForm = { title: '', description: '', githubLink: '', liveLink: '', tags: '', imageFile: null };

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/projects');
      setProjects(data?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((f) => ({ ...f, imageFile: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const toFormData = (payload) => {
    const fd = new FormData();
    if (payload.title) fd.append('title', payload.title);
    if (payload.description) fd.append('description', payload.description);
    if (payload.githubLink) fd.append('githubLink', payload.githubLink);
    if (payload.liveLink) fd.append('liveLink', payload.liveLink);
    if (typeof payload.tags === 'string') fd.append('tags', payload.tags);
    if (payload.imageFile) fd.append('imageUrl', payload.imageFile);
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const fd = toFormData(form);
      if (editingId) {
        await api.patch(`/projects/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title || '',
      description: p.description || '',
      githubLink: p.githubLink || '',
      liveLink: p.liveLink || '',
      tags: (p.tags || []).join(', '),
      imageFile: null,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Projects</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 grid gap-3 mb-6">
        <div className="grid md:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input className="border rounded px-3 py-2" name="githubLink" placeholder="GitHub link" value={form.githubLink} onChange={handleChange} required />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" name="liveLink" placeholder="Live link" value={form.liveLink} onChange={handleChange} />
          <input className="border rounded px-3 py-2" name="tags" placeholder="tags (comma separated)" value={form.tags} onChange={handleChange} />
        </div>
        <textarea className="border rounded px-3 py-2" name="description" placeholder="Description" rows={3} value={form.description} onChange={handleChange} />
        <input className="border rounded px-3 py-2" type="file" accept="image/*" onChange={handleChange} />
        <div className="flex gap-2">
          <button disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60" type="submit">
            {editingId ? (submitting ? 'Updating…' : 'Update Project') : (submitting ? 'Creating…' : 'Create Project')}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded border">Cancel</button>
          )}
        </div>
      </form>

      <div className="bg-white shadow rounded divide-y">
        {loading ? (
          <p className="p-4">Loading…</p>
        ) : projects.length === 0 ? (
          <p className="p-4">No projects yet.</p>
        ) : (
          projects.map((p) => (
            <div key={p._id} className="p-4 flex items-start gap-4">
              {p.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt={p.title} className="w-20 h-20 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{p.description}</p>
                <div className="text-sm space-x-3">
                  {p.githubLink && (
                    <a className="text-blue-600 underline" href={p.githubLink} target="_blank" rel="noreferrer">GitHub</a>
                  )}
                  {p.liveLink && (
                    <a className="text-blue-600 underline" href={p.liveLink} target="_blank" rel="noreferrer">Live</a>
                  )}
                </div>
                {Array.isArray(p.tags) && p.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((t, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(p)} className="px-3 py-1 rounded border">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="px-3 py-1 rounded border text-red-600">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsAdmin;


