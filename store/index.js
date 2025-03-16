import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (userData, authToken) => set({ 
        user: userData, 
        token: authToken, 
        isAuthenticated: true 
      }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // Storage key
      storage: createJSONStorage(() => AsyncStorage), // Explicitly use localStorage
    }
  )
);

export default useAuthStore;
