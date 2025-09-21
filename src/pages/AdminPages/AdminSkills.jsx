import React, { useState, useEffect } from "react";
import useSkillStore from "../../store/useSkillStore";

function AdminSkill() {
  const {
    skills,
    fetchSkills,
    addSkill,
    updateSkill,
    deleteSkill,
    loading,
    error,
    success,
  } = useSkillStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "Beginner",
    icon: null, // actual File
    experience: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all skills on component mount
  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line
  }, []);

  // Open modal either in add mode or edit mode
  const openModal = (skill = null) => {
    if (skill) {
      setForm({
        title: skill.title || "",
        description: skill.description || "",
        level: skill.level || "Beginner",
        iconUrl: skill.iconUrl || null,
        experience: skill.experience || "",
      });
      setEditingId(skill._id);
    } else {
      setForm({
        title: "",
        description: "",
        level: "Beginner",
        iconUrl: null,
        experience: "",
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setForm({
      title: "",
      description: "",
      level: "Beginner",
      iconUrl: null,
      experience: "",
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  // Input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "iconUrl") {
      setForm({ ...form, iconUrl: files?.[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("level", form.level);
    formData.append("experience", form.experience);

    if (form.image) {
      formData.append("image", form.image); // must match backend multer.single("image")
    }

    if (editingId) {
      await updateSkill(editingId, formData);
    } else {
      await addSkill(formData);
    }
    closeModal(); // Optional → close modal on submit
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Skills</h2>

      {/* Add Button */}
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
      >
        + Add Skill
      </button>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full block md:table">
          <thead className="bg-gray-50 block md:table-header-group">
            <tr className="block md:table-row">
              <th className="p-3 text-left text-gray-700 md:table-cell">Icon</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Title</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Level</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Experience</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {Array.isArray(skills) && skills.length > 0 ? (
              skills.map((skill) => (
                <tr
                  key={skill._id}
                  className="border-b hover:bg-gray-50 block md:table-row"
                >
                  <td className="p-3 md:table-cell text-center">
                    {skill.iconUrl ? (
                      <img
                        src={skill.iconUrl}
                        alt={skill.title}
                        className="w-8 h-8 mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Icon</span>
                    )}
                  </td>
                  <td className="p-3 md:table-cell">{skill.title}</td>
                  <td className="p-3 md:table-cell">{skill.level}</td>
                  <td className="p-3 md:table-cell">{skill.experience}</td>
                  <td className="p-3 md:table-cell space-x-2">
                    <button
                      onClick={() => openModal(skill)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSkill(skill._id)}
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
                  No skills added yet.
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
              {editingId ? "Edit Skill" : "Add New Skill"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Skill Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Skill Level</label>
                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Skill Icon</label>
                <input
                  type="file"
                  name="iconUrl"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Experience Period
                </label>
                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="e.g. 2 years"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

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
          {error && (
            <div className="px-4 py-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded">
              {success}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminSkill;