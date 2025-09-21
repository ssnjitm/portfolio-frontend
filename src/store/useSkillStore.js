// src/store/useSkillStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/skills";

const useSkillStore = create((set, get) => ({
  skills: [],
  loading: false,
  error: null,
  success: null,

  fetchSkills: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_URL);
      set({ skills: res.data.data || [], loading: false });
    } catch (err) {
      set({ error: "Failed to fetch skills ❌", loading: false, skills: [] });
    }
  },

  addSkill: async (formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newSkill = res.data?.data;
      set((state) => ({
        skills: newSkill ? [...state.skills, newSkill] : state.skills,
        success: "Skill added ✅",
        loading: false,
      }));
    } catch (err) {
      console.error("Add skill error:", err.response?.data || err.message);
      set({ error: "Failed to add skill ❌", loading: false });
    }
  },

  updateSkill: async (id, formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await axios.patch(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedSkill = res.data?.data;
      set((state) => ({
        skills: state.skills.map((s) => (s._id === id ? updatedSkill : s)),
        success: "Skill updated ✅",
        loading: false,
      }));
    } catch (err) {
      console.error("Update skill error:", err.response?.data || err.message);
      set({ error: "Failed to update skill ❌", loading: false });
    }
  },

  deleteSkill: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        skills: state.skills.filter((s) => s._id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error("Delete skill error:", err.response?.data || err.message);
      set({ error: "Failed to delete skill ❌", loading: false });
    }
  },
}));

export default useSkillStore;