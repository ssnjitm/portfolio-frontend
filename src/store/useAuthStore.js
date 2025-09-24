import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/admin";

const useAuthStore = create((set) => ({
  admin: null,
  loading: false,
  error: null,
  success: null,

  login: async (email, password) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
      const token = res.data.data.accessToken;
      localStorage.setItem("token", token);

      set({ admin: res.data.data.admin, success: "Logged in ✅", loading: false });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed ❌",
        loading: false,
      });
      return false;
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    } catch { /* ignore */ }
    localStorage.removeItem("token");
    set({ admin: null });
  },

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ admin: res.data.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Could not fetch profile",
        loading: false,
      });
    }
  },

  updateProfile: async (formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${API_URL}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      set({ admin: res.data.data, success: "Profile updated ✅", loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Update failed ❌",
        loading: false,
      });
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    set({ loading: true, error: null, success: null });
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ success: "Password changed ✅", loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || "Change password failed ❌", loading: false });
      return false;
    }
  },
}));

export default useAuthStore;