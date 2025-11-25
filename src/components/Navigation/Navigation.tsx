import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import LearnLogo from "../../assets/ukraine.svg";
import { useAuthStore } from "../../lib/store/authStore";

import css from "./Navigation.module.css";

interface ActiveLinkProps {
  isActive: boolean;
}

export default function Navigation() {
  const isLoggedIn = useAuthStore((state) => !!state.user);
  const getActiveLink = ({ isActive }: ActiveLinkProps) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <nav className={css.navigation}>
      <Link to="/" className={css.logoContainer}>
        <img src={LearnLogo} alt="LearnLingo Logo" />
        <span className={css.logoText}>LearnLingo</span>
      </Link>
      <div className={css.navLinks}>
        <NavLink to="/" className={getActiveLink}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={getActiveLink}>
          Teachers
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/favorites" className={getActiveLink}>
            Favorites
          </NavLink>
        )}
      </div>
    </nav>
  );
}
