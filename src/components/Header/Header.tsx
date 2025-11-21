import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Navigation />
      <AuthNav />
    </header>
  );
}
