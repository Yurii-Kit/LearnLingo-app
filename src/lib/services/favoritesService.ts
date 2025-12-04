import { db } from "../../firebase/firebase";
import {
  ref,
  set,
  remove,
  onValue,
  type DataSnapshot,
} from "firebase/database";

export const FavoriteService = {
  fetchFavorites: (uid: string, callback: (favorites: string[]) => void) => {
    const favRef = ref(db, `users/${uid}/favorites`);
    onValue(favRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val() || {};
      callback(Object.keys(data));
    });
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
