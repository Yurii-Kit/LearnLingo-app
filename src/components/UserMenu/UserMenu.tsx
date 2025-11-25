import { useAuthStore } from "../../lib/store/authStore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogOut = async () => {
    try {
      await signOut(auth); // 1Вихід з Firebase
      clearUser(); //  Очистка глобального стану
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={css.wrapper}>
      <p className={css.userName}>Welcome, {user?.name}</p>
      <button className={css.logOutBtn} type="button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
}
