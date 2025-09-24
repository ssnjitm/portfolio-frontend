import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";

export default function AdminProfile() {
  const { admin, fetchProfile, updateProfile, changePassword, logout, loading, error, success } =
    useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",

  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (admin) {
      setForm({
        email: admin.email || "",
        password: admin.password || "",
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.[0]) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    await updateProfile(formData);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    await changePassword(passwords.currentPassword, passwords.newPassword);
    setPasswords({ currentPassword: "", newPassword: "" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="mb-2 border px-3 py-2 w-full" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="mb-2 border px-3 py-2 w-full" />
  

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
      </form>

      <form onSubmit={handlePasswordChange} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} placeholder="Current Password" className="border mb-2 w-full px-3 py-2" />
        <input type="password" name="newPassword" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} placeholder="New Password" className="border mb-4 w-full px-3 py-2" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update Password</button>
      </form>

      <button onClick={logout} className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">Logout</button>
    </div>
  );
}