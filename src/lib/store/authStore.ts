import { create } from "zustand";
import type { AuthState } from "../../types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isLoggedIn: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
  setIsLoading: (value) => set({ isLoading: value }),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
}));
