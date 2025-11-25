import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import { useAuthStore } from "../../lib/store/authStore";
import css from "./Header.module.css";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  console.log("Header user:", user);
  return (
    <header className={css.header}>
      <Navigation />
      {user ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
