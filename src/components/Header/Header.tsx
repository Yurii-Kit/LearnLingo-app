import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import { useAuthStore } from "../../lib/store/authStore";
import css from "./Header.module.css";
import Container from "../Container/Container";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  return (
    <header className={css.header}>
      <Container className={css.headerContainer}>
        <Navigation />
        {user ? <UserMenu /> : <AuthNav />}
      </Container>
    </header>
  );
}
