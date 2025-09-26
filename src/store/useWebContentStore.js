// src/store/useWebContentStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/webcontent`;

const useWebContentStore = create((set) => ({
  webContent: null,
  loading: false,
  error: null,
  success: null,

  fetchWebContent: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_URL);
      set({ webContent: res.data.data || null, loading: false });
    } catch (err) {
      console.error("Fetch WebContent error:", err.response?.data || err.message);
      set({ error: "Failed to fetch web content ❌", loading: false });
    }
  },

  upsertWebContent: async (formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      set({
        webContent: res.data?.data,
        success: "Web content saved ✅",
        loading: false,
      });
    } catch (err) {
      console.error("Upsert WebContent error:", err.response?.data || err.message);
      set({ error: "Failed to save web content ❌", loading: false });
    }
  },
}));

export default useWebContentStore;