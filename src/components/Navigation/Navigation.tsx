import { Link, NavLink } from "react-router-dom";
import LearnLogo from "../../assets/ukraine.svg";

import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <Link to="/" className={css.logoContainer}>
        <img src={LearnLogo} alt="LearnLingo Logo" />
        <span className={css.logoText}>LearnLingo</span>
      </Link>
      <div className={css.navLinks}>
        <NavLink to="/" className={css.link}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={css.link}>
          Teachers
        </NavLink>
      </div>
    </nav>
  );
}
