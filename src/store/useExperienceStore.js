// src/store/useExperienceStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/experiences`;

const useExperienceStore = create((set) => ({
  experiences: [],
  loading: false,
  error: null,
  success: null,

  fetchExperiences: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_URL);
      set({ experiences: res.data.data || [], loading: false });
    } catch (err) {
      console.error("Fetch experiences error:", err.response?.data || err.message);
      set({ error: "Failed to fetch experiences ❌", loading: false });
    }
  },

  addExperience: async (formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const newExp = res.data?.data;
      set((state) => ({
        experiences: newExp ? [newExp, ...state.experiences] : state.experiences,
        success: "Experience added ✅",
        loading: false,
      }));
    } catch (err) {
      console.error("Add experience error:", err.response?.data || err.message);
      set({ error: "Failed to add experience ❌", loading: false });
    }
  },

  updateExperience: async (id, formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${API_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const updated = res.data?.data;
      set((state) => ({
        experiences: state.experiences.map((e) =>
          e._id === id ? updated : e
        ),
        success: "Experience updated ✅",
        loading: false,
      }));
    } catch (err) {
      console.error("Update experience error:", err.response?.data || err.message);
      set({ error: "Failed to update experience ❌", loading: false });
    }
  },

  deleteExperience: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        experiences: state.experiences.filter((e) => e._id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error("Delete experience error:", err.response?.data || err.message);
      set({ error: "Failed to delete experience ❌", loading: false });
    }
  },
}));

export default useExperienceStore;