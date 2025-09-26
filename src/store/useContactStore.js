// src/store/useContactStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/contact`;

const useContactStore = create((set) => ({
  contactInfo: null,
  loading: false,
  error: null,
  success: null,

  fetchContactInfo: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_URL);
      set({ contactInfo: res.data.data, loading: false });
    } catch (err) {
      console.error("Fetch contact error:", err.response?.data || err.message);
      set({ error: "Failed to fetch contact info ❌", loading: false });
    }
  },

  updateContactInfo: async (payload) => {
    set({ loading: true, error: null, success: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(API_URL, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        contactInfo: res.data.data,
        success: "Contact info updated ✅",
        loading: false,
      });
    } catch (err) {
      console.error("Update contact error:", err.response?.data || err.message);
      set({ error: "Failed to update contact info ❌", loading: false });
    }
  },
}));

export default useContactStore;