import { create } from "zustand";
import type { AuthState } from "../../types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setIsLoading: (value) => set({ isLoading: value }),
}));
