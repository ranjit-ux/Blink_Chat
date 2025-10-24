import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  onlineUsers: [],
  isUserLoading: false,
  isMessagesLoading: false,

  // ✅ Fetch all users except the logged-in one
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  // ✅ Fetch chat messages for a selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ✅ Manage online users (from socket.io)
  setOnlineUsers: (users) => set({ onlineUsers: users }),

  // ✅ Set the selected chat user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
