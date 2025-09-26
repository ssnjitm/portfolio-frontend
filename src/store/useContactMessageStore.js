// src/store/useContactMessageStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/contact-messages";

const useContactMessageStore = create((set) => ({
  // State
  messages: [],
  loading: false,
  error: null,
  success: null,

  // Submit a new contact message (from public form)
  submitMessage: async (formData) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await axios.post(API_URL, formData);
      set({
        success: "Message sent successfully! ✅",
        loading: false,
      });
      return res.data;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to send message. Please try again.";
      set({
        error: errorMsg,
        loading: false,
      });
    }
  },

  // Fetch all messages (for admin panel)
  fetchAllMessages: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/admin`);
      set({
        messages: res.data.data,
        loading: false,
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to load messages.";
      set({
        error: errorMsg,
        loading: false,
      });
    }
  },

  //delete all messages 
  deleteMessage: async (id) => {
  set({ loading: true, error: null });
  try {
    await axios.delete(`${API_URL}/${id}`); // DELETE /api/v1/contact-messages/:id

    // Optimistic update: remove from local state immediately
    set((state) => ({
      messages: state.messages.filter((msg) => msg._id !== id),
      loading: false,
      success: "Message deleted successfully",
    }));
  } catch (err) {
    const errorMsg =
      err.response?.data?.message || "Failed to delete message. Please try again.";
    set({
      error: errorMsg,
      loading: false,
    });
  }
},


}));

export default useContactMessageStore;