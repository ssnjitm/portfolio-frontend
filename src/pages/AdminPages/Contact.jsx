import { useEffect, useState } from 'react';
import api from '../../utils/api.js';

const emptyForm = { email: '', phone: '', location: '', github: '', linkedin: '', twitter: '' };

const ContactAdmin = () => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/contact');
        const c = data?.data || {};
        setForm({
          email: c.email || '',
          phone: c.phone || '',
          location: c.location || '',
          github: c.socialLinks?.github || '',
          linkedin: c.socialLinks?.linkedin || '',
          twitter: c.socialLinks?.twitter || '',
        });
      } catch (err) {
        setError('Failed to load contact info');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await api.patch('/contact', {
        email: form.email,
        phone: form.phone,
        location: form.location,
        socialLinks: JSON.stringify({
          github: form.github,
          linkedin: form.linkedin,
          twitter: form.twitter,
        }),
      });
      setSuccess('Saved');
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Contact Info</h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 grid gap-3 max-w-2xl">
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
          <div className="grid md:grid-cols-2 gap-3">
            <input className="border rounded px-3 py-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input className="border rounded px-3 py-2" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          </div>
          <input className="border rounded px-3 py-2" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <div className="grid md:grid-cols-3 gap-3">
            <input className="border rounded px-3 py-2" name="github" placeholder="GitHub URL" value={form.github} onChange={handleChange} />
            <input className="border rounded px-3 py-2" name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} />
            <input className="border rounded px-3 py-2" name="twitter" placeholder="Twitter URL" value={form.twitter} onChange={handleChange} />
          </div>
          <button disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60" type="submit">
            {saving ? 'Saving…' : 'Save'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactAdmin;


