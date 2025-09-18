import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessages: (updater) =>
    set((state) => {
      const prevMessages = Array.isArray(state.messages) ? state.messages : [];
      return {
        messages:
          typeof updater === "function" ? updater(prevMessages) : updater,
      };
    }),
}));

export default useConversation;
