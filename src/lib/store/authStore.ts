import { create } from "zustand";
import type { AuthState } from "../../types";
import { FavoriteService } from "../services/favoritesService";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  favorites: [],
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, isLoggedIn: false, favorites: [] }),
  setIsLoading: (value) => set({ isLoading: value }),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),

  fetchFavorites: async () => {
    const user = get().user;
    if (!user) return;
    const favorites = await FavoriteService.fetchFavoritesOnce(user.uid);
    set({ favorites });
    console.log("Favorites loaded:", favorites);
  },

  addFavorite: async (teacherId: string) => {
    const user = get().user;
    if (!user) return;

    await FavoriteService.addFavorite(user.uid, teacherId);

    set((state) => ({
      favorites: [...state.favorites, teacherId],
    }));
  },

  removeFavorite: async (teacherId: string) => {
    const user = get().user;
    if (!user) return;

    await FavoriteService.removeFavorite(user.uid, teacherId);

    set((state) => ({
      favorites: state.favorites.filter((id) => id !== teacherId),
    }));
  },
}));
