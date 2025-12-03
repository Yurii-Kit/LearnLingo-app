import { create } from "zustand";
import type { AuthState } from "../../types";

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isLoading: true,
  isLoggedIn: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: undefined, isLoggedIn: false }),
  setIsLoading: (value) => set({ isLoading: value }),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
}));
