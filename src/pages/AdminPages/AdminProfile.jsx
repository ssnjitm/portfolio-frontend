import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";

export default function AdminProfile() {
  const { admin, fetchProfile, updateProfile, changePassword, loading, error } =
    useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
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
        fullName: admin.fullName || "",
        email: admin.email || "",
        phone: admin.phone || "",
        location: admin.location || "",
      });
    }
  }, [admin]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(form);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const success = await changePassword(
      passwords.currentPassword,
      passwords.newPassword
    );
    if (success) setPasswords({ currentPassword: "", newPassword: "" });
  };

  if (loading && !admin) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Profile Update Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>

      {/* Change Password Form */}
      <form
        onSubmit={handlePasswordChange}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
