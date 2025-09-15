import { useEffect, useState } from 'react';
import api from '../../utils/api.js';

const emptyForm = { name: '', category: '', level: 'Intermediate', imageFile: null };

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/skills');
      setSkills(data?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load skills');
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
    if (payload.name) fd.append('name', payload.name);
    if (payload.category) fd.append('category', payload.category);
    if (payload.level) fd.append('level', payload.level);
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
        await api.patch(`/skills/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/skills', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
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

  const startEdit = (s) => {
    setEditingId(s._id);
    setForm({
      name: s.name || '',
      category: s.category || '',
      level: s.level || 'Intermediate',
      imageFile: null,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}`);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Skills</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 grid gap-3 mb-6">
        <div className="grid md:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input className="border rounded px-3 py-2" name="category" placeholder="Category (e.g., Frontend)" value={form.category} onChange={handleChange} />
          <select className="border rounded px-3 py-2" name="level" value={form.level} onChange={handleChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <input className="border rounded px-3 py-2" type="file" accept="image/*" onChange={handleChange} />
        <div className="flex gap-2">
          <button disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60" type="submit">
            {editingId ? (submitting ? 'Updating…' : 'Update Skill') : (submitting ? 'Creating…' : 'Create Skill')}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded border">Cancel</button>
          )}
        </div>
      </form>

      <div className="bg-white shadow rounded divide-y">
        {loading ? (
          <p className="p-4">Loading…</p>
        ) : skills.length === 0 ? (
          <p className="p-4">No skills yet.</p>
        ) : (
          skills.map((s) => (
            <div key={s._id} className="p-4 flex items-center gap-4">
              {s.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.imageUrl} alt={s.name} className="w-14 h-14 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.category} {s.level && `• ${s.level}`}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(s)} className="px-3 py-1 rounded border">Edit</button>
                <button onClick={() => handleDelete(s._id)} className="px-3 py-1 rounded border text-red-600">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsAdmin;


