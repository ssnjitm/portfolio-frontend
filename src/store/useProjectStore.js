import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/projects`;

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,
  success: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_URL);
      set({ projects: res.data.data || [], loading: false });
    } catch (err) {
      set({ error: "Failed to fetch projects ❌", loading: false });
    }
  },

  addProject: async (formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const newProject = res.data?.data;
      set((state) => ({
        projects: newProject ? [newProject, ...state.projects] : state.projects,
        success: "Project added ✅",
        loading: false,
      }));
    } catch (err) {
      console.error("Add project error:", err.response?.data || err.message);
      set({ error: "Failed to add project ❌", loading: false });
    }
  },

  updateProject: async (id, formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${API_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const updatedProject = res.data?.data;
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === id ? updatedProject : p
        ),
        success: "Project updated ✅",
        loading: false,
      }));
    } catch (err) {
      console.error("Update project error:", err.response?.data || err.message);
      set({ error: "Failed to update project ❌", loading: false });
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error("Delete project error:", err.response?.data || err.message);
      set({ error: "Failed to delete project ❌", loading: false });
    }
  },
}));

export default useProjectStore;