import React, { useState, useEffect } from "react";
import useContactStore from "../../store/useContactStore";

function AdminContact() {
  const {
    contactInfo,
    fetchContactInfo,
    updateContactInfo,
    loading,
    error,
    success,
  } = useContactStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    location: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
  });

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  useEffect(() => {
    if (contactInfo) {
      setForm(contactInfo);
    }
  }, [contactInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      ["github", "linkedin", "twitter", "facebook", "instagram"].includes(name)
    ) {
      setForm({
        ...form,
        socialLinks: { ...form.socialLinks, [name]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateContactInfo(form);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Contact Info</h2>

      {/* Display Contact Info in a Table-like Card */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full block md:table">
          <thead className="bg-gray-50 block md:table-header-group">
            <tr className="block md:table-row">
              <th className="p-3 text-left text-gray-700 md:table-cell">Email</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Phone</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Location</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Social Links</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {contactInfo ? (
              <tr className="border-b hover:bg-gray-50 block md:table-row">
                <td className="p-3 md:table-cell">{contactInfo.email || "-"}</td>
                <td className="p-3 md:table-cell">{contactInfo.phone || "-"}</td>
                <td className="p-3 md:table-cell">{contactInfo.location || "-"}</td>
                <td className="p-3 md:table-cell space-y-1">
                  {Object.entries(contactInfo.socialLinks || {}).map(
                    ([key, val]) =>
                      val && (
                        <div key={key}>
                          <span className="capitalize font-medium">{key}: </span>
                          <a
                            href={val}
                            className="text-blue-600 underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {val}
                          </a>
                        </div>
                      )
                  )}
                </td>
                <td className="p-3 md:table-cell">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No contact info added yet.
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Add Contact
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Edit Contact Info
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />

              <hr className="my-2" />
              <h4 className="text-lg font-medium">Social Links</h4>

              {["github", "linkedin", "twitter", "facebook", "instagram"].map(
                (field) => (
                  <input
                    key={field}
                    type="url"
                    name={field}
                    placeholder={`${field} url`}
                    value={form.socialLinks?.[field] || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg mb-2"
                  />
                )
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notifications */}
      {(error || success) && (
        <div className="mt-4">
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </div>
      )}
    </div>
  );
}

export default AdminContact;