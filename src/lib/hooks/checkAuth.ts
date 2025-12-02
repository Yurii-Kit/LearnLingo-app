// lib/hooks/useAuthInit.ts
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthStore } from "../store/authStore";

export const useCheckAuth = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    if (user !== undefined) return; // користувач вже відомий, не запускаємо лоадер
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Користувач залогінений
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });
      } else {
        // Користувач не залогінений
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setIsLoading, user]);
};
