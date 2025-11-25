import { useState } from "react";
import loginIcon from "../../assets/log-in-01.svg";

import css from "./AuthNav.module.css";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalRegister from "../ModalRegister/ModalRegister";

export default function AuthNav() {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  const openModal = (type: "login" | "register") => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className={css.authNav}>
      <button
        type="button"
        className={css.loginButton}
        onClick={() => openModal("login")}
      >
        <img src={loginIcon} alt="Login Icon" />
        Log in
      </button>
      <button
        type="button"
        className={css.registerButton}
        onClick={() => openModal("register")}
      >
        Registration
      </button>
      {modalType === "login" && <ModalLogin onClose={closeModal} />}

      {modalType === "register" && <ModalRegister onClose={closeModal} />}
    </div>
  );
}
