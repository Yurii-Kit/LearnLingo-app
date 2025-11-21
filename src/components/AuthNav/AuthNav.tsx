import { Link } from "react-router-dom";
import loginIcon from "../../assets/log-in-01.svg";

import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div className={css.authNav}>
      <Link to="/login" className={css.linkLogin}>
        <img src={loginIcon} alt="Login Icon" />
        Log in
      </Link>
      <Link to="/register" className={css.linkRegister}>
        Registration
      </Link>
    </div>
  );
}
