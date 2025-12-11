import { useAuthStore } from "../../lib/store/authStore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Icon from "../Icon/Icon";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogOut = async () => {
    try {
      await signOut(auth); // Вихід з Firebase
      clearUser(); //  Очистка глобального стану
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={css.wrapper}>
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className={css.whatsappLink}
        aria-label="Contact us on WhatsApp"
      >
        <Icon name="whatsapp" width={28} height={28}></Icon>
      </a>
      <p className={css.userName}>Welcome, {user?.name}</p>
      <button className={css.logOutBtn} type="button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
}
