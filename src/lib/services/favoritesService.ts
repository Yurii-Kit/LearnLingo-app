import { db } from "../../firebase/firebase";
import { ref, set, remove, get } from "firebase/database";

export const FavoriteService = {
  fetchFavoritesOnce: async (uid: string) => {
    if (!uid) return [];
    const favRef = ref(db, `users/${uid}/favorites`);
    try {
      const snapshot = await get(favRef);
      if (!snapshot || !snapshot.exists()) return [];
      const data = snapshot.val();
      return data ? Object.keys(data) : [];
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
      return [];
    }
  },

  addFavorite: async (uid: string, teacherId: string) => {
    const favRef = ref(db, `users/${uid}/favorites/${teacherId}`);
    await set(favRef, true);
  },

  removeFavorite: async (uid: string, teacherId: string) => {
    const favRef = ref(db, `users/${uid}/favorites/${teacherId}`);
    await remove(favRef);
  },
};
