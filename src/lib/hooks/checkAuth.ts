// lib/hooks/useAuthInit.ts
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthStore } from "../store/authStore";

export const useCheckAuth = () => {
  const { setUser, setIsLoggedIn, fetchFavorites, setIsLoading } =
    useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Користувач залогінений
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });
        setIsLoggedIn(true);
        //Завантаження улюблених вчителів
        try {
          await fetchFavorites(); // чекаємо завантаження favorites
        } catch (err) {
          console.error("Failed to fetch favorites:", err);
        }
      } else {
        // Користувач не залогінений
        setUser(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);
};
