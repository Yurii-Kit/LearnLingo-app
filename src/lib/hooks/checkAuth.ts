// lib/hooks/useAuthInit.ts
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthStore } from "../store/authStore";

export const useCheckAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const fetchFavorites = useAuthStore((state) => state.fetchFavorites);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
