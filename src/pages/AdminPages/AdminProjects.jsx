import React, { useState, useEffect } from "react";
import useProjectStore from "../../store/useProjectStore"; // will be similar to skill store

function AdminProjects() {
  const {
    projects,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    loading,
    error,
    success,
  } = useProjectStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    projectUrl: "",
    repoUrl: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openModal = (project = null) => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        techStack: project.techStack || "",
        projectUrl: project.projectUrl || "",
        repoUrl: project.repoUrl || "",
        image: null, // cannot prefill File input
      });
      setEditingId(project._id);
    } else {
      setForm({
        title: "",
        description: "",
        techStack: "",
        liveLink: "",
        githubLink: "",
        image: null,
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setForm({
      title: "",
      description: "",
      techStack: "",
      liveLink: "",
      githubLink: "",
      image: null,
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files?.[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("techStack", form.techStack);
    formData.append("projectUrl", form.projectUrl);
    formData.append("githubLink", form.githubLink);  // ✅ matches schema
    formData.append("liveLink", form.liveLink); 

    if (form.image) formData.append("image", form.image);

    if (editingId) {
      await updateProject(editingId, formData);
    } else {
      await addProject(formData);
    }
    closeModal();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Projects</h2>

      {/* Add Button */}
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
      >
        + Add Project
      </button>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full block md:table">
          <thead className="bg-gray-50 block md:table-header-group">
            <tr className="block md:table-row">
              <th className="p-3 text-left text-gray-700 md:table-cell">Image</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Title</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Tech Stack</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Links</th>
              <th className="p-3 text-left text-gray-700 md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((proj) => (
                <tr
                  key={proj._id}
                  className="border-b hover:bg-gray-50 block md:table-row"
                >
                  <td className="p-3 md:table-cell text-center">
                    {proj.imageUrl ? (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="p-3 md:table-cell">{proj.title}</td>
                  <td className="p-3 md:table-cell">{proj.techStack}</td>
                  <td className="p-3 md:table-cell">
                    {proj.projectUrl && (
                      <a
                        href={proj.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline mr-2"
                      >
                        Live
                      </a>
                    )}
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-700 underline"
                      >
                        Repo
                      </a>
                    )}
                  </td>
                  <td className="p-3 md:table-cell space-x-2">
                    <button
                      onClick={() => openModal(proj)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(proj._id)}
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
                  No projects added yet.
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
              {editingId ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <textarea
                name="description"
                rows={3}
                placeholder="Project Description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="techStack"
                placeholder="Tech Stack (e.g. React, Node, MongoDB)"
                value={form.techStack}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="url"
                name="liveLink"
                placeholder="Live Project URL"
                value={form.liveLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="url"
                name="githubLink"
                placeholder="GitHub Repo URL"
                value={form.githubLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="file"
                name="image"
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
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
          {error && <div className="px-4 py-2 bg-red-100 text-red-700 rounded">{error}</div>}
          {success && <div className="px-4 py-2 bg-green-100 text-green-700 rounded">{success}</div>}
        </div>
      )}
    </div>
  );
}

export default AdminProjects;