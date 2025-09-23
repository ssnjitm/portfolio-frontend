import React, { useState, useEffect } from "react";
import useExperienceStore from "../../store/useExperienceStore";

function AdminExperience() {
  const {
    experiences,
    fetchExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
    loading,
    error,
    success,
  } = useExperienceStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    role: "",
    companyName: "",
    description: "",
    from: "",
    to: "",
    current: false,
    jobThumbnail: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExperiences();
    // eslint-disable-next-line
  }, []);

  const openModal = (exp = null) => {
    if (exp) {
      setForm({
        role: exp.role || "",
        companyName: exp.companyName || "",
        description: exp.description || "",
        from: exp.from ? exp.from.substring(0, 10) : "",
        to: exp.to ? exp.to.substring(0, 10) : "",
        current: exp.current || false,
        jobThumbnail: null,
      });
      setEditingId(exp._id);
    } else {
      setForm({
        role: "",
        companyName: "",
        description: "",
        from: "",
        to: "",
        current: false,
        jobThumbnail: null,
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (name === "jobThumbnail") {
      setForm({ ...form, jobThumbnail: files?.[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("role", form.role);
    formData.append("companyName", form.companyName);
    formData.append("description", form.description);
    formData.append("from", form.from);
    formData.append("to", form.to);
    formData.append("current", form.current);

    if (form.jobThumbnail) {
      formData.append("jobThumbnail", form.jobThumbnail);
    }

    if (editingId) {
      await updateExperience(editingId, formData);
    } else {
      await addExperience(formData);
    }
    closeModal();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Experience</h2>

      {/* Add Button */}
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
      >
        + Add Experience
      </button>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full block md:table">
          <thead className="bg-gray-50 block md:table-header-group">
            <tr className="block md:table-row">
              <th className="p-3 text-left text-gray-700 md:table-cell">Logo</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Role</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Company</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Period</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {Array.isArray(experiences) && experiences.length > 0 ? (
              experiences.map((exp) => (
                <tr
                  key={exp._id}
                  className="border-b hover:bg-gray-50 block md:table-row"
                >
                  <td className="p-3 md:table-cell text-center">
                    {exp.jobThumbnail ? (
                      <img
                        src={exp.jobThumbnail}
                        alt={exp.companyName}
                        className="w-10 h-10 mx-auto rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Logo</span>
                    )}
                  </td>
                  <td className="p-3 md:table-cell">{exp.role}</td>
                  <td className="p-3 md:table-cell">{exp.companyName}</td>
                  <td className="p-3 md:table-cell">
                    {exp.from
                      ? new Date(exp.from).toLocaleDateString()
                      : "-"}{" "}
                    →{" "}
                    {exp.current
                      ? "Present"
                      : exp.to
                      ? new Date(exp.to).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-3 md:table-cell space-x-2">
                    <button
                      onClick={() => openModal(exp)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteExperience(exp._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No experiences added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {editingId ? "Edit Experience" : "Add New Experience"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <textarea
                name="description"
                rows={3}
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">From</label>
                  <input
                    type="date"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">To</label>
                  <input
                    type="date"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                    disabled={form.current}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="current"
                  checked={form.current}
                  onChange={handleChange}
                />
                <span>Currently working here</span>
              </label>
              <label className="block text-sm font-medium">Company Logo</label>
              <input
                type="file"
                name="jobThumbnail"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-50"
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingId ? "Update" : "Add"}
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

export default AdminExperience;