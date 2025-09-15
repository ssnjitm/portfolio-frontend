import { useEffect, useState } from 'react';
import api from '../../utils/api.js';

const emptyForm = { role: '', companyName: '', description: '', from: '', to: '', current: false, imageFile: null };

const ExperienceAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/experiences');
      setItems(data?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (files) {
      setForm((f) => ({ ...f, imageFile: files[0] }));
    } else if (type === 'checkbox') {
      setForm((f) => ({ ...f, [name]: checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const toFormData = (payload) => {
    const fd = new FormData();
    if (payload.role) fd.append('role', payload.role);
    if (payload.companyName) fd.append('companyName', payload.companyName);
    if (payload.description) fd.append('description', payload.description);
    if (payload.from) fd.append('from', payload.from);
    if (payload.to) fd.append('to', payload.to);
    fd.append('current', payload.current ? 'true' : 'false');
    if (payload.imageFile) fd.append('jobThumbnail', payload.imageFile);
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const fd = toFormData(form);
      if (editingId) {
        await api.patch(`/experiences/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/experiences', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
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

  const startEdit = (it) => {
    setEditingId(it._id);
    setForm({
      role: it.role || '',
      companyName: it.companyName || '',
      description: it.description || '',
      from: it.from ? it.from.slice(0, 10) : '',
      to: it.to ? it.to.slice(0, 10) : '',
      current: !!it.current,
      imageFile: null,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await api.delete(`/experiences/${id}`);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Experience</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 grid gap-3 mb-6">
        <div className="grid md:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
          <input className="border rounded px-3 py-2" name="companyName" placeholder="Company" value={form.companyName} onChange={handleChange} />
        </div>
        <textarea className="border rounded px-3 py-2" name="description" placeholder="Description" rows={3} value={form.description} onChange={handleChange} />
        <div className="grid md:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" type="date" name="from" value={form.from} onChange={handleChange} />
          <input className="border rounded px-3 py-2" type="date" name="to" value={form.to} onChange={handleChange} disabled={form.current} />
          <label className="flex items-center gap-2"><input type="checkbox" name="current" checked={form.current} onChange={handleChange} /> Current</label>
        </div>
        <input className="border rounded px-3 py-2" type="file" accept="image/*" onChange={handleChange} />
        <div className="flex gap-2">
          <button disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60" type="submit">
            {editingId ? (submitting ? 'Updating…' : 'Update Experience') : (submitting ? 'Creating…' : 'Create Experience')}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded border">Cancel</button>
          )}
        </div>
      </form>

      <div className="bg-white shadow rounded divide-y">
        {loading ? (
          <p className="p-4">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-4">No experience yet.</p>
        ) : (
          items.map((it) => (
            <div key={it._id} className="p-4 flex items-start gap-4">
              {it.jobThumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.jobThumbnail} alt={it.role} className="w-16 h-16 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{it.role}</h3>
                <p className="text-sm text-gray-600 mb-1">{it.companyName}</p>
                <p className="text-sm text-gray-600 mb-1">
                  {it.from && new Date(it.from).toLocaleDateString()} - {it.current ? 'Present' : (it.to ? new Date(it.to).toLocaleDateString() : '—')}
                </p>
                <p className="text-sm text-gray-700">{it.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(it)} className="px-3 py-1 rounded border">Edit</button>
                <button onClick={() => handleDelete(it._id)} className="px-3 py-1 rounded border text-red-600">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceAdmin;


