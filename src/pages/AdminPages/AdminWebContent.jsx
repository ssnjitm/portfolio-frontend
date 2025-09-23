import React, { useState, useEffect } from "react";
import useWebContentStore from "../../store/useWebContentStore";

function AdminWebContent() {
  const {
    webContent,
    fetchWebContent,
    upsertWebContent,
    loading,
    error,
    success,
  } = useWebContentStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    heroTitle: "",
    heroDescription: "",
    downloadCV: null, // PDF File object
    aboutMeImage: null, // Image File object
    aboutMeDescription1: "",
    aboutMeDescription2: "",
  });

  useEffect(() => {
    fetchWebContent();
  }, [fetchWebContent]);

  useEffect(() => {
    if (webContent) {
      setForm({
        heroTitle: webContent.heroTitle || "",
        heroDescription: webContent.heroDescription || "",
        downloadCV: null, // reset file (File cannot persist clientside)
        aboutMeImage: null,
        aboutMeDescription1: webContent.aboutMeDescription1 || "",
        aboutMeDescription2: webContent.aboutMeDescription2 || "",
      });
    }
  }, [webContent]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.[0]) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heroTitle", form.heroTitle);
    formData.append("heroDescription", form.heroDescription);
    formData.append("aboutMeDescription1", form.aboutMeDescription1);
    formData.append("aboutMeDescription2", form.aboutMeDescription2);

    if (form.aboutMeImage) formData.append("aboutMeImage", form.aboutMeImage);
    if (form.downloadCV) formData.append("downloadCV", form.downloadCV);

    await upsertWebContent(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Web Content</h2>

      {/* Display Current Web Content */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-6 border border-gray-100">
        {webContent ? (
          <>
            {/* Hero Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {webContent.heroTitle}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {webContent.heroDescription}
              </p>
            </div>

            {/* About Me Section */}
            <div className="flex items-start gap-6 mb-6">
              {webContent.aboutMeImage && (
                <img
                  src={webContent.aboutMeImage}
                  alt="About"
                  className="w-28 h-28 object-cover rounded-lg shadow-md border"
                />
              )}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {webContent.aboutMeDescription1}
                </p>
                <p className="mt-2 text-gray-500 leading-relaxed">
                  {webContent.aboutMeDescription2}
                </p>
              </div>
            </div>

            {/* CV Preview + Download */}
            {webContent.downloadCVLink && (
              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Current CV:
                </h4>
                {/* Inline preview inside iframe */}
                <iframe
                  src={webContent.downloadCVLink}
                  title="CV Preview"
                  className="w-full h-64 border rounded-md"
                />
                <div className="mt-3 flex gap-3">
                  <a
                    href={webContent.downloadCVLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                  >
                    Open in Tab
                  </a>
                  <a
                    href={`${webContent.downloadCVLink}?dl=1`}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center py-6">
            No content added yet. Click below to add content.
          </p>
        )}

        {/* Edit/Add Button */}
        <div className="mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-lg shadow hover:from-indigo-600 hover:to-indigo-700 transition"
          >
            {webContent ? "✏️ Edit Content" : "➕ Add Content"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {webContent ? "Edit Web Content" : "Add Web Content"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="heroTitle"
                value={form.heroTitle}
                onChange={handleChange}
                placeholder="Hero Title"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <textarea
                name="heroDescription"
                value={form.heroDescription}
                onChange={handleChange}
                placeholder="Hero Description"
                rows={2}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <textarea
                name="aboutMeDescription1"
                value={form.aboutMeDescription1}
                onChange={handleChange}
                placeholder="About Me - Paragraph 1"
                rows={3}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <textarea
                name="aboutMeDescription2"
                value={form.aboutMeDescription2}
                onChange={handleChange}
                placeholder="About Me - Paragraph 2"
                rows={3}
                className="w-full px-3 py-2 border rounded-lg"
              />

              {/* About Me Image */}
              <div>
                <label className="block text-sm font-medium">About Me Image</label>
                <input
                  type="file"
                  name="aboutMeImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                />
                {form.aboutMeImage && (
                  <img
                    src={URL.createObjectURL(form.aboutMeImage)}
                    alt="Preview"
                    className="w-16 h-16 mt-2 rounded"
                  />
                )}
              </div>

              {/* CV Upload + Preview */}
              <div>
                <label className="block text-sm font-medium">CV File (PDF)</label>
                <input
                  type="file"
                  name="downloadCV"
                  accept=".pdf"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                />
                {/* New CV Preview before save */}
                {form.downloadCV && (
                  <iframe
                    src={URL.createObjectURL(form.downloadCV)}
                    title="New CV Preview"
                    className="w-full h-64 mt-2 border rounded-md"
                  />
                )}
              </div>

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

export default AdminWebContent;