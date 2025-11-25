import { create } from "zustand";

interface User {
  uid: string;
  email: string | null;
  name?: string | null;
}

interface AuthState {
  user: User | null;
  isLoading?: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setIsLoading: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setIsLoading: (value) => set({ isLoading: value }),
}));
